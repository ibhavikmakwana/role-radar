/**
 * Cloudflare Pages Function: /api/shortlist
 * Handles KV-backed shortlist creation and retrieval when deployed on Cloudflare Pages.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    if (!env.SHORTLIST_KV) {
      return new Response(
        JSON.stringify({ status: 'ok', mode: 'url_hash', message: 'KV not bound. Using client URL-hash storage.' }),
        { headers }
      );
    }

    const payload = await request.json();
    const { jobIds } = payload;

    if (!Array.isArray(jobIds) || jobIds.length === 0 || jobIds.length > 50) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid payload: jobIds must be an array of 1 to 50 items' }),
        { status: 400, headers }
      );
    }

    // Generate random 6-character shortcode
    const shortCode = Math.random().toString(36).substring(2, 8);
    await env.SHORTLIST_KV.put(
      `shortlist:${shortCode}`,
      JSON.stringify({ jobIds, createdAt: new Date().toISOString() }),
      { expirationTtl: 60 * 60 * 24 * 30 } // 30 Days TTL
    );

    return new Response(
      JSON.stringify({ status: 'ok', code: shortCode, shareUrl: `/#saved=${shortCode}` }),
      { headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ status: 'error', message: err.message }),
      { status: 500, headers }
    );
  }
}
