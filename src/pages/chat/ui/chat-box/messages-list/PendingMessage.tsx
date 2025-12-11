import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Message } from "../MessageList";

interface Props {
  message: Message;
}

export const PendingMessage = ({ message }: Props) => {
  return (
    <div className="w-full flex flex-col items-start my-2">
      <div className="max-w-[80%] md:max-w-3xl w-full rounded-xl px-4 py-3 bg-neutral-900 border border-neutral-800">
        <div
          className="prose prose-invert max-w-none prose-p:text-neutral-300 prose-code:before:content-['']
          prose-code:after:content-[''] text-xl"
        >
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: ({ node, ...props }: any) => (
                <pre
                  className="font-mono bg-black border border-neutral-700 p-4 rounded-lg overflow-x-auto text-sm"
                  {...props}
                />
              ),
              code: ({ inline, className, children, ...props }: any) =>
                inline ? (
                  <code
                    className="bg-neutral-700/50 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={`font-mono ${className}`} {...props}>
                    {children}
                  </code>
                ),
            }}
          >
            {message.text}
          </ReactMarkdown>

          <span className="ml-1 animate-pulse">Печатает...</span>
        </div>
      </div>
    </div>
  );
};
