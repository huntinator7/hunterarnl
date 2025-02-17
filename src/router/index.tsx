import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../views/Home";
import { Boards } from "../views/Boards";
import { Layout } from "../components/Layout";
import { LiftingHome } from "../views/Lifting";
import { Board } from "../views/Board";
import { Issue } from "../views/Issue";
import { Hard100 } from "../views/Hard100";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="board">
          <Route index element={<Boards />} />
          <Route path=":boardId" element={<Board />} />
        </Route>
        <Route path="issue/:issueId" element={<Issue />} />
        <Route path="100" element={<Hard100 />} />
        <Route path="*" element={<LiftingHome />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
