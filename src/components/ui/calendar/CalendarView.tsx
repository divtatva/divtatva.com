import {firstDayOfMonth, daysInMonth, formatDate} from '@/lib/utils/dateUtils';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

interface CalendarViewProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  selectedDate: string;
}

const CalendarView = ({ currentDate, onDateSelect, selectedDate }: CalendarViewProps) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const fDMonth = firstDayOfMonth(currentDate);
  const dMonths = daysInMonth(currentDate);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="card p-6">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: fDMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="border rounded-lg border-transparent"></div>
        ))}
        {Array.from({ length: dMonths }).map((_, day) => {
          const date = day + 1;
          const fullDate = new Date(Date.UTC(year, month, date));
          const dateString = fullDate.toISOString().split('T')[0]; // YYYY-MM-DD

          const isSelected = selectedDate === dateString;
          const todayUTC = new Date().toISOString().split('T')[0];
          const isToday = todayUTC === dateString;

          return (
            <div
              key={date}
              onClick={() => onDateSelect(fullDate)}
              className={cn(
                "p-2 text-center border rounded-lg cursor-pointer transition-all duration-200 ease-in-out",
                "hover:bg-orange-100 dark:hover:bg-orange-900 hover:shadow-md hover:scale-105",
                isSelected
                  ? "bg-orange-500 text-white font-bold shadow-lg scale-105 border-orange-600 dark:bg-orange-600 dark:text-white"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                isToday && !isSelected
                  ? "border-orange-400 border-2 dark:border-orange-400"
                  : "border-gray-200 dark:border-gray-700",
              )}
            >
              <div className="font-medium">{date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;