export type CalendarCell = {
    date: Date,
    year: number,
    month: number,
    day: number,
    hasEvents: boolean,
}

export type CalendarEvent = {
    title: string,
    date: Date,
    year: number,
    month: number,
    day: number,
    time: string,
}

export type EventListType = {
    prevDayEvents: CalendarEvent[],
    currDayEvents: CalendarEvent[],
    nextDayEvents: CalendarEvent[]
}