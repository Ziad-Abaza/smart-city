import { MDXRemote } from "next-mdx-remote/rsc"
import { CodeBlock } from "./CodeBlock"

const components = {
  pre: CodeBlock,
  // Add customized typography overrides if necessary
  h1: (props: Record<string, unknown>) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: (props: Record<string, unknown>) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-400" {...props} />,
  h3: (props: Record<string, unknown>) => <h3 className="text-xl font-medium mt-6 mb-3 text-white/90" {...props} />,
  p: (props: Record<string, unknown>) => <p className="leading-relaxed mb-4 text-white/70" {...props} />,
  a: (props: Record<string, unknown>) => <a className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2" {...props} />,
  ul: (props: Record<string, unknown>) => <ul className="list-disc pl-6 mb-4 text-white/70 space-y-2 marker:text-white/30" {...props} />,
  ol: (props: Record<string, unknown>) => <ol className="list-decimal pl-6 mb-4 text-white/70 space-y-2 marker:text-white/30" {...props} />,
}

export function MarkdownRenderer({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <MDXRemote source={source} components={components as any} />
    </div>
  )
}
