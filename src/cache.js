// Simple in-memory cache as fallback (if Redis not installed)
const cache = {};
const ttl = process.env.CACHE_TTL_SEC ? parseInt(process.env.CACHE_TTL_SEC) : 60;

function set(key, value) {
  cache[key] = { value, expiry: Date.now() + ttl * 1000 };
}

function get(key) {
  const data = cache[key];
  if (!data) return null;
  if (Date.now() > data.expiry) {
    delete cache[key];
    return null;
  }
  return data.value;
}

module.exports = { set, get };
