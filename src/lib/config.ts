declare global {
  interface Window {
    __ENV__?: { VITE_API_URL?: string };
  }
}

export const config = {
  apiUrl: window.__ENV__?.VITE_API_URL || import.meta.env.VITE_API_URL,
};
