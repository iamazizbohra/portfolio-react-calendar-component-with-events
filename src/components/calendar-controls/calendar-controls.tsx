"use client";

import styles from "./calendar-controls.module.scss";
import useIntit from "@/hooks/useInit";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CalendarContext } from "@/context/calendar-context-provider";
import ManageEventDialog from "../dialogs/manage-event-dialog/manage-event-dialog";
import { DialogProps } from "@mui/material/Dialog";
import Button from "@mui/material/Button";

export default function CalendarControls() {
  const [open, setOpen] = useState(false);
  const {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    setMonthToPrevMonth,
    setMonthToNextMonth,
    addEvent,
  } = useContext(CalendarContext);
  const { getYearList, getMonthList } = useIntit();
  const yearList = useRef(getYearList(4, 11));
  const monthList = useRef(getMonthList());

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(+event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(+event.target.value);
  };

  const handlePrevMonthClick = () => {
    setMonthToPrevMonth();
  };

  const handleNextMonthClick = () => {
    setMonthToNextMonth();
  };

  const handleImplicitClose: DialogProps["onClose"] = (event, reason) => {
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown")
      return;

    setOpen(false);
  };

  const handleExplicitClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (result: any) => {
    if (addEvent(result.title, new Date(result.date.toDate()), result.time)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.left}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="select-year-label">Select Year</InputLabel>
            <Select
              labelId="select-year-label"
              id="select-year"
              value={String(selectedYear)}
              label="Select Year"
              onChange={handleYearChange}
            >
              {yearList.current.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={styles.spacer}></div>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="select-month-label">Select Month</InputLabel>
            <Select
              labelId="select-month-label"
              id="select-month"
              value={String(selectedMonth)}
              label="Select Month"
              onChange={handleMonthChange}
            >
              {monthList.current.map((month, index) => (
                <MenuItem key={index} value={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={styles.spacer}></div>

          <Button variant="contained" onClick={() => setOpen(true)}>Add Event</Button>

          {open && (
            <ManageEventDialog
              oldEvent={null}
              newEvent={null}
              handleImplicitClose={handleImplicitClose}
              handleExplicitClose={handleExplicitClose}
              handleFormSubmit={handleFormSubmit}
            />
          )}
        </div>

        <div className={styles.right}>
          <IconButton
            aria-label="prev-month"
            onClick={handlePrevMonthClick}
            sx={{
              color: "#333",
              height: "44px",
              width: "44px",
              fontSize: "44px",
              cursor: "pointer",
              "&:hover": {
                borderRadius: "34px",
                backgroundColor: "#ccc",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <div className={styles.spacer}></div>

          <IconButton
            aria-label="next-month"
            onClick={handleNextMonthClick}
            sx={{
              color: "#333",
              height: "44px",
              width: "44px",
              fontSize: "44px",
              cursor: "pointer",
              "&:hover": {
                borderRadius: "34px",
                backgroundColor: "#ccc",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
