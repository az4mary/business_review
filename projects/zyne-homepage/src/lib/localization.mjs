export const getBrowserLocale = () => {
  if (typeof navigator === 'undefined') return 'en';
  const locales = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
    navigator.userLanguage,
    navigator.browserLanguage
  ].filter(Boolean).map((value) => String(value));
  return locales[0] || 'en';
};

export const pickLocalePack = (locale, packs = {}, fallbackKey = 'en') => {
  const normalized = String(locale || 'en').toLowerCase();
  const candidates = [normalized, normalized.split('-')[0], fallbackKey];
  for (const key of candidates) {
    if (key && packs[key]) return { key, pack: packs[key] };
  }
  return { key: fallbackKey, pack: packs[fallbackKey] || {} };
};

export const formatMoney = (value, locale, currency, options = {}) => {
  return new Intl.NumberFormat(locale || 'en', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(value);
};

export const formatDate = (value, locale, options = { dateStyle: 'long' }) => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale || 'en', options).format(date);
};
