import { DocsSidebar } from "@/components/docs/DocsSidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-12">
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
