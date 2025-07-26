// src/app/(main)/hindu-calendar/page.tsx
import path from 'path';
import { promises as fs } from 'fs';
import HinduCalendarClientPage from './client-page'; // We'll create this next

export default async function HinduCalendarPage() {
    // 1. Find the absolute path to the JSON file.
  const jsonDirectory = path.join(process.cwd(), 'public/data');
  
  // 2. Read the file from the filesystem.
  const fileContents = await fs.readFile(jsonDirectory + '/july_2025.json', 'utf8');
  
  // 3. Parse the JSON data.
  const calendarData = JSON.parse(fileContents);

    // Pass server-fetched data to a client component
    return <HinduCalendarClientPage initialData={calendarData} />;
}