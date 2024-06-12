import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
