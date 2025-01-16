import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Tables } from "../types/database.types";
import { Link } from "react-router";
import { Title } from "../components/Title";
import { isMobile } from "react-device-detect";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function Boards() {
  const [boards, setBoards] = useState<Tables<"board">[]>([]);

  useEffect(() => {
    async function getBoards() {
      const { data } = await supabase.from("board").select();
      if (data) {
        setBoards([
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
        ]);
      }
    }
    getBoards();
  }, []);

  return (
    <>
      <Breadcrumbs routes={[{ to: "/board", text: "Boards" }]} />
      <Title text="Boards" />
      <div
        className={`grid ${
          isMobile ? "grid-cols-1" : "grid-cols-4"
        } gap-2 w-full`}
      >
        {boards.map((b, i) => (
          <Link
            className={`bg-sky-500 w-full px-6 h-16 text-2xl flex justify-center items-center text-neutral-900 hover:bg-sky-300 hover:text-neutral-700 text-nowrap`}
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
