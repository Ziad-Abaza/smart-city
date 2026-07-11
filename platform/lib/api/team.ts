import teamData from '@/data/team.json';

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export async function getTeam(): Promise<TeamMember[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teamData as TeamMember[]);
    }, 100);
  });
}
