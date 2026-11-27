import { NextResponse } from 'next/server';
import { PERSON } from '@/lib/data';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per window

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }

  record.count++;
  return { allowed: true };
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 2000);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function validateFormData(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 200) {
    errors.subject = 'Subject must be less than 200 characters';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 5000) {
    errors.message = 'Message must be less than 5000 characters';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', retryAfter: rateLimit.retryAfter },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter || 900),
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // Parse and validate form data
    const contentType = request.headers.get('content-type') || '';
    let formData: { name: string; email: string; subject: string; message: string };

    if (contentType.includes('application/json')) {
      const json = await request.json();
      formData = {
        name: sanitizeInput(json.name || ''),
        email: sanitizeInput(json.email || ''),
        subject: sanitizeInput(json.subject || ''),
        message: sanitizeInput(json.message || ''),
      };
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      formData = {
        name: sanitizeInput(form.get('name') as string || ''),
        email: sanitizeInput(form.get('email') as string || ''),
        subject: sanitizeInput(form.get('subject') as string || ''),
        message: sanitizeInput(form.get('message') as string || ''),
      };
    } else {
      return NextResponse.json(
        { error: 'Unsupported content type' },
        { status: 415, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const validation = validateFormData(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // In production, send email via service like Resend, SendGrid, or Nodemailer
    // For now, we'll log and return success
    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
      ip: ip.replace(/\d+$/, 'xxx'), // Partially mask IP for privacy
    };

    console.log('Contact form submission:', JSON.stringify(submission, null, 2));

    // TODO: Send email to PERSON.email
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio Contact <onboarding@resend.dev>',
    //   to: PERSON.email,
    //   subject: `Portfolio Contact: ${formData.subject}`,
    //   html: `
    //     <p><strong>Name:</strong> ${formData.name}</p>
    //     <p><strong>Email:</strong> ${formData.email}</p>
    //     <p><strong>Subject:</strong> ${formData.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${formData.message.replace(/\n/g, '<br>')}</p>
    //   `,
    // });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully. I\'ll get back to you soon!' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { 'Cache-Control': 'no-store', Allow: 'POST' } }
  );
}