import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Title } from "../components/Title";
import supabase from "../utils/supabase";
import { useSupabase } from "../utils/useSupabase";
import { Tables } from "../types/database.types";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Hard100 = () => {
  const [activities] = useSupabase(
    () =>
      supabase
        .from("hard100_activity")
        .select()
        .order("order", { ascending: true }) as unknown as Promise<
        PostgrestSingleResponse<Tables<"hard100_activity">[]>
      >,
    []
  );

  const [results, refreshResults] = useSupabase(
    () =>
      supabase.from("hard100").select() as unknown as Promise<
        PostgrestSingleResponse<Tables<"hard100">[]>
      >,
    []
  );
  const highestDay = useMemo(
    () => results.reduce((a, c) => (c.day > a ? c.day : a), 0),
    [results]
  );

  const tableData: Tables<"hard100">[][] = useMemo(
    () =>
      activities.map((a) =>
        Array.from({ length: highestDay }, (_v, i) => {
          const d = highestDay - i;
          return (
            results.find((r) => r.activity === a.id && r.day === d) ?? {
              activity: a.id,
              complete: false,
              day: d,
              explanation: null,
              id: -1,
            }
          );
        })
      ),
    [activities, highestDay, results]
  );

  const statuses = {
    incomplete: {
      color: "bg-red-500",
    },
    complete: {
      color: "bg-green-500",
    },
    partial: {
      color: "bg-amber-500",
    },
  };

  const daysData: { dayNumber: number; status: keyof typeof statuses }[] =
    useMemo(
      () =>
        Array.from({ length: highestDay }, (_v, i) => {
          const d = highestDay - i;
          const dayResults = results.filter((r) => r.day === d);
          return {
            dayNumber: d,
            status: dayResults.every((r) => r.complete)
              ? "complete"
              : dayResults.every((r) => !r.complete)
              ? "incomplete"
              : "partial",
          };
        }),
      [results, highestDay]
    );

  async function toggleEntry(entry: Tables<"hard100">) {
    await supabase.from("hard100").upsert({
      ...entry,
      id: entry.id === -1 ? undefined : entry.id,
      complete: !entry.complete,
    });
    refreshResults();
  }

  async function addNewDay() {
    await supabase.from("hard100").insert(
      activities.map((a) => ({
        activity: a.id,
        day: highestDay + 1,
        complete: false,
      }))
    );
    refreshResults();
  }

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [longHover, setLongHover] = useState<boolean>(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  function doHeaderHoverIn(i: number) {
    setHoverIndex(i);
    const x = setTimeout(() => {
      setLongHover(true);
    }, 1000);
    setHoverTimeout(x);
  }
  function doHeaderHoverOut() {
    setHoverIndex(null);
    setLongHover(false);
    if (hoverTimeout) clearTimeout(hoverTimeout);
  }

  return (
    <div className="flex flex-col w-screen overflow-x-hidden">
      <Title text="Hard 100" />
      <div className="flex w-screen overflow-x-auto">
        <table className="border border-solid border-sky-500">
          <thead>
            <tr>
              <th scope="col" className="bg-sky-500">
                ACTIVITY
              </th>
              {daysData.map((d) => (
                <th key={d.dayNumber} className={`${statuses[d.status].color}`}>
                  {d.dayNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((trow, i) => {
              const activity = activities.find(
                (a) => a.id === trow[0]?.activity
              ) ?? {
                abbreviation: "??",
                id: -1,
                description: "null",
                name: "null",
              };
              return (
                <tr key={i}>
                  <th
                    className={`${
                      i % 2 ? "bg-orange-500" : "bg-white"
                    } text-black`}
                    scope="col"
                    key={activity.id}
                  >
                    <div
                      onMouseEnter={() => doHeaderHoverIn(i)}
                      onMouseLeave={() => doHeaderHoverOut()}
                    >
                      {hoverIndex === i
                        ? longHover
                          ? activity.description
                          : activity.name
                        : activity.abbreviation}
                    </div>
                  </th>
                  {trow.map((td) => (
                    <td key={td.day + td.activity}>
                      <button
                        className={`${
                          td.complete ? "bg-green-500" : "bg-red-500"
                        } flex justify-center w-full rounded-none`}
                        onClick={() => toggleEntry(td)}
                      >
                        {td.complete ? "Y" : "N"}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={activities.length + 1}>
                <button className="w-full rounded-none" onClick={addNewDay}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
