// formResetters.ts
import type { UsedCarForm } from '@shared/index.js';

export const resetTyres = (form: UsedCarForm) => ({
  ...form,
  tyres: {
    ...form.tyres,
    tyreType: null,
    tyreSize: '',
    usedChecked: false,
    usedState: null,
    storage: '',
    usedTyre: '',
  },
});

export const resetElectric = (form: UsedCarForm) => ({
  ...form,
  electric: {
    type: null,
    acPower: '',
    dcPower: '',
    capacityGross: '',
    capacityNet: '',
    range: '',
    chargeCable: '',
    standard: null,
  },
});
