import { useEffect, useMemo, useState } from "react";
import { Tables } from "../types/database.types";
import supabase from "../utils/supabase";
import { useParams } from "react-router";
import { type Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import { Title } from "../components/Title";

export const Issue = () => {
  const params = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Tables<"issue">>();
  const [boardId, setBoardId] = useState("Current Board");
  const [boardName, setBoardName] = useState("Current Board");
  const breadcrumbs: Breadcrumb[] = useMemo(() => {
    console.log("BREAD", boardName);
    return [
      { to: "/board", text: "Boards" },
      { to: `/board/${boardId}`, text: boardName },
      { to: `/issue/${params.issueId}`, text: issue?.title ?? "" },
    ];
  }, [boardName, issue?.title, boardId, params.issueId]);

  useEffect(() => {
    console.log("boardName changed", boardName);
  }, [boardName]);

  useEffect(() => {
    async function getIssue() {
      const { data } = await supabase
        .from("issue")
        .select()
        .eq("id", Number(params.issueId));
      if (!data || !data.length) return;
      setIssue(data[0]);
      const { data: board } = await supabase
        .from("board")
        .select()
        .eq("id", data[0].board_id);
      if (!board || !board.length) return;
      setBoardId(board[0].id.toString());
      setBoardName(board[0].name);
    }
    console.log("good call", params.issueId);
    getIssue();
  }, []);
  return (
    <>
      <Breadcrumbs routes={breadcrumbs} />
      <Title text="Issue" />
      <div>{issue?.id}</div>
      <div>{issue?.title}</div>
      <div>{issue?.description}</div>
    </>
  );
};
