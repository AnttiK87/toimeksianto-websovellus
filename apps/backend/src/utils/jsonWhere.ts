// utils/jsonWhere.ts
import { where, fn, col } from 'sequelize';

export const jsonWhere = (column: string, path: string, value: any) =>
  where(fn('JSON_EXTRACT', col(column), `$.${path}`), value);
