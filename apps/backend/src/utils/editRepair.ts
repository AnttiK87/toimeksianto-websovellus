import type { UsedCarForm } from '../../../../packages/shared/src/index.js';

export const patchRepair = (assignment: any, path: string, value: any) => {
  console.log(path, value);

  const parts = path.split('.');
  const rootKey = parts[0] as keyof UsedCarForm;
  const nestedKeys = parts.slice(1);

  console.log({ rootKey, nestedKeys });

  // ✅ jos muokataan suoraan pääavainta
  if (nestedKeys.length === 0) {
    assignment.setDataValue(rootKey, value);
    assignment.changed(rootKey, true);
    return;
  }

  // ✅ hae JSON root objekti
  const rootObj = structuredClone(assignment.getDataValue(rootKey) ?? {});

  console.log(rootObj);

  // navigoi oikeaan kohtaan
  let target: any = rootObj;

  for (let i = 0; i < nestedKeys.length - 1; i++) {
    const key = nestedKeys[i];

    if (target[key] == null || typeof target[key] !== 'object') {
      target[key] = {};
    }

    target = target[key];
  }

  // aseta arvo
  const lastKey = nestedKeys[nestedKeys.length - 1];
  target[lastKey] = value;

  // tallenna takaisin Sequelizeen
  assignment.setDataValue(rootKey, rootObj);
  assignment.changed(rootKey, true);
};
