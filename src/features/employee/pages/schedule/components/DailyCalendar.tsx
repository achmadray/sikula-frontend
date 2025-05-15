import { Divider, Indicator, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

export const DailyCalendar: React.FC = () => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth() + 1);
    setCurrentYear(date.getFullYear());
  };
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2">
      <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Kalender
          </Text>
        </div>
        <div className="my-auto text-right -mt-2 me-2">
          <IconCalendar />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="flex justify-center">
        <DatePicker
          value={dateValue}
          onChange={setDateValue}
          onNextMonth={handleMonthChange}
          onPreviousMonth={handleMonthChange}
          //   renderDay={(date) => {
          //     const day = date.getDate();
          //     const month = date.getMonth();
          //     const showIndicatorOff = datesArray.some(
          //       (d) => d.day === day && d.month === month
          //     );
          //     const showIndicatorAbsence = formattedAllDates.some(
          //       (d: any) => d.day === day && d.month === month + 1
          //     );
          //     const showIndicatorLeave = leaveDates.some(
          //       (d: any) => d.day === day && d.month === month + 1
          //     );
          //     const showIndicatorPaidLeave = paidLeaveDates.some(
          //       (d: any) => d.day === day && d.month === month + 1
          //     );

          //     return (
          //       <div>
          //         <div style={{ position: "relative" }}>
          //           {showIndicatorAbsence && (
          //             <Indicator
          //               size={6}
          //               color="teal"
          //               offset={-9}
          //               style={{
          //                 position: "absolute",
          //                 top: "50%",
          //                 left: "50%",
          //                 transform: "translate(-50%, -50%)",
          //               }}
          //             ></Indicator>
          //           )}
          //           <div>{day}</div>
          //           {showIndicatorOff && (
          //             <Indicator
          //               size={6}
          //               color="red"
          //               offset={-9}
          //               style={{
          //                 position: "absolute",
          //                 top: "50%",
          //                 left: "50%",
          //                 transform: "translate(-50%, -50%)",
          //               }}
          //             />
          //           )}
          //           {showIndicatorLeave && (
          //             <Indicator
          //               size={6}
          //               color="yellow"
          //               offset={-9}
          //               style={{
          //                 position: "absolute",
          //                 top: "50%",
          //                 left: "50%",
          //                 transform: "translate(-50%, -50%)",
          //               }}
          //             />
          //           )}
          //           {showIndicatorPaidLeave && (
          //             <Indicator
          //               size={6}
          //               color="grape"
          //               offset={-9}
          //               style={{
          //                 position: "absolute",
          //                 top: "50%",
          //                 left: "50%",
          //                 transform: "translate(-50%, -50%)",
          //               }}
          //             />
          //           )}
          //         </div>
          //       </div>
          //     );
          //   }}
        />
      </div>
      <div className="mt-2 mb-2 px-4">
        <div className="grid grid-cols-9">
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="red"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Sakit
            </Text>
          </div>
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="yellow"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Izin
            </Text>
          </div>
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="blue"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Cuti
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};
