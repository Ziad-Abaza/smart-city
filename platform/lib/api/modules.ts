import { modules, Module } from '@/data/modules';

export async function getModules(): Promise<Module[]> {
  // Simulating async API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(modules), 100);
  });
}

export async function getModuleById(id: string): Promise<Module | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(modules.find(m => m.id === id));
    }, 100);
  });
}
