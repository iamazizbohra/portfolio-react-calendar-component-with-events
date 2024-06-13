"use client";

import { CalendarCell } from "@/components/calendar/types";
import clsx from "clsx";
import { useContext } from "react";
import styles from "./cell-button.module.scss";
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
          [styles.button],
          [
            value.year === currentDate.getFullYear() &&
              value.month === currentDate.getMonth() &&
              value.day === currentDate.getDate() &&
              styles.btnCurrentDay,
          ],
          [value.month === selectedMonth && styles.btnCurrentMonth],
          [
            selectedDate &&
              value.year === selectedDate.getFullYear() &&
              value.month === selectedDate.getMonth() &&
              value.day === selectedDate.getDate() &&
              styles.btnSelected,
          ]
        )}
      >
        {value.day}
      </button>
    </>
  );
}
