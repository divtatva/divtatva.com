/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AgendaView from "@/components/ui/calendar/AgendaView";
import CalendarView from "@/components/ui/calendar/CalendarView";
import EventDetails from "@/components/ui/calendar/EventDetails";
import { KaranaDetail, NakshatraDetail, Panchanga, TithiDetail, YogaDetail } from "@/lib/types/panchanga";
import { formatDate, formatTime } from "@/lib/utils/dateUtils";
import { useMemo, useState } from "react";

export default function HinduCalendarPage({ initialData }: { initialData: Record<string, any> }) {
  const PanchangaView = (panchaga: Record<string, Panchanga>) => {
    const result: Record<string, {
      date: string,
      tithi: TithiDetail[],
      nakshatra: NakshatraDetail[],
      yoga: YogaDetail[],
      karana: KaranaDetail[],
      sunrise: string,
      sunset: string
    }> = {};

    if (!panchaga) return result;
    // Convert each panchanga entry to the desired format
    Object.entries(panchaga).forEach(([dateStr, panchangaObj]) => {
      result[dateStr] = panchangaObj;
    });
    return result;
  }
  const calendarData = initialData;
  const panchangaData = PanchangaView(calendarData);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(currentDate));
  const [view, setView] = useState<'calendar' | 'agenda'>('calendar');

  const selectedDateDetails = useMemo(() => {
    if (!selectedDate || !panchangaData[selectedDate]) {
      return null;
    }
    return calendarData[selectedDate] || null;
  }, [selectedDate, panchangaData]);

  const handleDateSelect = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    setSelectedDate(formatted);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="card flex flex-col items-center mb-8 gap-4 sm:gap-0">
            <h1 className="font-bold text-3xl sm:text-4xl mb-2">Hindu Panchang</h1>
            <div className="flex items-center gap-2 justify-center w-full">
              <button
                onClick={() => changeMonth(-1)}
                className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 text-lg font-semibold transition-colors duration-200 min-w-[44px] min-h-[44px]"
                aria-label="Previous Month"
              >
                <span className="sr-only">Previous</span>
                <span aria-hidden="true">‹</span>
                <span className="ml-2 hidden xs:inline">Prev</span>
              </button>
              <span className="text-lg sm:text-xl font-semibold text-gray-900 px-2 min-w-[120px] text-center">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => changeMonth(1)}
                className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 text-lg font-semibold transition-colors duration-200 min-w-[44px] min-h-[44px]"
                aria-label="Next Month"
              >
                <span className="mr-2 hidden xs:inline">Next</span>
                <span aria-hidden="true">›</span>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>

          {/* Main Content Grid - calendar smaller, event details larger */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 card">
              <CalendarView
                currentDate={currentDate}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              <EventDetails
                selectedDate={selectedDate}
                details={selectedDateDetails}
              />
            </div>
            <div className="lg:col-span-3 card flex flex-col gap-6">
              
                <AgendaView details={selectedDateDetails} selectedDate={selectedDate}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}