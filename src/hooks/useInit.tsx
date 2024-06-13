import { CalendarContext } from "@/context/calendar-context-provider";
import { CalendarCell } from "@/components/calendar/types";
import { useContext } from "react";

const useInit = (): {
  getYearList: (start: number, count: number) => number[];
  getMonthList: () => string[];
  getWeekList: () => string[];
  getTimeList: () => string[];
  getCellList: () => CalendarCell[][];
} => {
  const { selectedYear, selectedMonth, eventsMap } =
    useContext(CalendarContext);

  const getYearList = (start: number, count: number): number[] => {
    const now = new Date();
    const year = now.getFullYear();
    const yearList: number[] = [];

    let startYear = year - start;
    for (let i = 0; i < count; i++) {
      yearList.push(startYear);

      startYear++;
    }

    return yearList;
  };

  const getMonthList = (): string[] => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  };

  const getWeekList = (): string[] => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  };

  const getTimeList = (): string[] => {
    return [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
  };

  const getCellList = (): CalendarCell[][] => {
    const dayList: CalendarCell[][] = [];

    const year = selectedYear;
    const month = selectedMonth;
    const firstDayOfMonth = new Date(year, month, 1);
    const weedDayOfFirstDay = firstDayOfMonth.getDay();

    for (let row = 0; row < 6; row++) {
      dayList.push([]);

      for (let day = 7 * row; day <= 7 * row + 6; day++) {
        if (day === 0 && weedDayOfFirstDay === 0) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
          firstDayOfMonth.setDate(
            firstDayOfMonth.getDate() + (day - weedDayOfFirstDay)
          );
        } else {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        const bucketKey = `${firstDayOfMonth.getFullYear()}-${firstDayOfMonth.getMonth()}-${firstDayOfMonth.getDate()}`;

        dayList[row].push({
          date: new Date(firstDayOfMonth),
          year: firstDayOfMonth.getFullYear(),
          month: firstDayOfMonth.getMonth(),
          day: firstDayOfMonth.getDate(),
          hasEvents: eventsMap[bucketKey] != undefined && eventsMap[bucketKey].length > 0,
        });
      }
    }

    return dayList;
  };

  return {
    getYearList,
    getMonthList,
    getWeekList,
    getTimeList,
    getCellList,
  };
};

export default useInit;
