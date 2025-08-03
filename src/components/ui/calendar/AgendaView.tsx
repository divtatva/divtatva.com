import {
  KaranaDetail,
  NakshatraDetail,
  TithiDetail,
  YogaDetail,
} from "@/lib/types/panchanga";
import { formatTime } from "@/lib/utils/dateUtils";

type EventDetailsProps = {
  selectedDate: string | number | Date;
  details?: {
    day: string | number | Date;
    sunrise: string;
    sunset: string;
    tithi: TithiDetail[];
    nakshatra: NakshatraDetail[];
    yoga: YogaDetail[];
    karana: KaranaDetail[];
    moonrise?: string;
    moonset?: string;
    muhurta?: {
      rahu_kaalam?: { start: string; end: string };
      gulika_kaalam?: { start: string; end: string };
      yamaganda_kaalam?: { start: string; end: string };
      abhijit_muhurta?: { start: string; end: string };
    };
    paksha?: string;
  };
};

// Agenda view for selected day
function AgendaView({ details, selectedDate }: EventDetailsProps) {
  const formattedDate = details?.tithi && details?.tithi?.length > 0 ? details.tithi[0].name : "No Tithi";

  if (!details)
    return <div className="p-8 text-gray-400">No data for this day.</div>;
  // Collect events with start/end times
  const events: {
    name: string;
    start: string;
    end?: string;
    color: string;
    sortKey: string;
  }[] = [];
  if (details.sunrise)
    events.push({
      name: "Sunrise",
      start: formatTime(details.sunrise),
      color: "#fbbf24",
      sortKey: details.sunrise,
    });
  if (details.sunset)
    events.push({
      name: "Sunset",
      start: formatTime(details.sunset),
      color: "#f59e42",
      sortKey: details.sunset,
    });
  if (details.moonrise)
    events.push({
      name: "Moonrise",
      start: formatTime(details.moonrise),
      color: "#a78bfa",
      sortKey: details.moonrise,
    });
  if (details.moonset)
    events.push({
      name: "Moonset",
      start: formatTime(details.moonset),
      color: "#6366f1",
      sortKey: details.moonset,
    });
  if (details.muhurta) {
    if (details.muhurta.rahu_kaalam)
      events.push({
        name: "Rahu Kaal",
        start: formatTime(details.muhurta.rahu_kaalam.start),
        end: formatTime(details.muhurta.rahu_kaalam.end),
        color: "#f472b6",
        sortKey: details.muhurta.rahu_kaalam.start,
      });
    if (details.muhurta.gulika_kaalam)
      events.push({
        name: "Gulika Kaal",
        start: formatTime(details.muhurta.gulika_kaalam.start),
        end: formatTime(details.muhurta.gulika_kaalam.end),
        color: "#f472b6",
        sortKey: details.muhurta.gulika_kaalam.start,
      });
    if (details.muhurta.yamaganda_kaalam)
      events.push({
        name: "YamaGanda",
        start: formatTime(details.muhurta.yamaganda_kaalam.start),
        end: formatTime(details.muhurta.yamaganda_kaalam.end),
        color: "#f472b6",
        sortKey: details.muhurta.yamaganda_kaalam.start,
      });
    if (details.muhurta.abhijit_muhurta)
      events.push({
        name: "Abhijit Muhurta",
        start: formatTime(details.muhurta.abhijit_muhurta.start),
        end: formatTime(details.muhurta.abhijit_muhurta.end),
        color: "#6ee7b7",
        sortKey: details.muhurta.abhijit_muhurta.start,
      });
  }
  // Sort events by sortKey (start time)
  events.sort((a, b) => {
    if (!a.sortKey && !b.sortKey) return 0;
    if (!a.sortKey) return 1;
    if (!b.sortKey) return -1;
    return a.sortKey.localeCompare(b.sortKey);
  });
  return (
    <div className="card p-6 h-full dark:bg-gray-900">
      <div className="flex items-center mb-4">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-300 mr-4">
          {formattedDate}
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Agenda for {String(details.day || selectedDate)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {details.paksha}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4" suppressHydrationWarning={true}>
        {events.length === 0 ? (
          <div className="text-gray-400 dark:text-gray-500">
            No events for this day.
          </div>
        ) : (
          events.map((ev) => (
            <div
              key={ev.name + ev.start + (ev.end || "")}
              className="flex items-center gap-4 bg-blue-50 dark:bg-blue-950 border-l-4 dark:border-l-4"
              style={{ borderColor: ev.color }}
            >
              <div className="flex-1 py-3 px-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: ev.color }}
                ></div>
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {ev.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-blue-900 dark:text-blue-200">
                  {ev.start}
                  {ev.end ? ` - ${ev.end}` : ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AgendaView;
