"use client";

import { CalendarCell } from "@/components/calendar/types";
import clsx from "clsx";
import { useContext } from "react";
import { CalendarContext } from "@/context/calendar-context-provider";

export default function CellButton({
  value,
  handleDateSelect,
}: {
  value: CalendarCell;
  handleDateSelect: (cell: CalendarCell) => void;
}) {
  const { selectedDate, selectedMonth, currentDate } =
    useContext(CalendarContext);

  return (
    <>
      <button
        onClick={() => handleDateSelect(value)}
        className={clsx(
          [
            "relative text-[#aaaaaa] text-xl w-12 h-12 rounded-[3rem] m-2 cursor-default",
          ], // default style
          [
            value.year === currentDate.getFullYear() &&
              value.month === currentDate.getMonth() &&
              value.day === currentDate.getDate() &&
              "border border-[#0000006b]",
          ], // current date style
          [
            value.month === selectedMonth &&
              "!text-[#000] !cursor-pointer hover:bg-[#ccc]",
          ], // current month style
          [
            selectedDate &&
              value.year === selectedDate.getFullYear() &&
              value.month === selectedDate.getMonth() &&
              value.day === selectedDate.getDate() &&
              "!text-[#fff] bg-[#333]",
          ] // selected date style
        )}
      >
        {value.day}

        {value.hasEvents && <span className="absolute -bottom-[.75rem] left-1/2 -translate-x-2/4 w-1.5 h-1.5 rounded-full bg-[#1976d2]"></span>}
      </button>
    </>
  );
}
