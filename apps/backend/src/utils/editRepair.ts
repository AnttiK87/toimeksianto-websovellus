import type { UsedCarForm } from '../../../../packages/shared/src/dist/index.js';

export const patchRepair = (assignment: any, path: string, value: any) => {
  //console.log(assignment);
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const rootKey = keys.shift() as keyof UsedCarForm;

  // hae JSON kenttä
  const rootObj = structuredClone(assignment.getDataValue(rootKey));

  console.log(rootObj);

  // navigointi
  let target: any = rootObj;

  for (const key of keys) {
    if (!target[key]) target[key] = {};
    target = target[key];
  }

  // aseta arvo
  target[lastKey] = value;

  // ⭐ tärkeimmät rivit
  assignment.setDataValue(rootKey, rootObj);
  assignment.changed(rootKey, true);

  //console.log(assignment);
};
