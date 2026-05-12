export interface Patch {
  path: string;
  value: unknown;
}

const isObject = (val: unknown): val is Record<string, any> =>
  typeof val === 'object' && val !== null && !Array.isArray(val);

export const createPatches = (original: any, updated: any, basePath = ''): Patch[] => {
  const patches: Patch[] = [];

  const keys = new Set([...Object.keys(original || {}), ...Object.keys(updated || {})]);

  for (const key of keys) {
    const path = basePath ? `${basePath}.${key}` : key;

    const oldVal = original?.[key];
    const newVal = updated?.[key];

    // nested object → recurse
    if (isObject(oldVal) || isObject(newVal)) {
      patches.push(...createPatches(oldVal, newVal, path));
      continue;
    }

    // same value → ignore
    if (oldVal === newVal) continue;

    patches.push({
      path,
      value: newVal,
    });
  }

  return patches;
};

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
