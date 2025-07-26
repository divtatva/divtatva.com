/**
 * A collection of robust, timezone-aware date utility functions.
 * These are designed to handle common date operations reliably across your application.
 */

/**
 * Formats a Date object into a human-readable string.
 * Uses the Intl.DateTimeFormat API for robust, locale-aware formatting.
 * @param date The Date object to format.
 * @param options Intl.DateTimeFormatOptions to customize the output. The default provides a "yyyy-mm-dd" format.
 * @returns A formatted date string (e.g., "2025-07-26").
 */
export const formatDate = (
  date: Date, 
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC', // Default to UTC to avoid timezone inconsistencies unless specified otherwise
  }
): string => {
  // The 'en-CA' (Canadian English) locale reliably formats dates as yyyy-mm-dd.
  return new Intl.DateTimeFormat('en-CA', options).format(date);
};

/**
 * Compares two Date objects to see if they fall on the same calendar day (year, month, and day).
 * This function correctly ignores the time and timezone differences, comparing only the date part.
 * * @param date1 The first Date object.
 * @param date2 The second Date object.
 * @returns True if both dates are on the same calendar day, false otherwise.
 */
export const areDatesOnSameDay = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Converts a date from its inherent timezone to a different one.
 * It returns a new string representation of that exact moment in time in the target timezone.
 * * @param date The original Date object.
 * @param timeZone The target IANA timezone string (e.g., 'America/New_York', 'Asia/Kolkata', 'Europe/London').
 * @returns A string representing the date and time in the new timezone.
 */
export const convertTimeZone = (
    date: Date, 
    timeZone: string
): string => {
    if (!date) return '';
    
    // Check if the provided timezone is valid
    try {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone,
            timeZoneName: 'short'
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
        console.error("Invalid timeZone provided:", timeZone, error);
        // Return the date in a default format if the timezone is invalid
        return date.toLocaleString(); 
    }
};

export const firstDayOfMonth = (date: Date): number => {
    if (!date) return 1; // Default to the first day if no date is
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),1)).getUTCDay();
};
export const daysInMonth = (date: Date): number => {
    if (!date) return 31; // Default to 31 days if no date is provided
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
};
export const getMonthName = (date: Date): string => {
    if (!date) return '';
    return date.toLocaleString('default', { month: 'long' });
};

export const today = (): Date => {
    return new Date(new Date().toISOString().split('T')[0]); // Returns today's date at midnight in UTC
};
export const isToday = (date: Date): boolean => {
    if (!date) return false;
    const todayDate = today();
    return (
        date.getFullYear() === todayDate.getFullYear() &&
        date.getMonth() === todayDate.getMonth() &&
        date.getDate() === todayDate.getDate()
    );
}; 

export const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    const parts = dateString.split('-');
    if (parts.length !== 3) return new Date(); // Invalid format, return current date
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
};

export const getTime = (date: Date): string => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'UTC' // Default to UTC to avoid timezone inconsistencies
    });
}

export const formatTime = (isoString: string): string =>     {
                if (!isoString) return '';
                const d = new Date(isoString);
                if (isNaN(d.getTime())) return '';
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
