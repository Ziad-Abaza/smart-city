import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

const EXCEL_PATH = path.join(process.cwd(), '../Data/team.xlsx');
const OUTPUT_PATH = path.join(process.cwd(), 'data/team.json');

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  [key: string]: any;
}

function parseTeam() {
  console.log(`Parsing team data from ${EXCEL_PATH}...`);
  if (!fs.existsSync(EXCEL_PATH)) {
    console.warn('team.xlsx not found. Generating dummy team.json.');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2));
    return;
  }
  
  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const data: any[] = xlsx.utils.sheet_to_json(worksheet);
  
  const formattedData: TeamMember[] = data.map((row: any) => ({
    name: row.Name || row.name || 'Unknown',
    role: row.Role || row.role || 'Member',
    image: row.Image || row.image || undefined,
  }));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(formattedData, null, 2));
  console.log(`Successfully wrote ${formattedData.length} team members to ${OUTPUT_PATH}`);
}

parseTeam();
