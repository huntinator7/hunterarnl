import { useState } from "react";
import supabase from "../../utils/supabase";

export const AddPushups = () => {
  const [workoutDisabled, setWorkoutDisabled] = useState(false);
  function tempDisableWorkout() {
    setWorkoutDisabled(true);
    setTimeout(() => setWorkoutDisabled(false), 3000);
  }
  async function addPushups() {
    const res = await supabase
      .from("workout")
      .insert({
        location: "home",
        total_time: 3,
      })
      .select();
    if (res.data?.[0]) {
      supabase
        .from("lift_workout")
        .insert([
          {
            lift_id: 3,
            workout_id: res.data[0].id,
            weight: 0,
            reps: 40,
            sets: 1,
          },
        ])
        .then(() => tempDisableWorkout());
    }
  }
  return (
    <button
      disabled={workoutDisabled}
      onClick={addPushups}
      className="disabled:text-neutral-600 disabled:cursor-not-allowed"
    >
      Add Pushups
    </button>
  );
};
