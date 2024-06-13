"use client";

import CalendarContextProvider from "@/context/calendar-context-provider";
import CalendarCells from "../calendar-cells/calendar-cells";
import CalendarControls from "../calendar-controls/calendar-controls";
import CalendarEvents from "../calendar-events/calendar-events";
export default function Calendar() {
  return (
    <CalendarContextProvider>
      <div className="flex">
        <div className="w-1/2 bg-[#fbfbfb] border border-[#ccc] p-3 rounded-[12px]">
          <CalendarControls></CalendarControls>

          <CalendarCells></CalendarCells>
        </div>

        <div className="mx-2"></div>

        <div className="w-1/2">
          <CalendarEvents></CalendarEvents>
        </div>
      </div>
    </CalendarContextProvider>
  );
}
