import React, { useState } from "react";
import netflix from "../assets/netflix.png";
import spotify from "../assets/spotify.png";
import basicfit from "../assets/basicfit.png";
import dropbox from "../assets/dropbox.png";
import icloud from "../assets/icloud.png";
import playstation from "../assets/playstation.png";
import microsoft from "../assets/microsoft.png";
import crunchyroll from "../assets/crunchyroll.png";
import linkedin from "../assets/linkedin.png";
import xbox from "../assets/xbox.png";
import discord from "../assets/discord.png";
import amazon from "../assets/amazon.svg";
import { AddSubscriptionDialog } from "./AddSubscriptionDialog";
import { ViewDayDialog } from "./ViewDayDialog";

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
  const dataDefault = {
    1: [
      {
        name: "Netflix",
        icon: netflix,
        price: "12.99",
        color: "#ff5a5f20",
        since: "01-09-2021",
      },
    ],
    2: [],
    3: [],
    4: [],
    5: [
      {
        name: "Basic Fit",
        icon: basicfit,
        price: "24.99",
        color: "#ff885a20",
        since: "05-12-2022",
      },
    ],
    6: [],
    7: [],
    8: [],
    9: [
      {
        name: "Dropbox",
        icon: dropbox,
        price: "6.99",
        color: "#0077b520",
        since: "09-09-2023",
      },
      { name: "ICloud+", icon: icloud, price: "4.99", since: "09-09-2023" },
      {
        name: "Microsoft",
        icon: microsoft,
        price: "11",
        color: "#0077b520",
        since: "09-12-2023",
      },
    ],
    10: [],
    11: [
      {
        name: "Xbox+",
        icon: xbox,
        price: "11",
        color: "#3ecf8e20",
        since: "11-09-2023",
      },
      {
        name: "PlayStation+",
        icon: playstation,
        price: "14.99",
        color: "#3ecf8e20",
        since: "11-09-2023",
      },
    ],
    12: [],
    13: [],
    14: [],
    15: [
      {
        name: "Crunchyroll",
        icon: crunchyroll,
        price: "15",
        color: "#ff885a20",
        since: "15-03-2024",
      },
    ],
    16: [],
    17: [],
    18: [],
    19: [
      {
        name: "Linkedin",
        icon: linkedin,
        price: "12.99",
        color: "#0077b520",
        since: "19-04-2024",
      },
    ],
    20: [],
    21: [],
    22: [
      {
        name: "Discord",
        icon: discord,
        price: "7.99",
        color: "#7289da20",
        since: "22-05-2024",
      },
    ],
    23: [],
    24: [],
    25: [
      {
        name: "Amazon",
        icon: amazon,
        price: "2.99",
        color: "#ff990020",
        since: "25-06-2024",
      },
    ],
    26: [],
    27: [],
    28: [
      {
        name: "Spotify",
        icon: spotify,
        price: "9.99",
        color: "rgba(62, 207, 142, 0.125)",
        since: "28-07-2024",
      },
    ],
    29: [],
    30: [],
    31: [],
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [openDay, setOpenDay] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [data, setData] = useState(dataDefault);
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
              className="w-full aspect-square flex items-end justify-center opacity-40 py-1 pt-2 h-full  bg-zinc-700/20 rounded-[16px]"
            >
              {String(prevMonthStartDay++).padStart(2, "0")}
            </div>
          );
        } else if (dayCount > daysInMonth) {
          weekDays.push(
            <div
              key={`next-${dayCount - daysInMonth}`}
              className="w-full aspect-square flex items-end justify-center opacity-40 py-1 pt-2  h-full bg-zinc-700/20 rounded-[16px]"
            >
              {String(dayCount - daysInMonth).padStart(2, "0")}
            </div>
          );
          dayCount++;
        } else {
          weekDays.push(
            <div
              onClick={handleClickDay}
              value={dayCount}
              key={dayCount}
              className="w-full aspect-square flex flex-col items-center justify-end py-1 pt-2  h-full bg-[#1e1e1e] rounded-[16px] hover:cursor-pointer"
            >
              {data[dayCount] && data[dayCount].length > 0 && (
                <div value={dayCount} className="w-full flex justify-center  ">
                  {data[dayCount].map((item, index) => (
                    <div
                      value={dayCount}
                      key={index}
                      className="w-full flex items-center justify-center"
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        value={dayCount}
                        className="size-5 sm:size-6 rounded mb-2 "
                      />
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
        <div
          key={`row-${row}`}
          className="grid grid-cols-7 gap-1 sm:gap-2 w-full min-h-[75px]"
        >
          {weekDays}
        </div>
      );
    }
    return days;
  };

  const generateMonthlySpend = () => {
    let total = 0;
    for (const day in data) {
      total += data[day].reduce((acc, item) => acc + parseFloat(item.price), 0);
    }
    return total;
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

  const handleClickDay = (e) => {
    let value = e.target.getAttribute("value");
    if (data[value] && data[value].length > 0) {
      setCurrentItem(data[value]);
      setSelectedDay(value);
      setCurrentItemIndex(value);
      setOpenDay(true);
    } else {
      setCurrentItem(null);
      setSelectedDay(value);
      setCurrentItemIndex(value);
      setOpenDay(true);
    }
  };
  const handleDeleteSubscriptions = () => {
    console.log(currentItemIndex);
    let newData = { ...data };
    newData[currentItemIndex] = [];
    setData(newData);
    setCurrentItem(null);
    setCurrentItemIndex(null);
    setOpenDay(false);
  };
  const handleDeleteSub = (id) => {
    let newData = { ...data };
    newData[currentItemIndex].splice(id, 1);
    if (newData[currentItemIndex].length === 0) {
      setCurrentItem(null);
      setCurrentItemIndex(null);
    }
    setData(newData);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };

  const addNewSub = (sub) => {
    if (
      sub.name !== "" &&
      sub.price !== "" &&
      sub.startDate !== "" &&
      sub.icon !== ""
    ) {
      const newSub = {
        name: sub.name,
        icon: `https://cdn.brandfetch.io/${sub.name}.com/w/400/h/400?c=1id_jxkZ-0w6eMg_xfA`,
        price: sub.price,
        color: sub.color ? sub.color : "#323232",
        since: sub.startDate,
      };
      let newData = { ...data };
      newData[sub.day] = [...newData[sub.day], newSub];
      setData(newData);
      setOpenAdd(false);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      {/* mobile navigation */}
      <div className="flex justify-center items-center gap-2 sm:hidden">
        <button
          className="bg-[#323232] rounded-full p-2 w-10"
          onClick={() => handleIncrement(-1)}
        >
          <i className="fa-solid fa-chevron-left fa-xs"></i>
        </button>
        <h2 className="ml-2 sm:text-3xl tracking-wider text-lg flex items-center justify-start gap-1 font-bold text-zinc-300">
          {selectedMonth}
          <span className="opacity-50"> {selectedYear}</span>
        </h2>
        <button
          className="bg-[#323232] rounded-full p-2 w-10"
          onClick={() => handleIncrement(1)}
        >
          <i className="fa-solid fa-chevron-right fa-xs"></i>
        </button>
      </div>
      {/* mobile monthly spend */}
      <div className="flex flex-col items-center sm:hidden">
        <span className="text-sm sm:text-md opacity-50 text-nowrap">
          Monthly spend
        </span>
        <span className="text-lg sm:text-xl font-semibold">
          {generateMonthlySpend().toFixed(2)}€
        </span>
      </div>

      <div className="w-full flex items-center justify-between gap-4 hidden sm:flex">
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
        <div className="flex flex-col items-end ">
          <span className="text-sm sm:text-md opacity-50 text-nowrap">
            Monthly spend
          </span>
          <span className="text-lg sm:text-xl font-semibold">
            {generateMonthlySpend().toFixed(2)}€
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dayList.map((day, key) => (
          <div
            key={key}
            className="text-center uppercase text-xs bg-[#323232] py-1 px-0.5 rounded-xl"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 ">{generateCalendarDays()}</div>
      <button
        className="bg-white/10 border-2 border-[#5e5e5e]   rounded-lg font-semibold p-2   "
        onClick={() => setOpenAdd(true)}
      >
        Add Subscription +
      </button>
      <AddSubscriptionDialog
        addNewSub={addNewSub}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />
      <ViewDayDialog
        open={openDay}
        onClose={handleCloseDay}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        currentItem={currentItem}
        onDeleteSubscriptions={handleDeleteSubscriptions}
        handleDeleteSub={handleDeleteSub}
      />
    </div>
  );
};

// responsive
// refactor
