'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { BriefcaseBusiness, MapPin } from 'lucide-react';
import { EXPERIENCE } from '@/lib/data';

export function CelebrateSection() {
  useGSAP(() => {
    gsap.from('.celebrate-kicker, .celebrate-title, .experience-intro', {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.celebrate-kicker',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

  }, []);

  return (
    <section
      id="celebrate"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 90% 50%, var(--color-orange-glow), transparent 34%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-orange absolute inset-0 pointer-events-none opacity-30" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2">
        <div>
          <div className="celebrate-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2 text-caption font-medium text-orange-400">
            <BriefcaseBusiness className="h-4 w-4" />
            Career journey
          </div>
          <h2 className="celebrate-title mb-5 font-display text-section-title font-extrabold leading-tight text-text-100">
            Experience that keeps things <span className="text-gradient-orange">running.</span>
          </h2>
          <p className="experience-intro max-w-md text-body-lg leading-relaxed text-text-200">
            More than three years supporting people, systems, and networks—from
            hands-on desktop support to IT administration.
          </p>
        </div>

        <div className="space-y-4">
          {EXPERIENCE.map((job, index) => (
            <article
              className="term-card-lg p-6 sm:p-7"
              key={job.company}
            >
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="mb-2 inline-flex items-center gap-1.5 text-caption font-medium uppercase tracking-[0.14em] text-caution-400">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-muted-500">/</span>
                    <span>{job.dates}</span>
                  </span>
                  <h3 className="font-display text-xl font-semibold text-text-100">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-text-200">{job.company}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-border-700 bg-surface-900/80 px-3 py-1.5 text-caption text-text-200">
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  {job.location}
                </span>
              </div>
              <ul className="space-y-2.5 border-t border-border-700 pt-5">
                {job.highlights.map((highlight) => (
                  <li
                    className="flex gap-3 text-sm leading-relaxed text-text-200"
                    key={highlight}
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}