import { createContext, useState } from "react";

export type CalendarEvent = {
  title: string;
  date: Date;
  year: number;
  month: number;
  day: number;
  time: string;
};

type CalendarEventsMap = {
  [key: string]: CalendarEvent[];
};

type contextType = {
  currentDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (year: number) => void;
  setMonthToPrevMonth: () => void;
  setMonthToNextMonth: () => void;
  calendarEvents: CalendarEventsMap;
  addEvent: (title: string, date: Date, time: string) => boolean;
  updateEvent: (oldEvent: CalendarEvent, newEvent: CalendarEvent) => boolean;
  deleteEvent: (e: CalendarEvent) => void;
};

const contextValue: contextType = {
  currentDate: new Date(),
  selectedDate: new Date(),
  setSelectedDate: () => {},
  selectedYear: new Date().getFullYear(),
  setSelectedYear: () => {},
  selectedMonth: new Date().getMonth(),
  setSelectedMonth: () => {},
  setMonthToPrevMonth: () => {},
  setMonthToNextMonth: () => {},
  calendarEvents: {},
  addEvent: () => false,
  updateEvent: () => false,
  deleteEvent: () => {},
};

export const CalendarContext = createContext<contextType>(contextValue);

export default function CalendarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventsMap>({});

  const setMonthToPrevMonth = (): void => {
    if (selectedMonth == 0) {
      setSelectedMonth(11);
      setSelectedYear((prevSelectedYear: number) => prevSelectedYear - 1);
    } else {
      setSelectedMonth((prevSelectedMonth: number) => prevSelectedMonth - 1);
    }
  };

  const setMonthToNextMonth = (): void => {
    if (selectedMonth == 11) {
      setSelectedMonth(0);
      setSelectedYear((prevSelectedYear: number) => prevSelectedYear + 1);
    } else {
      setSelectedMonth((prevSelectedMonth: number) => prevSelectedMonth + 1);
    }
  };

  const addEvent = (title: string, date: Date, time: string): boolean => {
    const events = { ...calendarEvents };

    const bucketKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    // bucket doesn't exist, create bucket
    if (events[bucketKey] == undefined) {
      events[bucketKey] = [
        {
          title: title,
          date: date,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          time: time,
        },
      ];

      setCalendarEvents(events);

      return true;
    } else {
      const eventList = events[bucketKey]; // get event list from bucket
      const event = eventList.filter(
        (event: CalendarEvent) =>
          event.year == date.getFullYear() &&
          event.month == date.getMonth() &&
          event.day == date.getDate() &&
          event.time == time
      );

      if (event.length == 0) {
        // event doesn't exist
        eventList.push({
          title: title,
          date: date,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          time: time,
        });

        events[bucketKey] = eventList; // attach event list to bucket
        setCalendarEvents(events);

        return true;
      }
    }

    return false;
  };

  const updateEvent = (
    oldEvent: CalendarEvent,
    newEvent: CalendarEvent
  ): boolean => {
    const events = { ...calendarEvents };

    const bucketKey = `${oldEvent.date.getFullYear()}-${oldEvent.date.getMonth()}-${oldEvent.date.getDate()}`;

    // bucket doesn't exist, create bucket
    if (events[bucketKey] == undefined) {
      return addEvent(newEvent.title, newEvent.date, newEvent.time);
    } else {
      const eventList = events[bucketKey]; // get event list from bucket
      const event = eventList.filter(
        (event: CalendarEvent) =>
          event.year == oldEvent.year &&
          event.month == oldEvent.month &&
          event.day == oldEvent.day &&
          event.time == oldEvent.time
      );

      if (event.length > 0) {
        const index = eventList.indexOf(event[0]);
        eventList.splice(index, 1);

        events[bucketKey] = eventList;
        setCalendarEvents(events);

        return addEvent(newEvent.title, newEvent.date, newEvent.time);
      }
    }

    return false;
  };

  const deleteEvent = (e: CalendarEvent): void => {
    const events = { ...calendarEvents };

    const bucketKey = `${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDate()}`;

    // bucket doesn't exist
    if (events[bucketKey] == undefined) {
      // do nothing
    } else {
      const eventList = events[bucketKey]; // get event list from bucket
      const event = eventList.filter(
        (event: CalendarEvent) =>
          event.year == e.year &&
          event.month == e.month &&
          event.day == e.day &&
          event.time == e.time
      );

      if (event.length > 0) {
        const index = eventList.indexOf(event[0]);
        eventList.splice(index, 1);

        events[bucketKey] = eventList;
        setCalendarEvents(events);
      }
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDate,
        setSelectedDate,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        setMonthToPrevMonth,
        setMonthToNextMonth,
        calendarEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
