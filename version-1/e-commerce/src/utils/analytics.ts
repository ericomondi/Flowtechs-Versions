// src/utils/analytics.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function trackFunnelEvent(event: string, extraData: object = {}) {
    const sessionId = getOrCreateSessionId();
    fetch(`${API_BASE_URL}/api/track-funnel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event, // e.g., 'add_to_cart'
            session_id: sessionId,
            timestamp: new Date().toISOString(),
            ...extraData,
        }),
    });
}

function getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2) + Date.now();
        localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
} 