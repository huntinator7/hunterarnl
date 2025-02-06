import { FunctionComponent, useState } from "react";
import supabase from "../../utils/supabase";

interface NewIssue {
  board_id: number;
  description: string;
  status: number;
  title: string;
  is_backlog: boolean;
}

export const CreateIssue: FunctionComponent<{
  boardId?: string;
  status: number;
  isBacklog?: boolean;
}> = ({ boardId, status, isBacklog = false }) => {
  const defaultIssue = {
    board_id: Number(boardId),
    description: "",
    status,
    title: "",
    is_backlog: isBacklog,
  };
  const [newIssue, setNewIssue] = useState<NewIssue>(defaultIssue);
  const [showModal, setShowModal] = useState(false);

  function startCreateIssue() {
    setNewIssue({ ...newIssue, status });
    setShowModal(true);
  }

  function cancelCreateIssue() {
    setNewIssue(defaultIssue);
    setShowModal(false);
  }

  async function createIssue() {
    await supabase.from("issue").insert(newIssue);
    setNewIssue(defaultIssue);
    setShowModal(false);
  }

  return (
    <>
      <button
        onClick={startCreateIssue}
        className="flex justify-center items-center mt-4 w-full rounded-none bg-neutral-600 text-neutral-300 hover:bg-neutral-500 hover:text-neutral-200"
      >
        Create New Issue
      </button>
      {showModal && (
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
      )}
    </>
  );
};
