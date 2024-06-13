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
  eventsMap: CalendarEventsMap;
  addEvent: (title: string, date: Date, time: string) => void;
  updateEvent: (oldEvent: CalendarEvent, newEvent: CalendarEvent) => void;
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
  eventsMap: {},
  addEvent: () => {},
  updateEvent: () => {},
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
  const [eventsMap, setEventsMap] = useState<CalendarEventsMap>({});

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

  const addEvent = (title: string, date: Date, time: string): void => {
    const map = { ...eventsMap };

    const bucketKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    // bucket doesn't exist, create bucket
    if (map[bucketKey] == undefined) {
      map[bucketKey] = [
        {
          title: title,
          date: date,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          time: time,
        },
      ];

      setEventsMap(map);
    } else {
      const eventList = map[bucketKey]; // get event list from bucket
      const events = eventList.filter(
        (event: CalendarEvent) =>
          event.year == date.getFullYear() &&
          event.month == date.getMonth() &&
          event.day == date.getDate() &&
          event.time == time
      );

      // prevent duplicate event
      if (events.length == 0) {
        eventList.push({
          title: title,
          date: date,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          time: time,
        });

        map[bucketKey] = eventList; // attach event list to bucket
        setEventsMap(map);
      }
    }
  };

  const updateEvent = (
    oldEvent: CalendarEvent,
    newEvent: CalendarEvent
  ): void => {
    const map = { ...eventsMap };

    const bucketKey = `${oldEvent.date.getFullYear()}-${oldEvent.date.getMonth()}-${oldEvent.date.getDate()}`;

    // bucket doesn't exist, create bucket
    if (map[bucketKey] == undefined) {
      addEvent(newEvent.title, newEvent.date, newEvent.time);
    } else {
      deleteEvent(oldEvent);

      setTimeout(() => {
        addEvent(newEvent.title, newEvent.date, newEvent.time);
      }, 1);
    }
  };

  const deleteEvent = (e: CalendarEvent): void => {
    const map = { ...eventsMap };

    const bucketKey = `${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDate()}`;

    // bucket doesn't exist
    if (map[bucketKey] == undefined) {
      // do nothing
    } else {
      const eventList = map[bucketKey]; // get event list from bucket
      const events = eventList.filter(
        (event: CalendarEvent) =>
          event.year == e.year &&
          event.month == e.month &&
          event.day == e.day &&
          event.time == e.time
      );

      if (events.length > 0) {
        const index = eventList.indexOf(events[0]);
        eventList.splice(index, 1);

        if (eventList.length == 0) {
          delete map[bucketKey];
        } else {
          map[bucketKey] = eventList;
        }

        setEventsMap(map);
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
        eventsMap,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
