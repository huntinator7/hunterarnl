import DailyHistory from "@/components/DailyHistory";
import { Checkbox, Input } from "@/components/Form";
import { CheckboxField, Field, InputField } from "@/types/field";
import { Component, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

const [showCreateDay, setShowCreateDay] = createSignal(false);

const fields = [
  createSignal<CheckboxField>({
    type: "checkbox",
    name: "abWorkout",
    label: "Ab Workout",
    value: false,
    defaultValue: false,
  }),
  createSignal<CheckboxField>({
    type: "checkbox",
    name: "stretchToes",
    label: "Stretch Toes",
    value: false,
    defaultValue: false,
  }),
  createSignal<InputField>({
    type: "input",
    name: "stretchToesHeight",
    label: "Stretch Toes Height",
    value: 0,
    defaultValue: 0,
  }),
] as const;

const newDayFields = [
  {
    type: "input",
    name: "stretchToesHeight",
    value: 0,
  },
  {
    type: "checkbox",
    name: "stretchSplits",
    value: false,
  },
  {
    type: "input",
    name: "stretchSplitsWidth",
    value: 0,
  },
];

function logFields() {
  console.log(fields.map(f => f[0]().value));
}

export default (() => (
  <div>
    <h1>Daily</h1>
    <button onClick={() => setShowCreateDay(!showCreateDay())}>
      Add Today
    </button>
    {showCreateDay() && (
      <div>
        <h2>Create Day Form</h2>
        <Checkbox {...fields[0]} />
        <Checkbox {...fields[1]} />
        <Input {...fields[2]} />
        <button onClick={logFields}>Click me</button>
      </div>
    )}
    <DailyHistory />
  </div>
)) satisfies Component;
