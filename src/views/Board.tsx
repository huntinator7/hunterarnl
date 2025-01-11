import {
  FunctionComponent,
  PropsWithChildren,
  ReducerAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Tables } from "../types/database.types";
import supabase from "../utils/supabase";
import { useParams } from "react-router";

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

  return (
    <div className="h-full flex flex-col">
      <h1>{board?.name}</h1>
      <div className="grid grid-flow-col gap-4 h-full my-4">
        {statuses?.map((s) => (
          <div className="bg-neutral-700" key={s.id}>
            <h2 className="border-b-2 border-neutral-300 h-16 text-3xl flex justify-start items-center pl-6">
              {s.title} (
              {issues?.filter((issue) => issue.status === s.id).length})
            </h2>
            <div className="px-2">
              {issues
                ?.filter((issue) => issue.status === s.id)
                .map((issue) => (
                  <div className="bg-neutral-600 p-4 mt-4">
                    <div className="flex justify-between">
                      <h3>
                        {issue.id} - {issue.title}
                      </h3>
                      <button>View</button>
                    </div>
                    <div className="mt-2">{issue.description}</div>
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
