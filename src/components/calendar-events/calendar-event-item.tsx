import { useContext, useState } from "react";
import { CalendarEvent } from "../calendar/types";
import ManageEventDialog from "../dialogs/manage-event-dialog/manage-event-dialog";
import { DialogProps } from "@mui/material/Dialog";
import { CalendarContext } from "@/context/calendar-context-provider";

type propsType = {
  event: CalendarEvent;
};

export default function CalendarEventItem(props: propsType) {
  const { updateEvent, deleteEvent } = useContext(CalendarContext);
  const [open, setOpen] = useState(false);

  const handleImplicitClose: DialogProps["onClose"] = (event, reason) => {
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown")
      return;

    setOpen(false);
  };

  const handleExplicitClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (result: any) => {
    const date = new Date(result.date.toDate());
    const newEvent = {
      title: result.title,
      date: date,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      time: result.time,
    };

    updateEvent(props.event, newEvent);
    setOpen(false);
  };

  const handleDelete = (result: any) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(result);
      setOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="py-3 border-b border-[#ccc] last:border-b-0"
      >
        <p className="capitalize text-[16px]">{props.event.title}</p>
        <p className="mt-2 text-[14px] opacity-75">{props.event.time}</p>
      </div>

      {open && (
        <ManageEventDialog
          oldEvent={props.event}
          newEvent={props.event}
          handleImplicitClose={handleImplicitClose}
          handleExplicitClose={handleExplicitClose}
          handleFormSubmit={handleFormSubmit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
