import React, { useState } from "react";

export const Calendar = () => {
  const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    1: [
      { name: "Netflix", icon: "icon" },
      { name: "Spotify", icon: "icon" },
    ],
    2: [{ name: "Disney+", icon: "icon" }],
    3: [{ name: "Amazon Prime", icon: "icon" }],
    4: [],
    5: [{ name: "HBO Max", icon: "icon" }],
    6: [{ name: "Apple Music", icon: "icon" }],
    7: [],
    8: [{ name: "YouTube Premium", icon: "icon" }],
    9: [{ name: "Hulu", icon: "icon" }],
    10: [],
    11: [{ name: "PlayStation Plus", icon: "icon" }],
    12: [{ name: "Nintendo Online", icon: "icon" }],
    13: [],
    14: [{ name: "Adobe Creative Cloud", icon: "icon" }],
    15: [{ name: "Microsoft 365", icon: "icon" }],
    16: [],
    17: [{ name: "Crunchyroll", icon: "icon" }],
    18: [{ name: "Paramount+", icon: "icon" }],
    19: [],
    20: [{ name: "Apple TV+", icon: "icon" }],
    21: [{ name: "Xbox Game Pass", icon: "icon" }],
    22: [],
    23: [{ name: "Dropbox", icon: "icon" }],
    24: [{ name: "Google One", icon: "icon" }],
    25: [],
    26: [{ name: "Peacock", icon: "icon" }],
    27: [{ name: "EA Play", icon: "icon" }],
    28: [],
    29: [{ name: "Tidal", icon: "icon" }],
    30: [{ name: "Audible", icon: "icon" }],
    31: [{ name: "iCloud+", icon: "icon" }],
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const monthNow = new Date(selectedYear, months.indexOf(selectedMonth));
  const firstDayOfMonth = monthNow.getDay() - 1;
  const daysInMonth = new Date(
    selectedYear,
    months.indexOf(selectedMonth) + 1,
    0
  ).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const generateCalendarDays = () => {
    const days = [];
    let dayCount = 1;

    // Get days from previous month
    const prevMonthDays = new Date(
      selectedYear,
      months.indexOf(selectedMonth),
      0
    ).getDate();
    let prevMonthStartDay = prevMonthDays - firstDayOfMonth + 1;

    for (let row = 0; row < numRows; row++) {
      const weekDays = [];
      for (let col = 0; col < 7; col++) {
        const dayIndex = row * 7 + col;
        if (dayIndex < firstDayOfMonth) {
          weekDays.push(
            <div
              key={`prev-${prevMonthStartDay}`}
              className="w-full aspect-square flex items-end justify-center opacity-40 py-1 bg-zinc-700/20 rounded-[16px]"
            >
              {String(prevMonthStartDay++).padStart(2, "0")}
            </div>
          );
        } else if (dayCount > daysInMonth) {
          weekDays.push(
            <div
              key={`next-${dayCount - daysInMonth}`}
              className="w-full aspect-square flex items-end justify-center opacity-40 py-1 bg-zinc-700/20 rounded-[16px]"
            >
              {String(dayCount - daysInMonth).padStart(2, "0")}
            </div>
          );
          dayCount++;
        } else {
          weekDays.push(
            <div
              key={dayCount}
              className="w-full aspect-square flex flex-col items-center justify-end py-1 bg-[#1e1e1e] rounded-[16px]"
            >
              {data[dayCount] && data[dayCount].length > 0 && (
                <div className="w-full flex flex-col gap-1">
                  {data[dayCount].map((item, index) => (
                    <div key={index} className="text-xs text-zinc-400 truncate">
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="text-sm">{String(dayCount).padStart(2, "0")}</div>
            </div>
          );
          dayCount++;
        }
      }
      days.push(
        <div key={`row-${row}`} className="grid grid-cols-7 gap-2 w-full">
          {weekDays}
        </div>
      );
    }
    return days;
  };

  const handleIncrement = (val) => {
    const numericMonth = months.indexOf(selectedMonth);
    if (numericMonth + val < 0) {
      setSelectedYear((current) => current - 1);
      setSelectedMonth(months[11]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((current) => current + 1);
      setSelectedMonth(months[0]);
    } else {
      setSelectedMonth(months[numericMonth + val]);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            className="bg-[#323232] rounded-full p-2 w-10"
            onClick={() => handleIncrement(-1)}
          >
            <i className="fa-solid fa-chevron-left fa-xs"></i>
          </button>
          <button
            className="bg-[#323232] rounded-full p-2 w-10"
            onClick={() => handleIncrement(1)}
          >
            <i className="fa-solid fa-chevron-right fa-xs"></i>
          </button>

          <h2 className="ml-2 sm:text-3xl tracking-wider text-lg flex items-center justify-start gap-1 font-bold text-zinc-300">
            {selectedMonth}
            <span className="opacity-50"> {selectedYear}</span>
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm sm:text-md opacity-50">Monthly spend</span>
          <span className="text-lg sm:text-xl font-semibold">€63.23</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dayList.map((day, key) => (
          <div
            key={key}
            className="text-center uppercase text-xs bg-[#323232] py-1 px-0.5 rounded-xl"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">{generateCalendarDays()}</div>
    </div>
  );
};
