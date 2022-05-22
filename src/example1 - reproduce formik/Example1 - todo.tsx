import React, { useState } from "react";

export default () => {
  return (
    <form onSubmit={() => {}}>
      <br />
      <input id="name" type="text" onChange={() => {}} value={1} />
      <br />
      <input id="email" type="text" onChange={() => {}} value={2} />
      <br />
      <button>Submit</button>
    </form>
  );
};
