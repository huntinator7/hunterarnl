import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Tables } from "../types/database.types";
import supabase from "../utils/supabase";
import { Link, useParams } from "react-router";
import { BrowserView, isMobile } from "react-device-detect";
import { Title } from "../components/Title";
import { IssuePriority } from "../components/IssuePriority";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface NewIssue {
  board_id: number;
  description: string;
  status: number;
  title: string;
}

export const Board: FunctionComponent = () => {
  const params = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<Tables<"board">>();
  const [issues, setIssues] = useState<Tables<"issue">[]>();
  const [statuses, setStatuses] = useState<Tables<"board_status">[]>();
  const [showModal, setShowModal] = useState(false);
  const defaultIssue = {
    board_id: Number(params.boardId),
    description: "",
    status: 0,
    title: "",
  };
  const [newIssue, setNewIssue] = useState<NewIssue>(defaultIssue);
  const breadcrumbs: Breadcrumb[] = useMemo(
    () => [
      { to: "/board", text: "Boards" },
      { to: `/board/${params.boardId}`, text: board?.name ?? "Current Board" },
    ],
    [board?.name, params.boardId]
  );

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

  function startCreateIssue(status: number) {
    setNewIssue({ ...newIssue, status });
    setShowModal(true);
  }

  function cancelCreateIssue() {
    setNewIssue(defaultIssue);
    setShowModal(false);
  }

  async function createIssue() {
    await supabase.from("issue").insert(newIssue);
  }

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
      <Title text={board?.name!} />
      <div
        className={`grid ${
          cols[isMobile ? 1 : statuses?.length || 1]
        } gap-4 h-full my-4`}
      >
        {statuses?.map((s) => (
          <div className="bg-neutral-700 flex flex-col" key={s.id}>
            <h3 className="bg-sky-600 border-b-2 border-neutral-300 h-16 text-3xl flex justify-start items-center pl-6">
              {s.title} (
              {issues?.filter((issue) => issue.status === s.id).length})
            </h3>
            <div className="px-2 pb-2">
              {issues
                ?.filter((issue) => issue.status === s.id)
                .map((issue) => (
                  <div
                    key={issue.id}
                    className="grid grid-cols-[1fr_50px] grid-rows-[40px_40px_40px_1fr] gap-3 bg-neutral-600 p-4 mt-4 text-white"
                  >
                    <h3>{issue.title}</h3>
                    <span className="bg-neutral-700 h-full w-full flex justify-center items-center rounded-lg">
                      {issue.id}
                    </span>
                    <div className="row-span-3">{issue.description}</div>
                    <IssuePriority issue={issue} />
                    <Link
                      to={`/issue/${issue.id}`}
                      className="bg-neutral-700 h-full w-full flex justify-center items-center rounded-lg text-neutral-300"
                    >
                      <FontAwesomeIcon icon={faEye} size="lg" />
                    </Link>
                  </div>
                ))}
              <button
                onClick={() => startCreateIssue(s.id)}
                className="flex justify-center items-center mt-4 w-full rounded-none bg-neutral-600 text-neutral-300 hover:bg-neutral-500 hover:text-neutral-200"
              >
                +
              </button>
              {showModal ? (
                <NewIssueModal
                  newIssue={newIssue}
                  setNewIssue={setNewIssue}
                  createIssue={createIssue}
                  cancelCreateIssue={cancelCreateIssue}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewIssueModal: FunctionComponent<{
  newIssue: NewIssue;
  setNewIssue: React.Dispatch<React.SetStateAction<NewIssue>>;
  createIssue: () => void;
  cancelCreateIssue: () => void;
}> = ({ newIssue, setNewIssue, createIssue, cancelCreateIssue }) => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-[#0003] flex justify-center items-center">
      <div className="w-[400px] h-min bg-neutral-600 p-4">
        <h2>Create Issue</h2>
        <div className="mt-4 flex flex-col">
          <label>Title</label>
          <input
            id="title"
            type="text"
            value={newIssue.title}
            onChange={(e) =>
              setNewIssue({
                ...newIssue,
                title: e.target.value,
              })
            }
          />
          <label className="mt-4">Description</label>
          <input
            id="description"
            type="text"
            value={newIssue.description}
            onChange={(e) =>
              setNewIssue({
                ...newIssue,
                description: e.target.value,
              })
            }
          />
          <div className="mt-4 flex justify-between">
            <button onClick={createIssue}>Create</button>
            <button onClick={cancelCreateIssue}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
