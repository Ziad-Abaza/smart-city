import { getRepoTree } from "@/lib/api/repo-tree"
import { TreeNode } from "./TreeNode"

export async function RepoTreeViewer() {
  const tree = await getRepoTree()

  if (!tree) {
    return (
      <div className="p-8 text-center text-white/50">
        Repository tree data is not available. Please run the parser script.
      </div>
    )
  }

  return (
    <div className="font-mono bg-[#0A0B0E] border border-white/10 rounded-xl p-4 overflow-x-auto">
      <TreeNode node={tree} />
    </div>
  )
}
