export function scrollToSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;

  const top = window.scrollY + target.getBoundingClientRect().top - 80;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (window.location.hash !== hash) {
    window.history.pushState(null, '', hash);
  }

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });

  return true;
}
