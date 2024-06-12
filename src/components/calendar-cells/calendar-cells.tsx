"use client";

import useIntit from "@/hooks/calendar/useInit";
import styles from "./calendar-cells.module.scss";
import { useContext, useEffect, useRef } from "react";
import { CalendarCell } from "../calendar/types";
import CellButton from "./cell-button/cell-button";
import { CalendarContext } from "@/app/context/calendar-context-provider";

export default function CalendarCells() {
  const { selectedMonth, setSelectedDate } = useContext(CalendarContext);
  const { getWeekList, getCellList } = useIntit();

  const weekList = useRef(getWeekList());
  const cellList = getCellList();

  const handleDateSelect = (e: CalendarCell) => {
    if (e.month == selectedMonth) {
      setSelectedDate(new Date(e.year, e.month, e.day));
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {weekList.current.map((week, index) => (
              <th key={index}>{week}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr key={100}>
            <td colSpan={7}>
              <br></br>
            </td>
          </tr>

          {cellList.map((rows, index) => (
            <tr key={index}>
              {rows.map((cell, index) => (
                <td key={index}>
                  <CellButton
                    value={cell}
                    handleDateSelect={handleDateSelect}
                  ></CellButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}