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
import Dialog from "@mui/material/Dialog";

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
    1: [{ name: "Netflix", icon: netflix, price: "€10", color: "#ff5a5f20" }],
    2: [],
    3: [],
    4: [],
    5: [
      { name: "Basic Fit", icon: basicfit, price: "€10", color: "#ff885a20" },
    ],
    6: [],
    7: [],
    8: [],
    9: [
      { name: "Dropbox", icon: dropbox, price: "€10", color: "#0077b520" },
      { name: "ICloud+", icon: icloud, price: "€10" },
      { name: "Microsoft", icon: microsoft, price: "€10", color: "#0077b520" },
    ],
    10: [],
    11: [
      { name: "Xbox+", icon: xbox, price: "€10", color: "#3ecf8e20" },
      { name: "PlayStation+", icon: playstation, price: "€10" },
    ],
    12: [],
    13: [],
    14: [],
    15: [
      {
        name: "Crunchyroll",
        icon: crunchyroll,
        price: "€10",
        color: "#ff885a20",
      },
    ],
    16: [],
    17: [],
    18: [],
    19: [
      { name: "Linkedin", icon: linkedin, price: "€10", color: "#0077b520" },
    ],
    20: [],
    21: [],
    22: [{ name: "Discord", icon: discord, price: "€10", color: "#7289da20" }],
    23: [],
    24: [],
    25: [{ name: "Amazon", icon: amazon, price: "€10" }],
    26: [],
    27: [],
    28: [
      {
        name: "Spotify",
        icon: spotify,
        price: "€10",
        color: "rgba(62, 207, 142, 0.125)",
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
              key={dayCount}
              className="w-full aspect-square flex flex-col items-center justify-end py-1 pt-2  h-full bg-[#1e1e1e] rounded-[16px]"
            >
              {data[dayCount] && data[dayCount].length > 0 && (
                <div
                  onClick={handleClick}
                  value={dayCount}
                  className="w-full flex justify-center hover:cursor-pointer "
                >
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
                        className="size-4 sm:size-6 rounded mb-2 "
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

  const handleClick = (e) => {
    let value = e.target.getAttribute("value");
    console.log(value);
    console.log(data[value]);
    setCurrentItem(data[value]);
    setSelectedDay(value);
    setCurrentItemIndex(value);
    setOpen(true);
  };
  const handleDeleteSub = () => {
    console.log(currentItemIndex);
    let newData = { ...data };
    newData[currentItemIndex] = [];
    setData(newData);
    setCurrentItem(null);
    setCurrentItemIndex(null);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  const [data, setData] = useState(dataDefault);

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
          <span className="text-sm sm:text-md opacity-50 text-nowrap">
            Monthly spend
          </span>
          <span className="text-lg sm:text-xl font-semibold">€63.23</span>
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
      <Dialog open={open} onClose={handleClose}>
        <div className="flex flex-col mx-auto max-w-lg min-w-[350px] min-h-[550px]  my-auto gap-3 bg-[#1e1e1e] px-4 py-4 rounded-xl border-2 border-[#323232] shadow-md h-[550px] overflow-x-h">
          <button
            onClick={handleClose}
            className="absolute top-3 bg-white/10 justify-center right-3 size-8 rounded-full flex items-center p-1.5 text-white text-lg cursor-pointer"
          >
            x
          </button>
          <h2 className="text-white text-xl font-semibold text-center italic">
            {selectedDay + " " + selectedMonth + " " + selectedYear}
          </h2>

          <div className="flex gap-4 justify-center ">
            {currentItem &&
              currentItem.map((item, index) => (
                <div
                  style={{
                    backgroundColor: item.color ? item.color : "#323232",
                  }}
                  className={`size-14 rounded-lg flex items-center justify-center`}
                >
                  <img
                    src={item.icon}
                    key={index}
                    alt={item.name}
                    className={`size-9`}
                  />
                </div>
              ))}
          </div>
          {currentItem &&
            currentItem.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border-t border-dashed border-[#323232] pt-4"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2 mr-12">
                    <img src={item.icon} alt={item.name} className="size-8" />
                    <h2 className="text-2xl font-semibold text-white">
                      {item.name}
                    </h2>
                  </span>

                  <span className="text-2xl font-semibold text-white">
                    {item.price}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm text-white">Every xth</span>
                  <span className="text-sm text-white opacity-60">
                    Next payment
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2 mb-2">
                  <span className="text-sm text-white">
                    Total since 2022-01-08
                  </span>
                  <span className="text-md font-semibold text-white ">
                    €63.23
                  </span>
                </div>
              </div>
            ))}
          <div className="flex flex-col gap-4 w-full mt-auto border-t border-dashed border-[#323232] pt-4">
            <div className="flex justify-between">
              <span className="text-white/30 text-lg">Total Spend</span>
              <span className="text-white text-2xl font-semibold">€63.23</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteSub}
                className="bg-red-500/10 border-2 border-red-500 text-red-500 rounded-lg font-semibold w-full p-2   "
              >
                Cancel Subscription
              </button>
              <button
                onClick={() => {}}
                className="border-2 border-[#5e5e5e] text-[#5e5e5e]  rounded-lg font-semibold p-2   "
              >
                Pause
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

// monthly spend
// add a button to add a new subscription
//rework icons
// responsive
