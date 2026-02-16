// Import and initialize the Express app from the built server
let appPromise;

export default async function handler(req, res) {
  // Import and initialize the Express app on first request
  if (!appPromise) {
    const module = await import('../dist/index.cjs');
    appPromise = module.initializeApp();
  }

  const app = await appPromise;

  // Handle the request with Express
  return app(req, res);
}
