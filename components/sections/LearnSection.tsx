'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { GraduationCap, Network, Server, ShieldCheck, Workflow } from 'lucide-react';
import { EDUCATION, SKILL_GROUPS } from '@/lib/data';

const SKILL_ICONS = [Server, Network, ShieldCheck, Workflow];

export function LearnSection() {
  useGSAP(() => {
    gsap.from('.learn-kicker, .learn-title, .learn-subtitle', {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.learn-kicker',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

  }, []);

  return (
    <section
      id="learn"
      className="relative min-h-screen min-h-[100svh] overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 10% 70%, var(--color-orange-glow), transparent 32%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-orange absolute inset-0 pointer-events-none opacity-30" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-32">
        <div className="learn-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2 text-caption font-medium text-orange-400">
          <Server className="h-4 w-4" />
          Skills & education
        </div>
        <h2 className="learn-title mb-4 font-display text-section-title font-extrabold leading-tight text-text-100">
          Built on real-world <span className="text-gradient-orange">experience.</span>
        </h2>
        <p className="learn-subtitle mb-12 max-w-2xl text-body-lg leading-relaxed text-text-200">
          Practical IT support skills, a strong troubleshooting foundation, and
          a growing toolkit for web creation and workflow automation.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = SKILL_ICONS[index] ?? Workflow;
            return (
              <article
                key={group.name}
                className="term-card p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-text-100">{group.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border-700 bg-surface-900/80 px-3 py-1.5 text-sm text-text-200 transition hover:border-orange-400/50 hover:text-orange-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 section-divider" />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-caption font-medium uppercase tracking-[0.16em] text-caution-400">
              <GraduationCap className="h-4 w-4" />
              Education
            </div>
            <h3 className="font-display text-section-title font-extrabold text-text-100">
              Always learning.
            </h3>
          </div>
          <div className="grid gap-3">
            {EDUCATION.map((item) => (
              <article
                className="term-card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                key={item.title}
              >
                <div>
                  <h4 className="font-semibold text-text-100">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-400">{item.detail}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-orange-400">
                  {item.dates}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}