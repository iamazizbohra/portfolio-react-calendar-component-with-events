import CalendarContextProvider from "@/context/calendar-context-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CalendarContextProvider>
      <div className="pt-5 pl-5 pr-5">
        <h1 className="text-3xl text-center mb-4">Calendar App</h1>

        {children}
      </div>
    </CalendarContextProvider>
  );
}
