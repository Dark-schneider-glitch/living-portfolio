/**
 * GSAP setup — single registration point for all plugins.
 * Follows gsap-plugins skill: register every plugin once at app level.
 * All GSAP plugins are free (public npm package) — no Club GSAP or auth token needed.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

// Register once — do NOT register inside components that re-render
gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin, Flip, Observer);

// Project-wide defaults — prefer transform aliases + autoAlpha (gsap-core best practices)
gsap.defaults({
  duration: 0.8,
  ease: 'power3.inOut',
});

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin, Flip, Observer };

/**
 * Utility: map scroll progress to a value range.
 * Uses gsap.utils.mapRange (gsap-utils skill).
 */
export const mapScroll = (
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  value: number
) => {
  return gsap.utils.mapRange(inputMin, inputMax, outputMin, outputMax, value);
};

/**
 * Utility: clamp a value.
 */
export const clampValue = (min: number, max: number, value: number) => {
  return gsap.utils.clamp(min, max, value);
};
