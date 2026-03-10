// src/utils/migrationGlob.ts
import fg from 'fast-glob';
import { getPath } from './pathUtils.js';
import { AppError } from '../errors/AppError.js';

const normalizeToUnixPath = (p: string) => p.replace(/\\/g, '/');
// check if the migration folder has migration files
// and return the glob pattern for Umzug
export const getMigrationGlob = async (): Promise<string> => {
  const env = process.env.NODE_ENV;
  console.log('env.', env);
  const pattern =
    env === 'development'
      ? getPath('backend', 'src', 'migrations', '*.ts')
      : getPath('apps', 'demo_toimeksianto_backend', 'migrations', '*.js');
  console.log('pattern.', pattern);
  const path = normalizeToUnixPath(pattern);

  const files = await fg(path, { onlyFiles: true });

  if (files.length === 0) {
    throw new AppError('No migration files found!', 404);
  }

  return path;
};
