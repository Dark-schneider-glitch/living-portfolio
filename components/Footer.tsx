'use client';

import Link from 'next/link';
import { Download, Mail, Linkedin, Youtube, Code2, MapPin } from 'lucide-react';
import { PERSON } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative bg-void-950 border-t border-border-800 pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="bg-grid-orange absolute inset-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-orange-400 flex items-center justify-center ">
                <Code2 className="w-5 h-5 text-void-950" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-100">{PERSON.name}</span>
            </div>
            <p className="text-text-200 text-sm leading-relaxed mb-6 max-w-xs">
              Reliable IT support, AI-assisted web design, and practical n8n automation.
            </p>
            <div className="flex gap-4">
              <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-text-200 hover:text-orange-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={PERSON.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube channel" className="text-text-200 hover:text-caution-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-caption font-medium uppercase tracking-[0.16em] text-text-100 mb-6">Navigate</h3>
            <ul className="space-y-3">
              <li><Link href="#desk" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Home</Link></li>
              <li><Link href="#learn" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Skills</Link></li>
              <li><Link href="#code" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Services</Link></li>
              <li><Link href="#youtube" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Videos</Link></li>
              <li><Link href="#build" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Projects</Link></li>
              <li><Link href="#celebrate" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Experience</Link></li>
              <li><Link href="#present" className="text-text-200 hover:text-orange-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-caption font-medium uppercase tracking-[0.16em] text-text-100 mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-text-200 text-sm hover:text-text-100 transition-colors">
                <Mail className="w-4 h-4 text-orange-400" />
                <a href={`mailto:${PERSON.email}`} className="hover:text-orange-400 transition-colors">
                  {PERSON.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-200 text-sm">
                <MapPin className="w-4 h-4 text-caution-400" />
                {PERSON.location}
              </li>
              <li>
                <a
                  href={PERSON.resume}
                  download
                  className="inline-flex items-center gap-2 text-sm text-text-200 transition hover:text-orange-400"
                >
                  <Download className="h-4 w-4 text-orange-400" />
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-caption font-medium uppercase tracking-[0.16em] text-text-100 mb-6">Let's Build</h3>
            <p className="text-text-200 text-sm leading-relaxed mb-6">
              Available to discuss IT support, websites, and workflow automation.
            </p>
            <a
              href={`mailto:${PERSON.email}`}
              className="btn-primary w-full"
            >
              Say Hello
            </a>
          </div>
        </div>

        <div className="border-t border-border-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-500 text-caption">
            © {new Date().getFullYear()} {PERSON.name}. Built with care in Delhi, India.
          </p>
          <div className="flex gap-6 text-muted-500 text-caption">
            <span>Accessibility</span>
            <span>Performance</span>
            <span>Responsive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}