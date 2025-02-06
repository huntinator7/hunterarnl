import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Tables } from "../types/database.types";
import { Link } from "react-router";
import { isMobile } from "react-device-detect";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function Boards() {
  const [boards, setBoards] = useState<Tables<"board">[]>([]);

  useEffect(() => {
    async function getBoards() {
      const { data } = await supabase.from("board").select();
      if (data) {
        setBoards([...data]);
      }
    }
    getBoards();
  }, []);

  const blockColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  return (
    <>
      <Breadcrumbs routes={[{ to: "/board", text: "Boards" }]} />
      <div
        className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-4"} w-full`}
      >
        {boards.map((b, i) => (
          <Link
            className={`${blockColors[i]} w-full px-6 h-16 text-2xl flex justify-center items-center text-neutral-900 hover:bg-sky-300 hover:text-neutral-700 text-nowrap`}
            to={`/board/${b.id}`}
            key={i}
          >
            {b.name}
          </Link>
        ))}
      </div>
    </>
  );
}
