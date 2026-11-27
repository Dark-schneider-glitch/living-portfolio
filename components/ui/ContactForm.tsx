'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, AlertCircle, Mail, MessageSquare, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = result.retryAfter || 900;
          setErrorMessage(`Too many requests. Please wait ${Math.ceil(retryAfter / 60)} minutes and try again.`);
        } else if (response.status === 400 && result.details) {
          const firstError = Object.values(result.details)[0] as string;
          setErrorMessage(firstError);
        } else {
          setErrorMessage(result.error || 'Something went wrong. Please try again.');
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      reset();
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-caption text-text-200 mb-2">
            Name
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-400" aria-hidden="true" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className="term-input pl-12"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 100, message: 'Name must be less than 100 characters' },
              })}
              disabled={status === 'submitting'}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-caution-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-caption text-text-200 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-400" aria-hidden="true" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="term-input pl-12"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              disabled={status === 'submitting'}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-caution-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-caption text-text-200 mb-2">
          Subject
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-400" aria-hidden="true" />
          <input
            id="subject"
            type="text"
            placeholder="What's this about?"
            className="term-input pl-12"
            {...register('subject', {
              required: 'Subject is required',
              minLength: { value: 5, message: 'Subject must be at least 5 characters' },
              maxLength: { value: 200, message: 'Subject must be less than 200 characters' },
            })}
            disabled={status === 'submitting'}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
        </div>
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-sm text-caution-400" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-caption text-text-200 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project, question, or idea…"
          className="term-input resize-y min-h-[140px] font-sans"
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
            maxLength: { value: 5000, message: 'Message must be less than 5000 characters' },
          })}
          disabled={status === 'submitting'}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-caution-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div
          className="flex items-center gap-2 rounded-lg bg-caution-400 bg-caution-400/10 border border-caution-400/20 p-4 text-caution-400 text-sm"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {status === 'success' && (
        <div
          className="flex items-center gap-2 rounded-lg bg-orange-400/10 border border-orange-400/20 p-4 text-orange-400 text-sm"
          role="status"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>Message sent successfully! I'll get back to you soon.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed relative"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send Message</span>
          </>
        )}
      </button>

      <p className="text-caption text-muted-500 text-center">
        By submitting this form, you agree to your data being processed in accordance with
        our privacy practices. No spam, ever.
      </p>
    </form>
  );
}