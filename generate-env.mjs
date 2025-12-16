import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config(); // lê o .env local se existir

const targetPath = path.resolve('./src/environments/environment.ts');

// verifica se está em produção (Render define NODE_ENV=production)
const isProd = process.env.NODE_ENV === 'production';

const envConfigFile = `
export const environment = {
  production: ${isProd},
  apiUrl: '${process.env.API_URL || 'http://localhost:8000/api/v1'}',
};
`;

fs.writeFileSync(targetPath, envConfigFile);