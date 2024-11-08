/**
 * Application configuration
 */
export const config = {
  /**
   * Google Maps API key
   * In production, this comes from Vercel environment variables
   * In development, you can set it in your .env.local file
   */
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
};
