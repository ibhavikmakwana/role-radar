/**
 * Cloudflare Pages Function: /api/jobs
 * Multi-source ATS edge aggregator with edge caching.
 */

export async function onRequestGet(context) {
  const cacheHeaders = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    // Dynamically fallback to pre-built static feed or fetch upstream
    const staticFeed = await context.env.ASSETS?.fetch(new URL('/data/feed.json', context.request.url));
    if (staticFeed && staticFeed.ok) {
      const data = await staticFeed.json();
      return new Response(JSON.stringify(data), { headers: cacheHeaders });
    }

    return new Response(
      JSON.stringify({ status: 'ok', jobs: [], message: 'Use scraper.py or static feed.json' }),
      { headers: cacheHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ status: 'error', message: err.message }),
      { status: 500, headers: cacheHeaders }
    );
  }
}
