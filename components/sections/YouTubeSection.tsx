'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Play, Youtube } from 'lucide-react';
import { PERSON } from '@/lib/data';

type Video = {
  id: string;
  title: string;
  published: string;
};

function isVideo(value: unknown): value is Video {
  if (typeof value !== 'object' || value === null) return false;
  return (
    'id' in value &&
    typeof value.id === 'string' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'published' in value &&
    typeof value.published === 'string' &&
    !Number.isNaN(Date.parse(value.published))
  );
}

function isVideoResponse(value: unknown): value is { videos: Video[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'videos' in value &&
    Array.isArray(value.videos) &&
    value.videos.every(isVideo)
  );
}

const CHANNEL_ID = 'UCSTLqKz57q1LXAgF5RDRJpA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXml(value: string) {
  return value
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/&apos;/g, "'");
}

function getTagValue(entry: string, tag: string) {
  const match = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1] ? decodeXml(match[1].trim()) : '';
}

export function YouTubeSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadVideos = async () => {
      try {
        // Use a CORS proxy to fetch the YouTube RSS feed client-side
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
        const response = await fetch(proxyUrl, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('Failed to fetch YouTube feed');
        }

        const data = await response.json();

        if (data.status !== 'ok' || !data.items) {
          throw new Error('Invalid feed response');
        }

        const parsedVideos: Video[] = data.items
          .slice(0, 3)
          .map((item: any) => {
            // Extract video ID from YouTube URL
            const videoIdMatch = item.link.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/);
            const videoId = videoIdMatch?.[1];

            if (!videoId || !item.title || !item.pubDate) return null;

            return {
              id: videoId,
              title: item.title,
              published: item.pubDate,
            };
          })
          .filter((v: Video | null): v is Video => v !== null);

        if (active) {
          setVideos(parsedVideos);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          const message = loadError instanceof Error ? loadError.message : 'Unable to load videos right now.';
          setError(message);
          console.error('Unable to load latest YouTube videos:', loadError);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadVideos();
    const refresh = window.setInterval(() => {
      if (document.visibilityState === 'visible') void loadVideos();
    }, 60 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, []);

  return (
    <section
      id="youtube"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 12% 20%, var(--color-orange-glow), transparent 35%), var(--color-bg)',
      }}
    >
      <div className="bg-grid-caution absolute inset-0 pointer-events-none opacity-30" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-caution-400/20 bg-caution-400/5 px-4 py-2 text-caption font-medium text-caution-400">
              <Youtube className="h-4 w-4" />
              Latest videos
            </div>
            <h2 className="mb-4 font-display text-section-title font-extrabold leading-tight text-text-100">
              From my <span className="text-gradient-orange">YouTube channel.</span>
            </h2>
            <p className="max-w-2xl text-body-lg leading-relaxed text-text-200">
              The three newest uploads from ITnauts, refreshed automatically.
            </p>
          </div>
          <a
            href={PERSON.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0 self-start"
          >
            Visit channel
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {loading ? (
          <div className="term-card p-8 text-center text-text-200" role="status">
            <div className="flex items-center justify-center gap-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
              <span>Loading latest videos…</span>
            </div>
          </div>
        ) : error ? (
          <div className="term-card p-8 text-center text-text-200" role="status">
            Oops, it&apos;s not working: {error}{' '}
            <a className="text-orange-400 underline underline-offset-4 hover:text-orange-300" href={PERSON.youtube} target="_blank" rel="noopener noreferrer">
              Browse the channel instead.
            </a>
          </div>
        ) : videos.length === 0 ? (
          <div className="term-card p-8 text-center text-text-200" role="status">
            No videos are available yet. Check the channel for future uploads.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                className="term-card overflow-hidden flex flex-col"
                key={video.id}
              >
                <a
                  className="group/video block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.title} on YouTube`}
                >
                  <div
                    className="youtube-thumbnail relative flex aspect-video items-center justify-center bg-void-900 bg-cover bg-center"
                    role="img"
                    aria-label={`Thumbnail for ${video.title}`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.18)), url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)`,
                    }}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-void-950 shadow-terminal transition group-hover/video:scale-110">
                      <Play className="ml-1 h-6 w-6 fill-current" />
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="line-clamp-2 min-h-14 font-display text-lg font-semibold leading-snug text-text-100">
                      {video.title}
                    </h3>
                    <p className="mt-auto mt-3 flex items-center gap-2 text-caption text-muted-400">
                      <Play className="h-3.5 w-3.5 text-orange-400" />
                      {new Date(video.published).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}