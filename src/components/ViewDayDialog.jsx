import Dialog from "@mui/material/Dialog";

export function ViewDayDialog({
  open,
  onClose,
  selectedDay,
  selectedMonth,
  selectedYear,
  currentItem,
  onDeleteSub,
}) {
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
          {selectedDay + " " + selectedMonth + " " + selectedYear}
        </h2>
        <div className="flex gap-4 justify-center">
          {currentItem &&
            currentItem.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.color ? item.color : "#323232",
                }}
                className="size-14 rounded-lg flex items-center justify-center"
              >
                <img src={item.icon} alt={item.name} className="size-9" />
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
                <span className="text-sm text-white">
                  Every {selectedDay}th
                </span>
                <span className="text-sm text-white opacity-60">
                  Next payment
                </span>
              </div>
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className="text-sm text-white">
                  Total since 2022-01-08
                </span>
                <span className="text-md font-semibold text-white">€63.23</span>
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
              onClick={onDeleteSub}
              className="bg-red-500/10 border-2 border-red-500 text-red-500 rounded-lg font-semibold w-full p-2"
            >
              Cancel Subscription
            </button>
            <button className="border-2 border-[#5e5e5e] text-[#5e5e5e] rounded-lg font-semibold p-2">
              Pause
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
