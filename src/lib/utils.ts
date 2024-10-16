import { Property } from '@/types';

/**
 * Generates a random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats time from 24-hour format to 12-hour format
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minutes} ${ampm}`;
}

/**
 * Sorts properties by viewing time
 */
export function sortPropertiesByTime(properties: Property[]): Property[] {
  return [...properties].sort((a, b) => {
    const timeA = a.viewingTime.replace(':', '');
    const timeB = b.viewingTime.replace(':', '');
    return parseInt(timeA) - parseInt(timeB);
  });
}
