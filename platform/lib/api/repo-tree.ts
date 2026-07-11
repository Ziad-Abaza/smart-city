import repoTreeData from '@/data/repo-tree.json';

export interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  size?: number;
  extension?: string;
}

export async function getRepoTree(): Promise<TreeNode> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(repoTreeData as TreeNode);
    }, 100);
  });
}
