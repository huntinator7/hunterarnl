import { FunctionComponent, useEffect, useState } from "react";
import { Tables } from "../types/database.types";
import supabase from "../utils/supabase";
import { useParams } from "react-router";

export const Board: FunctionComponent = () => {
  const params = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<Tables<"board">>();
  const [issues, setIssues] = useState<Tables<"issue">[]>();
  const [statuses, setStatuses] = useState<Tables<"board_status">[]>();

  useEffect(() => {
    async function getBoards() {
      const { data } = await supabase
        .from("board")
        .select()
        .eq("id", Number(params.boardId));
      if (data && data.length > 0) {
        setBoard(data[0]);
      }
    }
    async function getIssues() {
      const { data } = await supabase
        .from("issue")
        .select()
        .eq("board_id", Number(params.boardId));
      if (data) {
        setIssues(data);
      }
    }
    async function getStatuses() {
      const { data } = await supabase.from("board_status").select();
      if (data) {
        setStatuses(data);
      }
    }
    getBoards();
    getIssues();
    getStatuses();
  }, [params.boardId]);

  return (
    <div className="h-full flex flex-col">
      <h1>{board?.name}</h1>
      <div className="grid grid-flow-col gap-4 h-full my-4">
        {statuses?.map((s) => (
          <div className="bg-neutral-700" key={s.id}>
            <h2 className="border-b-2 border-neutral-300 h-16 text-3xl flex justify-start items-center pl-6">
              {s.title}
            </h2>
            <div className="px-2">
              {issues
                ?.filter((issue) => issue.status === s.id)
                .map((issue) => (
                  <div className="mt-2">{issue.id}</div>
                ))}
              <button className="flex justify-center items-center mt-2 w-full rounded-none bg-neutral-600 text-neutral-300 hover:bg-neutral-500 hover:text-neutral-200">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
