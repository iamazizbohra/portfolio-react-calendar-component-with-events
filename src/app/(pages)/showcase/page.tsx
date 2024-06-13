'use client';

import Calendar from "@/components/calendar/calendar";
import { CalendarContext } from "@/context/calendar-context-provider";
import dayjs from "dayjs";
import { useContext } from "react";

export default function Page() {
  const { selectedDate } = useContext(CalendarContext);

  return (
    <div>
      <h3 className="text-xl text-center mb-4">{dayjs(selectedDate).format("dddd, MMMM DD, YYYY")}</h3>

      <Calendar></Calendar>
    </div>
  );
}
