import { Fragment, useEffect } from "react";
import {
  CalData,
  CalendarFunctions,
  generateMonthData,
  MonthData,
} from "../utils/calendar";
import { isMobile } from "react-device-detect";

interface MonthPopulated<S> {
  name: string;
  days: number;
  startDay: number;
  data: MonthData<S>;
}

interface Props<S> {
  data: CalData<S>[];
  functions: CalendarFunctions<S>;
  startDate?: string;
  endDate?: string;
}

export const Calendar = <S, _T>({
  data,
  functions,
  startDate = "01-01-2025",
  endDate = "12-31-2025",
}: Props<S>) => {
  useEffect(() => {
    console.log("Calendar", data, startDate, endDate);
  }, [data, startDate, endDate]);
  return <YearCalendar year={2025} data={data} functions={functions} />;
};

interface YearProps<S> {
  year: number;
  data: CalData<S>[];
  functions: CalendarFunctions<S>;
}

const YearCalendar = <S, _T>({ year, data, functions }: YearProps<S>) => {
  const isLeapYear =
    year % 400 === 0 ? true : year % 100 ? false : year % 4 ? true : false;

  const startOfYear = 3;

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: isLeapYear ? 29 : 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const monthsPopulated = months.reduce<{
    next: number;
    months: MonthPopulated<S>[];
  }>(
    (a, c, i) => ({
      next: (a.next + c.days) % 7,
      months: [
        ...a.months,
        {
          ...c,
          startDay: a.next,
          data: generateMonthData(year, i, c.days, data, functions),
        },
      ],
    }),
    { next: startOfYear, months: [] }
  ).months;

  return (
    <div>
      <h2>{year}</h2>
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-4"} gap-4`}>
        {monthsPopulated.map((month, i) => (
          <MonthDisplay year={year} month={month} mIndex={i} key={i} />
        ))}
      </div>
    </div>
  );
};

const MonthDisplay = <S, _T>({
  year,
  month,
  mIndex,
}: {
  year: number;
  month: {
    name: string;
    days: number;
    startDay: number;
    data: MonthData<S>;
  };
  mIndex: number;
}) => {
  return (
    <div className="flex flex-col p-4 border border-solid border-netural-200">
      <span className="text-xl font-bold pb-2">{month.name}</span>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: month.startDay }, (_v, i) => (
          <div className="w-sm" key={i} />
        ))}
        {Array.from({ length: month.days }, (_v, i) => {
          const bgColor = month.data[i]?.bgColor ?? "bg-transparent";
          return (
            <Fragment key={i}>
              <button
                className={`flex justify-center items-center w-sm border border-solid border-neutral-500 ${bgColor}`}
                id={`anchor-${mIndex}-${i}`}
                popoverTarget={`mypopover-${mIndex}-${i}`}
              >
                {i + 1}
              </button>
              <div
                id={`mypopover-${mIndex}-${i}`}
                popover="auto"
                onBeforeToggle={(e) => {
                  if (e.newState === "open")
                    console.log(`mypopover-${mIndex}-${i}`, e);
                }}
                className={`p-8 ${bgColor} text-xl`}
              >
                <div>
                  Day: {new Date(year, mIndex, i + 1).toLocaleDateString()}
                </div>
                <div>{month.data[i]?.label}</div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
