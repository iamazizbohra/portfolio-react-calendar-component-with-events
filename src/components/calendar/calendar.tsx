"use client";

import CalendarContextProvider from "@/context/calendar-context-provider";
import CalendarCells from "../calendar-cells/calendar-cells";
import CalendarControls from "../calendar-controls/calendar-controls";
import styles from "./calendar.module.scss";
import CalendarEvents from "../calendar-events/calendar-events";
export default function Calendar() {
  return (
    <CalendarContextProvider>
      <div className={styles.container}>
        <div className={styles.calendar}>
          <CalendarControls></CalendarControls>

          <CalendarCells></CalendarCells>
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.events}>
          <CalendarEvents></CalendarEvents>
        </div>
      </div>
    </CalendarContextProvider>
  );
}
