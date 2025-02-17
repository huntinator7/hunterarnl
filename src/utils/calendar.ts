export interface CalData<S> {
  date: Date;
  value: S;
}

interface DayData<S> {
  data: CalData<S>[];
  value: S;
  label: string;
  bgColor: string;
}

export interface CalendarFunctions<S> {
  combineValues: (...ds: CalData<S>[]) => S;
  getLabel: (d: CalData<S>) => string;
  getColor: (d: CalData<S>) => string;
}

export type MonthData<S> = Record<number, DayData<S>>;

export function generateMonthData<S>(
  year: number,
  month: number,
  days: number,
  data: CalData<S>[],
  functions: CalendarFunctions<S>
): MonthData<S> {
  function isInMonth(d: CalData<S>): boolean {
    return (
      new Date(d.date).getFullYear() === year &&
      new Date(d.date).getMonth() === month
    );
  }
  const populatedData = data.filter(isInMonth).reduce((a, c) => {
    const day = c.date.getDate();
    const value =
      day in a ? functions.combineValues(...a[day].data, c) : c.value;
    const data = day in a ? [...a[day].data, c] : [c];
    const label = functions.getLabel({ date: c.date, value });
    const bgColor = functions.getColor({ date: c.date, value });
    return {
      ...a,
      [day]: {
        data,
        value,
        label,
        bgColor,
      },
    };
  }, {} as MonthData<S>);

  const emptyDays: MonthData<S> = Object.fromEntries(
    Array.from({ length: days }, (_v, i) => [
      i,
      {
        data: [] as CalData<S>[],
        value: 0 as S,
        label: functions.getLabel({
          date: new Date(year, month, i),
          value: 0 as S,
        }),
        bgColor: functions.getColor({
          date: new Date(year, month, i),
          value: 0 as S,
        }),
      },
    ])
  );

  return { ...emptyDays, ...populatedData };
}
