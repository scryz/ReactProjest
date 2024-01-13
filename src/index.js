import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";
 
Sentry.init({
  dsn: "https://0d57838c87ae1f917e7a5ce5de595484@o4506552476893184.ingest.sentry.io/4506552479252480",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
    //new Integrations.BrowserTracing()
    //new Sentry.Integrations.BrowserTracing()
    //new Sentry.BrowserProfilingIntegration(),
    //new Sentry.BrowserTracing(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  profilesSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
  
      <App />
  
  </React.StrictMode>
);