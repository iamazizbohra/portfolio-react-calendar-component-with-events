"use client";

import { useRef } from "react";
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
import { CalendarEvent } from "@/context/calendar-context-provider";
import dayjs from "dayjs";

interface IFormInputs {
  title: string;
  date: any;
  time: string;
}

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

type propsType = {
  oldEvent: CalendarEvent | null;
  newEvent: CalendarEvent | null;
  handleImplicitClose: DialogProps["onClose"];
  handleExplicitClose: () => void;
  handleFormSubmit: (result: any) => void;
  handleDelete?: (result: any) => void;
};

export default function ManageEventDialog(props: propsType) {
  const { getTimeList } = useInit();
  const timeList = useRef(getTimeList());

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      title: props.oldEvent == null ? "" : props.oldEvent.title,
      date:
        props.oldEvent == null ? null : dayjs(new Date(props.oldEvent.date)),
      time: props.oldEvent == null ? "" : props.oldEvent.time,
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data: any) => {
    props.handleFormSubmit(data);
  };

  return (
    <BootstrapDialog
      onClose={props.handleImplicitClose}
      aria-labelledby="customized-dialog-title"
      disableEscapeKeyDown={true}
      open={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {props.oldEvent == null ? "Add Event" : "Edit Event"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={props.handleExplicitClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
            <TextField
              label="Title"
              variant="outlined"
              error={errors.title ? true : false}
              {...register("title", { required: true })}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  slotProps={{
                    textField: {
                      error: errors.date ? true : false,
                    },
                  }}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="select-time-label">Time</InputLabel>
            <Controller
              name="time"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select error={errors.time ? true : false} {...field}>
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
        {props.oldEvent == null ? null : (
          <Button
            variant="outlined"
            color="error"
            onClick={props.handleDelete?.bind(null, props.newEvent)}
          >
            Delete
          </Button>
        )}

        <Button type="submit" form="hook-form">
          {props.oldEvent == null ? "Save" : "Update"}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
