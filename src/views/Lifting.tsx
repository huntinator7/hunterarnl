import { Title } from "../components/Title";
import { CreateWorkout } from "../components/lifting/CreateWorkout";

export function LiftingHome() {
  return (
    <>
      <Title text="Lifting" />
      <CreateWorkout />
    </>
  );
}
