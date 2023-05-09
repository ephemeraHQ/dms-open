const getProductionBase = () => {
  // if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return 'www.someURL.com'; // todo
  return process.env.NEXT_PUBLIC_VERCEL_URL;
};

const getDevelopmentBase = (port) => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  return `${hostname}:${port}`;
};

const base = process.env.NODE_ENV === 'production'
  ? `https://${getProductionBase()}`
  : `http://${getDevelopmentBase(process.env.PORT || 3000)}`;

const baseURL = new URL(base);

export default baseURL;
