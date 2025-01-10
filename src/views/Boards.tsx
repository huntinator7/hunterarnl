import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Tables } from "../types/database.types";
import { Link } from "react-router";

export function Boards() {
  const [boards, setBoards] = useState<Tables<"board">[]>([]);

  useEffect(() => {
    async function getBoards() {
      const { data } = await supabase.from("board").select();
      if (data) {
        setBoards(data);
      }
    }
    getBoards();
  }, []);

  return (
    <div>
      <h1>Boards</h1>
      <div className="mt-4 grid grid-cols-4 gap-4 auto-rows-auto">
        {boards.map((b) => (
          <Link to={`/board/${b.id}`} key={b.id}>
            <div className="bg-sky-500 w-full h-16 text-2xl flex justify-center items-center text-neutral-900 hover:bg-sky-300 hover:text-neutral-700">
              {b.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
