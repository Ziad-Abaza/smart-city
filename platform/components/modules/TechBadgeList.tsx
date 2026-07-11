export function TechBadgeList({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {stack.map((tech) => (
        <span 
          key={tech} 
          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/80"
        >
          {tech}
        </span>
      ))}
    </div>
  )
}
