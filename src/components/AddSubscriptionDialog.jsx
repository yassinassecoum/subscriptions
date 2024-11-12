import Dialog from "@mui/material/Dialog";
import { useState } from "react";
export function AddSubscriptionDialog({ open, onClose, addNewSub }) {
  const [name, setName] = useState("");
  const [day, setDay] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col mx-auto max-w-lg min-w-[350px] min-h-[550px] my-auto gap-3 bg-[#1e1e1e] px-4 pt-4 pb-4 rounded-xl border-2 border-[#323232] shadow-md overflow-x-h">
        <button
          onClick={onClose}
          className="absolute top-3 bg-white/10 justify-center right-3 size-8 rounded-full flex items-center p-1.5 text-white text-lg cursor-pointer"
        >
          x
        </button>
        <h2 className="text-white text-2xl font-semibold text-center">
          Add Subscription
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Name of subscription</label>
              <input
                type="text"
                className="bg-[#323232] text-white rounded-lg p-2 border border-[#5e5e5e] focus:outline-none focus:border-white"
                placeholder="Netflix, Spotify, etc..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Day of subscription</label>
              <select
                className="bg-[#323232] text-white rounded-lg p-2 border border-[#5e5e5e] focus:outline-none focus:border-white"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Start date</label>
              <input
                type="date"
                className="bg-[#323232] text-white rounded-lg p-2 border border-[#5e5e5e] focus:outline-none focus:border-white"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                  €
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="bg-[#323232] text-white rounded-lg p-2 pl-8 border border-[#5e5e5e] focus:outline-none focus:border-white w-full"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Color (optional)</label>
              <input
                type="color"
                className="bg-[#323232] h-10 rounded-lg p-1 border border-[#5e5e5e] focus:outline-none focus:border-white"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <button
              onClick={() => addNewSub({ name, day, startDate, price, color })}
              className="bg-white/10 border-2 border-[#5e5e5e] rounded-lg font-semibold p-2 text-white mt-4 hover:bg-white/20"
            >
              Add Subscription
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
