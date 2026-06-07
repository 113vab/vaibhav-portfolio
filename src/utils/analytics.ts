/**
 * Privacy-friendly modular analytics tracker
 * Logs recruiter interaction metrics locally to localStorage and console outputs
 */

export interface TrackingEvent {
  eventName: string;
  timestamp: string;
  details?: Record<string, any>;
}

export const trackEvent = (eventName: string, details?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  const timestamp = new Date().toISOString();
  const newEvent: TrackingEvent = { eventName, timestamp, details };

  // Log to console for visual validation
  console.log(`%c[Analytics] ${eventName}`, "color: #ff3b30; font-weight: bold;", {
    timestamp,
    ...details,
  });

  try {
    // Read previous events from localStorage
    const existingLogs = localStorage.getItem("portfolio_analytics");
    const logs: TrackingEvent[] = existingLogs ? JSON.parse(existingLogs) : [];
    
    // Add new event and cap at 100 entries
    logs.push(newEvent);
    if (logs.length > 100) logs.shift();

    localStorage.setItem("portfolio_analytics", JSON.stringify(logs));
  } catch (error) {
    console.warn("Analytics storage failed", error);
  }
};
