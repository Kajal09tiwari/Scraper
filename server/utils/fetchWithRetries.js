const axios = require('axios');

const uaList = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
];

const defaultHeaders = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive',
  'DNT': '1'
};

/**
 * Fetch a URL with retries and optional scraping-API proxy.
 *
 * Environment variables:
 * - SCRAPER_API_PROVIDER: 'scraperapi' | 'scrapingbee' (optional)
 * - SCRAPER_API_KEY: API key for provider (optional)
 */
async function fetchWithRetries(url, options = {}) {
  const maxRetries = options.retries || 3;
  const provider = (process.env.SCRAPER_API_PROVIDER || '').toLowerCase();
  const apiKey = process.env.SCRAPER_API_KEY || '';
  let requestUrl = url;

  if (provider === 'scraperapi' && apiKey) {
    requestUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(url)}&render=false`;
  } else if (provider === 'scrapingbee' && apiKey) {
    requestUrl = `https://app.scrapingbee.com/api/v1?api_key=${apiKey}&url=${encodeURIComponent(url)}&render_js=false`;
  }

  const headers = Object.assign({}, defaultHeaders, options.headers || {});
  // rotate user-agent per request
  headers['User-Agent'] = uaList[Math.floor(Math.random() * uaList.length)];
  if (!headers.Referer) headers.Referer = url.split('/').slice(0, 3).join('/');
  if (!headers.Origin) headers.Origin = headers.Referer;
  headers['Sec-Fetch-Mode'] = headers['Sec-Fetch-Mode'] || 'navigate';

  for (let i = 0; i < maxRetries; i++) {
    try {
      // log which provider is used (if any) to help debugging
      if (provider && apiKey) console.debug('fetchWithRetries: using provider', provider);
      return await axios.get(requestUrl, { headers, timeout: options.timeout || 15000 });
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

module.exports = fetchWithRetries;
