export const applyPatchToObject = <T extends object>(obj: T, path: string, value: unknown): T => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;

  const clone: any = structuredClone(obj);

  let target = clone;

  for (const key of keys) {
    if (!target[key]) target[key] = {};
    target = target[key];
  }

  target[lastKey] = value;

  return clone;
};
