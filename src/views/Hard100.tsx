import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Title } from "../components/Title";
import supabase from "../utils/supabase";
import { useSupabase } from "../utils/useSupabase";
import { Tables } from "../types/database.types";
import { useState } from "react";
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
  const highestDay = results.reduce((a, c) => (c.day > a ? c.day : a), 0);

  const tableData: Tables<"hard100">[][] = Array.from(
    { length: highestDay },
    (_v, i) =>
      activities.map(
        (a) =>
          results.find((r) => r.activity === a.id && r.day === i + 1) ?? {
            activity: a.id,
            complete: false,
            day: i + 1,
            explanation: null,
            id: -1,
          }
      )
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
    <>
      <Title text="Hard 100" />
      <table className="w-full border border-solid border-sky-500">
        <thead>
          <tr>
            <th scope="col" className="bg-sky-500">
              DAY
            </th>
            {activities.map((a, i) => (
              <th
                className={`${i % 2 ? "bg-orange-500" : "bg-white"} text-black`}
                scope="col"
                key={a.id}
              >
                <div
                  onMouseEnter={() => doHeaderHoverIn(i)}
                  onMouseLeave={() => doHeaderHoverOut()}
                >
                  {hoverIndex === i
                    ? longHover
                      ? a.description
                      : a.name
                    : a.abbreviation}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((trow, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
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
          ))}
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
    </>
  );
};
