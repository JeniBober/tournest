import { config } from './config';

// Track the loading state of the Google Maps API
let isLoading = false;
let isLoaded = false;

// Promise that resolves when the API is loaded
let loadPromise: Promise<void> | null = null;

/**
 * Loads the Google Maps API with Places library.
 * Will only load the API once, even if called multiple times.
 */
export function loadGoogleMapsApi(): Promise<void> {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // If already loaded, return resolved promise
  if (window.google?.maps) {
    isLoaded = true;
    return Promise.resolve();
  }

  // Start loading if not already loading
  if (!isLoading && config.googleMapsApiKey) {
    isLoading = true;
    loadPromise = new Promise((resolve, reject) => {
      // Create callback for when the API loads
      const callbackName = `googleMapsApiLoaded_${Date.now()}`;
      window[callbackName as keyof Window] = function() {
        isLoaded = true;
        isLoading = false;
        delete window[callbackName as keyof Window];
        resolve();
      };

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&libraries=places&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        isLoading = false;
        loadPromise = null;
        delete window[callbackName as keyof Window];
        reject(new Error('Failed to load Google Maps API'));
      };

      // Add script to document
      document.head.appendChild(script);
    });

    return loadPromise;
  }

  // Return a rejected promise if no API key
  return Promise.reject(new Error('Google Maps API key is required'));
}

/**
 * Check if the Google Maps API is loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return isLoaded || (typeof window !== 'undefined' && !!window.google?.maps);
}
