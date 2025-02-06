import { FunctionComponent, useEffect, useState } from "react";
import { Tables, TablesInsert } from "../../types/database.types";
import supabase from "../../utils/supabase";

interface NewWorkoutLift {
  workout_id?: number;
  lift_id: number;
  weight: string;
  reps: string;
  sets: string;
}

interface NewWorkout {
  location: string;
  total_time: string;
}

const defaultWorkout = {
  location: "home",
  total_time: "0",
};

export const CreateWorkout: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState<NewWorkout>(defaultWorkout);
  const [newLifts, setNewLifts] = useState<NewWorkoutLift[]>([]);
  function setNewLiftField(
    index: number,
    field: keyof NewWorkoutLift,
    value: NewWorkoutLift[keyof NewWorkoutLift]
  ) {
    setNewLifts([
      ...newLifts.slice(0, index),
      { ...newLifts[index], [field]: value },
      ...newLifts.slice(index + 1),
    ]);
  }

  const [liftOptions, setLiftOptions] = useState<Tables<"lift">[]>([]);

  useEffect(() => {
    async function fetchLifts() {
      const { data: lifts } = await supabase.from("lift").select();
      console.log("liftOptions", lifts);
      if (lifts) setLiftOptions(lifts);
    }
    fetchLifts();
  }, []);

  function addNewLift() {
    setNewLifts([
      ...newLifts,
      {
        lift_id: 1,
        weight: "0",
        reps: "0",
        sets: "0",
      },
    ]);
  }

  function removeNewLift(index: number) {
    setNewLifts([...newLifts.slice(0, index), ...newLifts.slice(index + 1)]);
  }

  function startCreateWorkout() {
    setNewWorkout(defaultWorkout);
    setNewLifts([]);
    setShowModal(true);
  }

  function cancelCreateWorkout() {
    setNewWorkout(defaultWorkout);
    setNewLifts([]);
    setShowModal(false);
  }

  function populateLift(
    lift: NewWorkoutLift,
    workout_id: number
  ): TablesInsert<"lift_workout"> {
    return {
      workout_id,
      lift_id: lift.lift_id,
      sets: isNaN(parseInt(lift.sets)) ? null : parseInt(lift.sets),
      weight: isNaN(parseInt(lift.weight)) ? null : parseInt(lift.weight),
      reps: isNaN(parseInt(lift.reps)) ? null : parseInt(lift.reps),
    };
  }

  function populateWorkout(): TablesInsert<"workout"> {
    return {
      location: newWorkout.location,
      total_time: isNaN(parseInt(newWorkout.total_time))
        ? 0
        : parseInt(newWorkout.total_time),
    };
  }

  async function createWorkout() {
    const res = await supabase
      .from("workout")
      .insert(populateWorkout())
      .select();
    if (res.data?.[0]) {
      await supabase
        .from("lift_workout")
        .insert(newLifts.map((nl) => populateLift(nl, res.data[0].id)));
    }
  }
  return (
    <>
      <button onClick={() => startCreateWorkout()}>Add Workout</button>
      {showModal && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-[#0003] flex justify-center items-center">
          <div className="w-[400px] h-[800px] overflow-y-scroll bg-neutral-600 p-4">
            <h2>Create Workout</h2>
            <div className="mt-4 flex flex-col">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={newWorkout.location}
                onChange={(e) =>
                  setNewWorkout({
                    ...newWorkout,
                    location: e.target.value,
                  })
                }
              />
              <label htmlFor="total_time">Time</label>
              <input
                id="total_time"
                type="text"
                value={newWorkout.total_time}
                onChange={(e) =>
                  setNewWorkout({
                    ...newWorkout,
                    total_time: e.target.value,
                  })
                }
              />
              <button className="mt-4" onClick={addNewLift}>
                Add Lift
              </button>
              {newLifts.map((lift, i) => (
                <div key={i} className="flex flex-col py-4">
                  <label>Lift</label>
                  <select
                    value={lift.lift_id}
                    onChange={(e) =>
                      setNewLiftField(i, "lift_id", e.target.value)
                    }
                  >
                    {liftOptions.map((lo) => (
                      <option key={lo.id} value={lo.id}>
                        {lo.name}
                      </option>
                    ))}
                  </select>
                  <label>Weight</label>
                  <input
                    id="weight"
                    type="text"
                    value={lift.weight}
                    onChange={(e) =>
                      setNewLiftField(i, "weight", e.target.value)
                    }
                  />
                  <label>Sets</label>
                  <input
                    id="sets"
                    type="text"
                    value={lift.sets}
                    onChange={(e) => setNewLiftField(i, "sets", e.target.value)}
                  />
                  <label>Reps</label>
                  <input
                    id="reps"
                    type="text"
                    value={lift.reps}
                    onChange={(e) =>
                      setNewLiftField(i, "reps", parseInt(e.target.value))
                    }
                  />
                  <button className="mt-4" onClick={() => removeNewLift(i)}>
                    Delete
                  </button>
                </div>
              ))}
              <div className="mt-4 flex justify-between">
                <button onClick={createWorkout}>Create</button>
                <button onClick={cancelCreateWorkout}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
