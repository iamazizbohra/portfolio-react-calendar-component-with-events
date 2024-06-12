"use client";

import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/showcase");
  };

  return (
    <>
      <Button
        sx={{ textTransform: "capitalize" }}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleClick}
      >
        Visit Calendar
      </Button>
    </>
  );
}
