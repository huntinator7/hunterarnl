import { CheckboxField, InputField, SelectField } from "@/types/field";
import {
  Accessor,
  Component,
  For,
  ParentComponent,
  ParentProps,
  Signal,
} from "solid-js";

import styles from "./Form.module.css";

export const Field: ParentComponent<{ label: string }> = (props) => (
  <div style={styles.field}>
    <label>{props.label}</label>
    {props.children}
  </div>
);

export const Select = ([field, setField]: Signal<SelectField>) => (
  <Field label={field().label}>
    <select onChange={(e) => setField({ ...field(), value: e.target.value })}>
      <For each={field().options}>
        {(option) => <option value={option.value}>{option.label}</option>}
      </For>
    </select>
  </Field>
);

export const Checkbox = ([field, setField]: Signal<CheckboxField>) => (
  <Field label={field().label}>
    <input
      type="checkbox"
      checked={field().value}
      onChange={() => setField({ ...field(), value: !field().value })}
    />
  </Field>
);

export const Input = ([field, setField]: Signal<InputField>) => (
  <Field label={field().label}>
    <input
      value={field().value}
      onChange={(e) => setField({ ...field(), value: e.target.value })}
    />
  </Field>
);
