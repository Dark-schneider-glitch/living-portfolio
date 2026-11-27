'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ArrowUpRight, Bot, PanelsTopLeft, Sparkles, Workflow } from 'lucide-react';
import { PERSON } from '@/lib/data';

const SERVICES = [
  {
    number: '01',
    title: 'AI-assisted websites',
    description:
      'Modern, responsive websites that make your business easy to understand and easy to contact.',
    icon: Bot,
  },
  {
    number: '02',
    title: 'Landing pages',
    description:
      'Focused campaign pages with a clear message, a strong call to action, and mobile-first layouts.',
    icon: PanelsTopLeft,
  },
  {
    number: '03',
    title: 'Portfolio websites',
    description:
      'Personal portfolios that bring your experience, projects, and next opportunity together.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'n8n workflow automation',
    description:
      'Practical automations that connect everyday tools and reduce repetitive steps in your work.',
    icon: Workflow,
  },
];

export function CodeSection() {
  useGSAP(() => {
    gsap.from('.code-kicker, .code-title, .code-subtitle', {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.code-kicker',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

  }, []);

  return (
    <section
      id="code"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 90% 15%, var(--color-orange-glow), transparent 32%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-orange absolute inset-0 pointer-events-none opacity-30" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="code-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2 text-caption font-medium text-orange-400">
          <Sparkles className="h-4 w-4" />
          Websites · AI · Automation
        </div>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="code-title mb-4 font-display text-section-title font-extrabold leading-tight text-text-100">
              What I can <span className="text-gradient-orange">build for you.</span>
            </h2>
            <p className="code-subtitle max-w-2xl text-body-lg leading-relaxed text-text-200">
              From a polished web presence to the little automations that give
              you time back—built around what your business actually needs.
            </p>
          </div>
          <a
            href={`mailto:${PERSON.email}?subject=${encodeURIComponent('Let\'s build something together')}`}
            className="btn-secondary shrink-0 self-start"
          >
            Discuss a project
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                className="term-card p-6 flex flex-col"
                key={service.number}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-caption text-muted-500">
                    {service.number}
                  </span>
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold text-text-100">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-text-200 flex-1">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}