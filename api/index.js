// Import and initialize the Express app from the built server
let appPromise;

export default async function handler(req, res) {
  // Import and initialize the Express app on first request
  if (!appPromise) {
    const module = await import('../dist/index.cjs');
    const initApp =
      module.initializeApp ??
      module.default?.initializeApp;

    if (typeof initApp === "function") {
      appPromise = initApp();
    } else if (typeof module.default === "function") {
      appPromise = Promise.resolve(module.default);
    } else {
      throw new Error("Failed to load application entrypoint from dist/index.cjs");
    }
  }

  const app = await appPromise;

  // Handle the request with Express
  return app(req, res);
}
