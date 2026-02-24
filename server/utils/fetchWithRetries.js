const axios = require('axios');

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
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
  if (!headers.Referer) headers.Referer = url.split('/').slice(0, 3).join('/');

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await axios.get(requestUrl, { headers, timeout: options.timeout || 15000 });
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

module.exports = fetchWithRetries;
