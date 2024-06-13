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
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-5/6 flex justify-between">
          <div className="w-1/2 pr-8 border-r border-[#ccc]">
            <div className="list">
              <h3 className="mb-2 font-medium">Features:</h3>

              <ul>
                <li className="text-sm">React Calendar component ✅</li>
                <li className="text-sm">Form to add an event ✅</li>
                <li className="text-sm">Form to edit an event ✅</li>
                <li className="text-sm">Ability to delete an event ✅</li>
                <li className="text-sm">Ability to view all the events ✅</li>
                <li className="text-sm">
                  Show dot if events exists on date ✅
                </li>
              </ul>

              <br></br>
              <h3 className="mb-2 font-medium">Others:</h3>

              <ul>
                <li className="text-sm">Used custom hook ✅</li>
                <li className="text-sm">Used ESLint for linting ✅</li>
                <li className="text-sm">Used client component ✅</li>
                <li className="text-sm">Used router for navigation ✅</li>
                <li className="text-sm">Used tailwind css for styling ✅</li>
                <li className="text-sm">Used react MUI for component ✅</li>
                <li className="text-sm">
                  Used react-hook-form with validation ✅
                </li>
                <li className="text-sm">
                  Used clsx package for dynamic classes ✅
                </li>
                <li className="text-sm">
                  Used react context api to maintain state ✅
                </li>
                <li className="text-sm">
                  Used Date() class to work with time/date ✅
                </li>
                <li className="text-sm">
                  Used modular architecture for components ✅
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleClick}
            >
              Visit Calendar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
