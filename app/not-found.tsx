import Link from 'next/link';
import { Ghost, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center">
      <div className="term-card flex max-w-md flex-col items-center p-8">
        <Ghost className="mb-4 h-12 w-12 text-orange-400" />
        <h2 className="mb-2 font-display text-2xl font-bold text-text-100">
          Page not found
        </h2>
        <p className="mb-8 text-text-200">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary flex items-center gap-2">
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
