// Import the Express app from the built server
let appPromise;

export default async function handler(req, res) {
  // Import the Express app on first request
  if (!appPromise) {
    appPromise = import('../dist/index.cjs');
  }

  const { default: app } = await appPromise;

  // Handle the request with Express
  return app(req, res);
}
