import fs from 'fs';
import path from 'path';
import { initialPrograms } from '../data/seedData';

const dbPath = path.join(process.cwd(), 'server', 'data', 'db_store.json');

try {
  if (fs.existsSync(dbPath)) {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(raw);
    data.programs = initialPrograms;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Successfully updated db_store.json with ${initialPrograms.length} programs!`);
  }
} catch (err) {
  console.error('Error syncing programs:', err);
}
