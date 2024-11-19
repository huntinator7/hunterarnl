import { Component, createSignal, For, ParentComponent } from "solid-js";
import styles from "./index.module.css";
import { createStore } from "solid-js/store";

interface Option {
  value: string;
  label: string;
  suboptionsKey?: string;
}

const materialOptions: Option[] = [
  {
    label: "Plastic",
    value: "plastic",
    suboptionsKey: "plasticType",
  },
  {
    label: "Metal",
    value: "metal",
    suboptionsKey: "metalType",
  },
  {
    label: "Food Waste",
    value: "foodWaste",
    suboptionsKey: "foodWasteType",
  },
  {
    label: "Other",
    value: "other",
    suboptionsKey: "otherMaterialType",
  },
];

const Field: ParentComponent<{ label: string }> = (props) => (
  <div class={styles.field}>
    <label>{props.label}</label>
    {props.children}
  </div>
);

const [form, setForm] = createStore({
  name: "",
  description: "",
  material: "",
});

export const GarbageLog: Component = () => {
  return (
    <div>
      <Field label="Name">
        <input onChange={(e) => setForm("name", e.target.value)} />
      </Field>
      <Field label="Description">
        <input onChange={(e) => setForm("description", e.target.value)} />
      </Field>
      <Field label="Material">
        <select onChange={(e) => setForm("material", e.target.value)}>
          <option hidden disabled selected value="">
            {" "}
          </option>
          <For each={materialOptions}>
            {(option) => <option value={option.value}>{option.label}</option>}
          </For>
        </select>
      </Field>
      <ul>
        <li>{form.name}</li>
        <li>{form.description}</li>
        <li>{form.material}</li>
        <li>{JSON.stringify(form)}</li>
      </ul>
    </div>
  );
};
