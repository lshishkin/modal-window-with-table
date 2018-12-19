import React from "react";

export default ({ id, name, date, count }) => (
  <tr key={id}>
    <td key="1">{id}</td>
    <td key="2">{name}</td>
    <td key="3">{date}</td>
    <td key="4">{count}</td>
  </tr>
);
