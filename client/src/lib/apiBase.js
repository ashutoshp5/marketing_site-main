export const getServerBaseUrl = () => {
  const fallback = import.meta.env.DEV ? 'http://localhost:5000' : '';
  const raw = (import.meta.env.VITE_API_URL || fallback).toString().replace(/\/$/, '');
  if (!raw) return '';
  return raw.replace(/\/api\/?$/, '');
};

export const getApiBaseUrl = () => {
  const serverBase = getServerBaseUrl();
  if (!serverBase) return '';
  return `${serverBase}/api`;
};
