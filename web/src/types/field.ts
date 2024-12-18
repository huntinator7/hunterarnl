interface BaseField {
  type: "input" | "select" | "checkbox";
  label: string;
  name: string;
  value?: string | number | boolean;
  defaultValue: Readonly<string | number | boolean>;
  required?: boolean;
  show?: [fieldName: string, value: any][];
}

interface ActiveField<T extends string | number | boolean> extends BaseField {
  value: T;
  defaultValue: Readonly<T>;
}

interface InitBaseField<T extends string | number | boolean> extends BaseField {
  defaultValue: Readonly<T>;
}

interface Option {
  label: string;
  value: string | number;
}

export interface InputField extends ActiveField<string | number> {
  type: "input";
}
interface InputFieldInit extends InitBaseField<string | number> {
  type: "input";
}

export interface SelectField extends ActiveField<string | number> {
  type: "select";
  options: Option[];
}
interface SelectFieldInit extends InitBaseField<string | number> {
  type: "select";
  options: Option[];
}

export interface CheckboxField extends ActiveField<boolean> {
  type: "checkbox";
}
interface CheckboxFieldInit extends InitBaseField<boolean> {
  type: "checkbox";
}

export type Field = InputField | SelectField | CheckboxField;
export type InitField = InputFieldInit | SelectFieldInit | CheckboxFieldInit;
