/// <reference types="google.maps" />

declare global {
  interface Window {
    google: typeof google;
    // For dynamic callback functions
    [key: string]: unknown;
  }
}

export {};
