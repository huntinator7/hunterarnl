import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../views/Home";
import { Boards } from "../views/Boards";
import { Layout } from "../components/Layout";
import { LiftingHome } from "../views/Lifting";
import { Board } from "../views/Board";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="board">
          <Route index element={<Boards />} />
          <Route path=":boardId" element={<Board />} />
        </Route>
        <Route path="*" element={<LiftingHome />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
