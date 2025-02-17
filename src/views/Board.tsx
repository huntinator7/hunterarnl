import { FunctionComponent, useEffect, useState } from "react";
import { Tables } from "../types/database.types";
import supabase from "../utils/supabase";
import { useParams } from "react-router";
import { isMobile } from "react-device-detect";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import { CreateIssue } from "../components/board/CreateIssue";
import { Dropdown } from "../components/Dropdown";
import { BoardIssue } from "../components/board/BoardIssue";

export const Board: FunctionComponent = () => {
  const [board, setBoard] = useState<Tables<"board">>();
  const [issues, setIssues] =
    useState<(Tables<"issue"> & { parent: number })[]>();
  const [backlogIssues, setBacklogIssues] = useState<Tables<"issue">[]>();
  const [statuses, setStatuses] = useState<Tables<"board_status">[]>();

  const params = useParams<{ boardId: string }>();
  const breadcrumbs: Breadcrumb[] = [
    { to: "/board", text: "Boards" },
    { to: `/board/${params.boardId}`, text: board?.name ?? "Current Board" },
  ];

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
    async function getActiveIssues() {
      const { data } = await supabase
        .from("issue")
        .select()
        .eq("board_id", Number(params.boardId))
        .eq("is_backlog", false);
      if (data) {
        setIssues(data.map((d) => ({ ...d, parent: d.status })));
      }
    }
    async function getBacklogIssues() {
      const { data } = await supabase
        .from("issue")
        .select()
        .eq("board_id", Number(params.boardId))
        .eq("is_backlog", true);
      if (data) {
        setBacklogIssues(data);
      }
    }
    async function getStatuses() {
      const { data } = await supabase.from("board_status").select();
      if (data) {
        setStatuses(data);
      }
    }
    getBoards();
    getActiveIssues();
    getBacklogIssues();
    getStatuses();
  }, [params.boardId]);

  const cols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };

  return (
    <div className="h-full flex flex-col">
      <Breadcrumbs routes={breadcrumbs} />
      {!(!!issues?.length && !!board && !!statuses?.length) ? (
        <div>Loading</div>
      ) : (
        <>
          <Dropdown defaultOpen title="Active">
            <div
              className={`grid ${
                cols[isMobile ? 1 : statuses?.length || 1]
              } gap-4 bg-neutral-700`}
            >
              {statuses?.map((s) => (
                <div className="bg-neutral-700 flex flex-col" key={s.id}>
                  <h3 className="bg-sky-600 border-b-2 border-neutral-300 h-16 text-3xl flex justify-start items-center pl-6">
                    {s.title} (
                    {issues?.filter((issue) => issue.status === s.id).length})
                  </h3>
                  <div className="transition-all">
                    {issues
                      ?.filter((issue) => issue.parent === s.id)
                      .map((issue) => (
                        <BoardIssue
                          key={issue.id}
                          issue={issue}
                          board={board}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Dropdown>
          <Dropdown defaultOpen={false} title="Backlog">
            <div className="bg-neutral-700 flex flex-col">
              {backlogIssues?.map((bi) => (
                <BoardIssue key={bi.id} issue={bi} board={board} />
              ))}
              <CreateIssue boardId={params.boardId} status={1} isBacklog />
            </div>
          </Dropdown>
        </>
      )}
    </div>
  );
};
