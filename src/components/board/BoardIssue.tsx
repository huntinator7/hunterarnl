import { FunctionComponent } from "react";
import { Tables } from "../../types/database.types";
import { IssuePriority } from "../IssuePriority";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface Props {
  issue: Tables<"issue"> & { parent?: number };
  board: Tables<"board">;
}

export const BoardIssue: FunctionComponent<Props> = ({ issue, board }) => {
  return (
    <div
      key={issue.id}
      className="flex flex-row justify-between bg-neutral-600 p-4 mt-2 text-white"
    >
      <div className="flex flex-col">
        <h4>{issue.title}</h4>
        <div className="row-span-3">{issue.description}</div>
      </div>
      <div className="grid grid-cols-[75px_75px] grid-rows-[50px_50px_50px] gap-2">
        <span className="bg-neutral-700 h-full w-full flex justify-center items-center rounded-lg text-neutral-300">
          {board.tag}-{issue.id}
        </span>
        <IssuePriority issue={issue} withDropdown />
        <Link
          to={`/issue/${issue.id}`}
          className="bg-neutral-700 h-full w-full flex justify-center items-center rounded-lg text-neutral-300"
        >
          <FontAwesomeIcon icon={faEye} size="lg" />
        </Link>
      </div>
    </div>
  );
};
