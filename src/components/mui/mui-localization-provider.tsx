"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function MuiLocalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
