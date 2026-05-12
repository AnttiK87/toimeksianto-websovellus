import type { UsedCarForm } from '../../../../packages/shared/src/index.js';

export const patchRepair = (assignment: any, path: string, value: any) => {
  console.log(path, value);

  const parts = parsePath(path);

  const rootKey = parts[0] as keyof UsedCarForm;
  const nestedKeys = parts.slice(1);

  if (nestedKeys.length === 0) {
    assignment.setDataValue(rootKey, value);
    assignment.changed(rootKey, true);
    return;
  }

  const rootObj = structuredClone(assignment.getDataValue(rootKey) ?? {});

  let target: any = rootObj;

  for (let i = 0; i < nestedKeys.length - 1; i++) {
    const key = nestedKeys[i];
    const nextKey = nestedKeys[i + 1];

    if (target[key] == null) {
      target[key] = typeof nextKey === 'number' ? [] : {};
    }

    target = target[key];
  }

  const lastKey = nestedKeys[nestedKeys.length - 1];
  target[lastKey] = value;

  assignment.setDataValue(rootKey, rootObj);
  assignment.changed(rootKey, true);

  console.log(rootObj);
};

const parsePath = (path: string): (string | number)[] => {
  return path
    .replace(/\[(\d+)\]/g, '.$1') // otherRepairs[1] -> otherRepairs.1
    .split('.')
    .map((part) => {
      const n = Number(part);
      return Number.isNaN(n) ? part : n;
    });
};
