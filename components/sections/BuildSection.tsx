'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Activity, MonitorCog, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';

const PROJECT_ICONS = [MonitorCog, Activity];

export function BuildSection() {
  useGSAP(() => {
    gsap.from('.build-kicker, .build-title, .build-subtitle', {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.build-kicker',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

  }, []);

  return (
    <section
      id="build"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 10% 80%, var(--color-orange-glow), transparent 34%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-caution absolute inset-0 pointer-events-none opacity-30" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="build-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2 text-caption font-medium text-orange-400">
          <MonitorCog className="h-4 w-4" />
          Selected work
        </div>
        <h2 className="build-title mb-4 font-display text-section-title font-extrabold leading-tight text-text-100">
          Real work. <span className="text-gradient-orange">Measurable impact.</span>
        </h2>
        <p className="build-subtitle mb-12 max-w-2xl text-body-lg leading-relaxed text-text-200">
          A few highlights from the IT projects and operational improvements
          described in my CV.
        </p>

        <div className="grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((project, index) => {
            const Icon = PROJECT_ICONS[index] ?? Activity;
            return (
              <article
                className="term-card-lg p-7 sm:p-9 flex flex-col"
                key={project.id}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-caption font-medium uppercase tracking-[0.16em] text-caution-400">
                    Project highlight
                  </span>
                  <span className="text-caption text-muted-500">
                    {project.tags[0]}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-section-title font-extrabold text-text-100">
                      {project.title}
                    </h3>
                  </div>
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <p className="mb-6 leading-relaxed text-text-200 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between border-t border-border-700 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border-700 bg-surface-900/80 px-3 py-1 text-xs text-text-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl font-bold text-orange-400">
                      {project.metric}
                    </div>
                    <div className="text-caption text-muted-500 uppercase tracking-[0.16em]">
                      {project.metricLabel}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}