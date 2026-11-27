import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCSTLqKz57q1LXAgF5RDRJpA';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export const dynamic = 'force-dynamic';

function feedError(message: string, status = 502) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function getTagValue(entry: string, tag: string) {
  const match = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1] ? decodeXml(match[1].trim()) : '';
}

export async function GET() {
  try {
    const response = await fetch(FEED_URL, {
      headers: { Accept: 'application/atom+xml, application/xml' },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      console.error(`YouTube feed request failed with status ${response.status}.`);
      return feedError('The YouTube feed is temporarily unavailable.');
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('xml') && !contentType.includes('atom')) {
      console.error(`Unexpected YouTube feed content type: ${contentType || 'missing'}.`);
      return feedError('The YouTube feed returned an unexpected response.');
    }

    const xml = await response.text();
    const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))
      .map(([, entry]) => {
        const id = getTagValue(entry, 'yt:videoId');
        const title = getTagValue(entry, 'title');
        const published = getTagValue(entry, 'published');

        if (!/^[\w-]{11}$/.test(id) || !title || !published) return null;

        return {
          id,
          title,
          published,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((video): video is NonNullable<typeof video> => video !== null)
      .slice(0, 3);

    if (entries.length === 0) {
      console.error('The YouTube feed contained no valid videos.');
      return feedError('No videos could be loaded from the YouTube feed.');
    }

    return NextResponse.json(
      { videos: entries },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Unable to retrieve the YouTube feed:', error);
    return feedError('The YouTube feed is temporarily unavailable.');
  }
}
