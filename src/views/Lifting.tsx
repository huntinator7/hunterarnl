import { Calendar } from "../components/Calendar";
import { Title } from "../components/Title";
import { CreateWorkout } from "../components/lifting/CreateWorkout";
import supabase from "../utils/supabase";
import { Tables } from "../types/database.types";
import { CalendarFunctions } from "../utils/calendar";
import { useSupabase } from "../utils/useSupabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export function LiftingHome() {
  const [pushups] = useSupabase(
    () =>
      supabase
        .from("lift_workout")
        .select()
        .eq("lift_id", 3) as unknown as Promise<
        PostgrestSingleResponse<Tables<"lift_workout">[]>
      >,
    []
  );

  const liftingCalendarData = pushups.map((l) => ({
    date: new Date(l.created_at),
    value: (l.reps ?? 0) * (l.sets ?? 0),
  }));

  const liftingCalendarFunctions: CalendarFunctions<number> = {
    combineValues: (d1, d2) => d1.value + d2.value,
    getLabel: (d) => `Pushups: ${d.value}`,
    getColor: (d) =>
      d.value > 0
        ? "bg-green-500"
        : new Date(d.date) < new Date()
        ? "bg-red-500"
        : "bg-transparent",
  };
  return (
    <>
      <Title text="Lifting" />
      <div className="h-[calc(100vh-52px-64px)] overf low-y-auto p-8">
        <CreateWorkout />
        <div className="mt-4">
          <Calendar
            data={liftingCalendarData}
            functions={liftingCalendarFunctions}
          />
        </div>
      </div>
    </>
  );
}
