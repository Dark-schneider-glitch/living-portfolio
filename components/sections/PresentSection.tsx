'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ArrowUpRight, Download, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { PERSON } from '@/lib/data';
import { ContactForm } from '@/components/ui/ContactForm';

export function PresentSection() {
  useGSAP(() => {
    gsap.from('.present-content > *', {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.present-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section
      id="present"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 100%, var(--color-orange-glow), transparent 44%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-orange absolute inset-0 pointer-events-none opacity-30" />
      <div className="present-content relative z-10 mx-auto flex min-h-[75svh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2 text-caption font-medium text-orange-400">
          <span>Let&apos;s make it work</span>
        </div>
        <h2 className="mb-5 font-display text-section-title font-extrabold leading-tight text-text-100">
          Need a website or a smarter workflow?
        </h2>
        <p className="mb-10 max-w-2xl text-body-lg leading-relaxed text-text-200">
          I&apos;m available to talk about IT support, AI-assisted websites and
          landing pages, portfolio builds, and n8n automation.
        </p>

        <div className="mb-9 flex flex-col items-center gap-3 text-sm text-text-200 sm:flex-row sm:gap-6">
          <a className="inline-flex items-center gap-2 transition hover:text-orange-400" href={`mailto:${PERSON.email}`}>
            <Mail className="h-4 w-4 text-orange-400" />
            {PERSON.email}
          </a>
          <a className="inline-flex items-center gap-2 transition hover:text-orange-400" href={`tel:${PERSON.phone.replace(/[^\d+]/g, '')}`}>
            <Phone className="h-4 w-4 text-orange-400" />
            {PERSON.phone}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-400" />
            {PERSON.location}
          </span>
        </div>

        <div className="w-full max-w-xl">
          <ContactForm />
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={PERSON.resume}
            download
            className="btn-secondary w-full sm:w-auto"
          >
            <Download className="h-5 w-5" />
            Download CV
          </a>
          <a
            href={PERSON.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href={PERSON.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto"
          >
            <Youtube className="h-5 w-5" />
            YouTube
          </a>
        </div>
      </div>
    </section>
  );
}