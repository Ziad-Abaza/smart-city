import fs from 'fs';
import path from 'path';

const REPO_ROOT = path.join(process.cwd(), '../');
const OUTPUT_PATH = path.join(process.cwd(), 'data/repo-tree.json');

// Directories we want to include in our mock tree
const INCLUDED_DIRS = ['Code', 'Data', '3D', 'images'];

interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  size?: number;
  extension?: string;
}

function buildTree(dir: string, name: string): TreeNode | null {
  try {
    const stats = fs.statSync(dir);
    
    if (stats.isDirectory()) {
      // Skip node_modules or platform if they somehow end up in our included dirs
      if (name === 'node_modules' || name === '.git') return null;
      
      const children = fs.readdirSync(dir)
        .map(child => buildTree(path.join(dir, child), child))
        .filter((child): child is TreeNode => child !== null)
        .sort((a, b) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === 'directory' ? -1 : 1;
        });
        
      return {
        name,
        type: 'directory',
        children
      };
    } else {
      return {
        name,
        type: 'file',
        size: stats.size,
        extension: path.extname(name)
      };
    }
  } catch (e) {
    return null;
  }
}

function generateRepoTree() {
  console.log(`Generating repo tree for ${INCLUDED_DIRS.join(', ')}...`);
  
  const rootNode: TreeNode = {
    name: 'smart-city-web',
    type: 'directory',
    children: []
  };

  for (const dir of INCLUDED_DIRS) {
    const fullPath = path.join(REPO_ROOT, dir);
    if (fs.existsSync(fullPath)) {
      const tree = buildTree(fullPath, dir);
      if (tree) {
        rootNode.children!.push(tree);
      }
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(rootNode, null, 2));
  console.log(`Successfully wrote repo tree to ${OUTPUT_PATH}`);
}

generateRepoTree();
