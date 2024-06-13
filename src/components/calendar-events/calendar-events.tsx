import { CalendarContext } from "@/context/calendar-context-provider";
import { useContext } from "react";
import CalendarEventItem from "./calendar-event-item";

export default function CalendarEvents() {
  const { selectedDate, eventsMap } = useContext(CalendarContext);

  const bucketKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
  const events = eventsMap[bucketKey];

  if (events == undefined || events.length == 0) {
    return (
      <div className="bg-[#fbfbfb] border border-[#ccc] p-3 rounded-[12px]">
        <p className="text-center opacity-75">No events found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfbfb] border border-[#ccc] px-3 rounded-[12px]">
      {events.map((event, index) => (
        <CalendarEventItem key={index} event={event} />
      ))}
    </div>
  );
}
