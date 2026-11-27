'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Code2 } from 'lucide-react';
import { PERSON } from '@/lib/data';
import { scrollToSection } from '@/lib/scrollToSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: 'desk', label: 'Home', hash: '#desk' },
  { id: 'learn', label: 'Skills', hash: '#learn' },
  { id: 'code', label: 'Services', hash: '#code' },
  { id: 'youtube', label: 'Videos', hash: '#youtube' },
  { id: 'build', label: 'Projects', hash: '#build' },
  { id: 'celebrate', label: 'Experience', hash: '#celebrate' },
  { id: 'present', label: 'Contact', hash: '#present' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setScrolled(self.scroll() > 40),
      });
      setScrolled(window.scrollY > 40);

      gsap.from(nav, {
        y: -100,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: navRef }
  );

  const scrollTo = (hash: string) => {
    scrollToSection(hash);
    setOpen(false);
  };

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-[70] transition-all duration-300',
        scrolled
          ? 'bg-void-950/80 backdrop-blur-md border-b border-border-800 shadow-terminal-lg'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div ref={navRef} className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Code2 className="w-5 h-5 text-void-950" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight sm:text-xl text-text-100">{PERSON.name}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {CHAPTERS.map((chapter) => (
            <Link
              key={chapter.id}
              href={chapter.hash}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(chapter.hash);
              }}
              className="text-sm font-medium text-text-200 hover:text-orange-400 transition-colors no-select cursor-pointer"
            >
              {chapter.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-text-100 rounded-lg hover:bg-surface-900/50 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-20 bottom-0 z-40 min-h-[calc(100dvh-5rem)] overflow-y-auto bg-void-950/95 backdrop-blur-lg"
          onClick={() => setOpen(false)}
        >
          <div className="max-w-md mx-auto py-20 px-6">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 rounded-xl bg-orange-400 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-void-950" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-100">{PERSON.name}</span>
            </Link>
            <div className="space-y-4">
              {CHAPTERS.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => scrollTo(chapter.hash)}
                  className="w-full text-left py-4 text-xl font-medium text-text-100 hover:text-orange-400 transition-colors border-b border-border-800 last:border-0"
                >
                  {chapter.label}
                </button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border-800">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}