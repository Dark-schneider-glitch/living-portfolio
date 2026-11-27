'use client';

import { Activity, ArrowDown, ArrowRight, ArrowUpRight, Code2, Download, Globe2, Sparkles, Workflow } from 'lucide-react';
import { PERSON } from '@/lib/data';
import { scrollToSection } from '@/lib/scrollToSection';

export function HeroSection() {
  return (
    <section
      id="desk"
      className="hero-section relative flex min-h-screen min-h-[100svh] items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 78% 25%, var(--color-orange-glow), transparent 34%), radial-gradient(ellipse at 10% 90%, var(--color-caution-glow), transparent 35%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-orange absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-[30] mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-14 pt-28 lg:grid-cols-2 lg:gap-10 lg:pb-10">
        <div className="hero-copy">
          <div className="prompt mb-7 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2 text-caption font-medium text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{PERSON.role}</span>
          </div>

          <h1 className="hero-title mb-6 max-w-3xl font-display text-display-xl font-bold leading-[1.05] tracking-[-0.01em] text-text-100">
            Technology that works.<br />
            <span className="text-gradient-orange mt-2 block">Websites that wow.</span>
          </h1>

          <p className="hero-subtitle mb-5 max-w-2xl text-body-lg leading-relaxed text-text-200">
            I&apos;m {PERSON.name}, making useful technology feel simple — from reliable IT systems to AI-assisted websites and n8n automations.
          </p>
          <p className="hero-description mb-8 max-w-xl text-body leading-relaxed text-muted-400">
            6+ years in desktop support, networking, and system administration,
            now bringing that same dependable mindset to every digital project.
          </p>

          <div className="hero-cta flex flex-col gap-3 sm:flex-row">
            <a
              href={PERSON.resume}
              download
              className="btn-primary"
            >
              <Download className="h-5 w-5" />
              Download my CV
            </a>
            <a
              href="#code"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('#code');
              }}
              className="btn-secondary"
            >
              Explore my services
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="hero-proof relative z-10 mt-9 flex flex-wrap gap-x-7 gap-y-3 term-card px-4 py-4">
            <div className="flex items-center gap-2">
              <strong className="text-orange-400 text-xl font-bold">6+</strong><span className="text-text-200 text-sm">years in IT</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-orange-400 text-xl font-bold">150+</strong><span className="text-text-200 text-sm">users supported</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-orange-400 text-xl font-bold">99%</strong><span className="text-text-200 text-sm">uptime maintained</span>
            </div>
          </div>

          <div className="absolute right-0 bottom-6 -translate-y-1/2 hidden lg:flex items-center gap-2 text-caption text-muted-500 tracking-wider uppercase">
            GOOD IDEAS, BUILT TO WORK <ArrowUpRight className="h-4 w-4 text-caution-400" />
          </div>
        </div>

        <div className="hero-showcase relative mx-auto w-full max-w-full" role="group" aria-label="IT, web, and automation services">
          <div className="hero-showcase-glow absolute inset-0 bg-orange-400/10 rounded-2xl blur-[120px] pointer-events-none" />
          <div className="term-window relative">
            <div className="flex items-center justify-between border-b border-border-800 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-100">Mayank&apos;s workshop</p>
                  <p className="text-xs text-muted-400">IT · web · automation</p>
                </div>
              </div>
              <span className="status-ok">
                <span className="relative flex h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Ready to build
              </span>
            </div>

            <div className="hero-orbit-stage relative h-64 md:h-80 overflow-hidden bg-void-900/50">
              <div className="hero-orbit absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/15 animate-pulse-slow sm:w-60 sm:h-60" />
              <div className="hero-orbit absolute top-1/2 left-1/2 w-32 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-caution-400/15 rotate-[-32deg] sm:w-72 sm:h-52" />
              <div className="hero-orbit absolute top-1/2 left-1/2 w-32 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-700 border-dashed rotate-[42deg] sm:w-48 sm:h-80" />
              <div className="hero-core absolute top-1/2 left-1/2 flex w-24 h-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border border-orange-400/25 bg-gradient-to-b from-orange-400/10 to-void-950/80 text-muted-400 text-xs font-bold tracking-wider uppercase shadow-terminal sm:w-30 sm:h-36">
                <div className="hero-core-icon flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400 text-void-950">
                  <Code2 className="h-6 w-6" />
                </div>
                <span>IDEA</span>
                <span className="text-orange-400 text-lg">↓</span>
                <span>IMPACT</span>
              </div>
              <div className="hero-float-card absolute top-4 right-2 sm:top-10 sm:right-6 flex items-center gap-3 rounded-lg border border-border-700 bg-surface-950/90 px-3 py-2 sm:px-4 sm:py-3 text-text-200 text-xs shadow-terminal animate-float">
                <Activity className="h-4 w-4 text-orange-400" />
                <span>Systems running smoothly</span>
              </div>
              <div className="hero-float-card absolute bottom-4 left-2 sm:bottom-10 sm:right-8 lg:bottom-10 lg:right-8 flex items-center gap-2 sm:gap-3 rounded-lg border border-border-700 bg-surface-950/90 px-2 py-2 sm:px-4 sm:py-3 text-text-200 text-xs shadow-terminal animate-float-slow" style={{ animationDelay: '-2s' }}>
                <span className="hero-terminal-dots flex gap-1"><i className="w-1 h-1 rounded-full bg-caution-400" /><i className="w-1 h-1 rounded-full bg-caution-400" /><i className="w-1 h-1 rounded-full bg-orange-400" /></span>
                <code className="font-mono text-sm">less busywork<span className="cursor-blink"></span></code>
                <ArrowUpRight className="h-4 w-4 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}