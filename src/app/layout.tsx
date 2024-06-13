import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

// font for Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MuiLocalizationProvider from "@/components/mui/mui-localization-provider";
import CalendarContextProvider from "@/context/calendar-context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReactJs Calendar App",
  description: "ReactJs Calendar Component",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <MuiLocalizationProvider>
            <ThemeProvider theme={theme}>
              <CalendarContextProvider>{children}</CalendarContextProvider>
            </ThemeProvider>
          </MuiLocalizationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
