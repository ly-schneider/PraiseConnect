import Link from "next/link";
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

export function TextareaToReadableRemoveLineBreaks(text: string | undefined) {
  return text?.replace(/\n/g, " ");
}