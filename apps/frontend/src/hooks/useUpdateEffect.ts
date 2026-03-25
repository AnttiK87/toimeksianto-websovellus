import { useEffect, useRef } from 'react';

export const useUpdateEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    return effect();
  }, deps);
};
