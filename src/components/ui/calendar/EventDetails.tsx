import { KaranaDetail, NakshatraDetail, TithiDetail, YogaDetail } from "@/lib/types/panchanga";
import { parseDate, formatTime } from "@/lib/utils/dateUtils";

type EventDetailsProps = {
  selectedDate: string | number | Date;
  details?: {
    sunrise: string;
    sunset: string;
    tithi: TithiDetail[];
    nakshatra: NakshatraDetail[];
    yoga: YogaDetail[];
    karana: KaranaDetail[];
  };
};

const EventDetails = ({ selectedDate, details }: EventDetailsProps) => {
  if (!details) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <p>Select a date to view its Panchang details.</p>
      </div>
    );
  }

  //Extract the necessary data from details
  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card p-6 h-full">
      <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
        Panchang Details
      </h3>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">
        {formattedDate}
      </p>

      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center mr-4">
            ☀️
          </span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sunrise / Sunset
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-100" suppressHydrationWarning={true}>
              {formatTime(details.sunrise)} / {formatTime(details.sunset)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center mr-4">
            🌙
          </span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tithi</p>
            <div className="flex flex-wrap gap-2">
              {details.tithi && details.tithi.length > 0 ? (
                details.tithi.map((t) => (
                  <span key={t.id} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {t.name}{" "}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center mr-4">
            ⭐
          </span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nakshatra
            </p>
            <div className="flex flex-wrap gap-2">
              {details.nakshatra && details.nakshatra.length > 0 ? (
                details.nakshatra.map((t) => (
                  <span key={t.id} className="inline-block bg-yellow-100 text-yellow-800  text-xs px-2 py-1 rounded-full">
                    {t.name}{" "}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center mr-4">
            🧘
          </span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Yoga</p>
            <div className="flex flex-wrap gap-2">
              {details.yoga && details.yoga.length > 0 ? (
                details.yoga.map((t) => (
                  <span key={t.id} className="inline-block bg-yellow-100 text-yellow-800  text-xs px-2 py-1 rounded-full">
                    {t.name}{" "}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center mr-4">
            🙏
          </span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Karana</p>
            <div className="flex flex-wrap gap-2">
              {details.karana && details.karana.length > 0 ? (
                details.karana.map((t) => (
                  <span key={t.id} className="inline-block bg-yellow-100 text-yellow-800  text-xs px-2 py-1 rounded-full">
                    {t.name}{" "}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
