import React from "react";

export default function TextareaToReadable(text: string | undefined) {
  if (!text) return null;

  return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br/>
      </React.Fragment>
  ));
}
