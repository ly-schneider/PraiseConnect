import Link from "next/link";
import { JSX } from "react";
import ReactMarkdown from "react-markdown";

export default function RenderMarkdown({
  content,
}: {
  content: string | undefined;
}): JSX.Element {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <Link href={href} className="text text-primary underline">
            {children}
          </Link>
        ),
        p: ({ children }) => <p className="text">{children}</p>,
      }}>
      {content || ""}
    </ReactMarkdown>
  );
}

export function RenderMarkdownForPreview({
  content,
}: {
  content: string | undefined;
}): JSX.Element {
  // This is used for the preview of the chat. So no don't render links and remove line breaks.

  if (!content) return <></>;

  // Replace links and remove line breaks
  const previewContent = content
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace Markdown links with their text
    .replace(/\n+/g, " "); // Remove line breaks

  return <p className="text mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{previewContent}</p>;
}
