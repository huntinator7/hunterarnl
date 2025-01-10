import { Database } from "./database.types";

export type DBT<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Board = DBT<'board'>