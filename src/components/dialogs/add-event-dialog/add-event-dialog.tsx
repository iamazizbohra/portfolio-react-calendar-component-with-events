"use client";

import { useContext, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { DialogProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useInit from "@/hooks/useInit";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarContext } from "@/app/context/calendar-context-provider";

const AddEventFormSchema = yup
  .object({
    title: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
  })
  .required();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "300px",
  },
}));

export default function AddEventDialog() {
  const { addEvent } = useContext(CalendarContext);
  const [open, setOpen] = useState(false);
  const { getTimeList } = useInit();

  const { control, register, handleSubmit, reset } = useForm({
    resolver: yupResolver(AddEventFormSchema),
    defaultValues: {
      time: "",
    },
  });
  const onSubmit = (data: any) => {
    addEvent(data.title, new Date(data.date), data.time);
    reset();
    setOpen(false);
  };

  const timeList = useRef(getTimeList());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleImplicitClose: DialogProps["onClose"] = (event, reason) => {
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown")
      return;

    setOpen(false);
  };

  const handleExplicitClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Event
      </Button>

      <BootstrapDialog
        onClose={handleImplicitClose}
        aria-labelledby="customized-dialog-title"
        disableEscapeKeyDown={true}
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Event
        </DialogTitle>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleExplicitClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
              <TextField
                label="Title"
                variant="outlined"
                {...register("title")}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => <DatePicker {...field} />}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="select-time-label">Time</InputLabel>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    {timeList.current.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions>
          <Button type="submit" form="hook-form">
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
