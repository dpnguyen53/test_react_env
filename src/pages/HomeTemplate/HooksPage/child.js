import React, { memo } from "react";

function Child() {
  console.log("Child");
  return (
    <div>
      <h5>Child</h5>
    </div>
  );
}

export default memo(Child);
