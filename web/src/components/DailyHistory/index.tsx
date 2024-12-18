import { Component } from "solid-js";

const days = ["Today"];

export default (() => (
  <div>
    Daily History
    <div>
      {days.map((day) => (
        <div>{day}</div>
      ))}
    </div>
  </div>
)) satisfies Component;
