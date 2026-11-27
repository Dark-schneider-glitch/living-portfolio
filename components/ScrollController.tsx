'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { JOURNEY_CHAPTERS } from '@/lib/data';

/**
 * ScrollController — coordinates the character-based journey across scroll sections.
 *
 * Uses GSAP ScrollTrigger (gsap-scrolltrigger skill):
 *  - One ScrollTrigger per section chapter
 *  - Scrub for scroll-linked character state transitions
 *  - Created top-to-bottom (page order)
 *  - Cleanup via useGSAP (gsap-react skill)
 *
 * Also drives a scroll progress indicator and reveals section content.
 */
export function ScrollController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentChapter, setCurrentChapter] = useState<string>('desk');
  const chapterTitle =
    JOURNEY_CHAPTERS.find((chapter) => chapter.id === currentChapter)?.title ?? 'Home';

  useGSAP(
    () => {
      // Progress bar tween (full-page scroll)
      gsap.to('.scroll-progress-fill', {
        width: '100%',
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Chapter markers — track which chapter is active as user scrolls
      JOURNEY_CHAPTERS.forEach((chapter, i) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;

        const isLast = i === JOURNEY_CHAPTERS.length - 1;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 30%',
          end: isLast ? 'bottom bottom' : 'bottom 30%',
          id: `chapter-${chapter.id}`,
          onEnter: () => setCurrentChapter(chapter.id),
          onEnterBack: () => setCurrentChapter(chapter.id),
          // refreshPriority ensures top-to-bottom refresh order (gsap-scrolltrigger skill)
          refreshPriority: -i,
        });
      });

      // Reveal section titles when they enter viewport (staggered)
      gsap.utils.toArray('.section-title-reveal').forEach((el) => {
        const target = el as HTMLElement;
        gsap.from(target, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Reveal section content blocks
      gsap.utils.toArray('.section-content-reveal').forEach((el) => {
        const target = el as HTMLElement;
        gsap.from(target, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60]">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5">
        <div
          className="scroll-progress-fill h-full bg-gradient-to-r from-orange-500 via-caution-500 to-orange-500 w-0 transition-none"
        />
      </div>

      {/* Chapter indicator (subtle, top-right) */}
      <div className="fixed top-24 right-3 z-[50] glass-panel px-3 py-1.5 rounded-full text-[10px] font-medium text-white/80 backdrop-blur-sm border border-white/10 sm:right-6 sm:px-4 sm:py-2 sm:text-xs">
        {chapterTitle}
      </div>
    </div>
  );
}
