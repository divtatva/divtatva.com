import { Panchanga } from '../types/panchanga';

export const fetchHinduCalendarData = async (month: number, year: number): Promise<Record<string, Panchanga>> => {
 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/data/july_2025.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch calendar data');
  }
  return response.json();
};