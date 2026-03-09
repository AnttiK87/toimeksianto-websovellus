// formResetters.ts
import type { UsedCarForm } from '@shared/index.js';

export const resetTyres = (form: UsedCarForm) => ({
  ...form,
  tyres: {
    ...form.tyres,
    newTyres: {
      ...form.tyres.newTyres,
      tyreType: null,
      tyreSize: '',
      usedChecked: false,
      usedState: null,
      storage: '',
      usedTyre: '',
      repair: null,
    },
  },
});

export const resetUsed = (form: UsedCarForm) => ({
  ...form,
  tyres: {
    ...form.tyres,
    newTyres: {
      ...form.tyres.newTyres,
      usedState: null,
      storage: '',
      usedTyre: '',
      repair: null,
    },
  },
});

export const resetUsedState = (form: UsedCarForm) => ({
  ...form,
  tyres: {
    ...form.tyres,
    newTyres: {
      ...form.tyres.newTyres,
      storage: '',
      usedTyre: '',
      repair: null,
    },
  },
});

export const resetBalancing = (form: UsedCarForm) => ({
  ...form,
  tyres: {
    ...form.tyres,
    balancingNeeded: {
      ...form.tyres.balancingNeeded,
      balancingWheels: null,
      repair: null,
    },
  },
});

export const resetElectric = (form: UsedCarForm) => ({
  ...form,
  electric: {
    ...form.electric,
    acPower: '',
    dcPower: '',
    capacityGross: '',
    capacityNet: '',
    range: '',
    chargeCable: '',
    standard: null,
  },
});

export const resetService = (form: UsedCarForm) => ({
  ...form,
  service: {
    ...form.service,
    type: null,
    selected: [],
    repair: null,
  },
});

export const resetServiceSelected = (form: UsedCarForm) => ({
  ...form,
  service: {
    ...form.service,
    selected: [],
    repair: null,
  },
});

export const resetTiming = (form: UsedCarForm) => ({
  ...form,
  timing: {
    ...form.timing,
    beltChangeKm: '',
    beltChangeTime: '',
    lastBeltChangeKm: '',
    lastBeltChangeTime: '',
    beltChangeNeeded: false,
    chainChangeNeeded: false,
    repair: null,
  },
});

export const resetHeater = (form: UsedCarForm) => ({
  ...form,
  otherServiceWork: {
    ...form.otherServiceWork,
    heater: {
      ...form.otherServiceWork.heater,
      heaterRepair: false,
      repair: null,
    },
  },
});

export const resetAc = (form: UsedCarForm) => ({
  ...form,
  otherServiceWork: {
    ...form.otherServiceWork,
    ac: {
      ...form.otherServiceWork.ac,
      acRepair: false,
      acService: null,
      repair: null,
    },
  },
});

export const resetBulbChange = (form: UsedCarForm) => ({
  ...form,
  otherServiceWork: {
    ...form.otherServiceWork,
    bulbChange: {
      ...form.otherServiceWork.bulbChange,
      bulbs: '',
      repair: null,
    },
  },
});

export const resetWindshield = (form: UsedCarForm) => ({
  ...form,
  windshield: {
    ...form.windshield,
    workshop: null,
    subcontractor: '',
    insurance: false,
    insuranceCompany: null,
    otherInsuranceCompany: '',
    damageDate: '',
    changeFee: '',
    feePayer: null,
    repair: null,
  },
});

export const resetSubcontractor = (form: UsedCarForm) => ({
  ...form,
  windshield: {
    ...form.windshield,
    subcontractor: '',
  },
});

export const resetInsurance = (form: UsedCarForm) => ({
  ...form,
  windshield: {
    ...form.windshield,
    insuranceCompany: null,
    otherInsuranceCompany: '',
    damageDate: '',
    changeFee: '',
    feePayer: null,
  },
});

export const resetOtherInsurance = (form: UsedCarForm) => ({
  ...form,
  windshield: {
    ...form.windshield,
    otherInsuranceCompany: '',
  },
});

export const resetDamage = (form: UsedCarForm) => ({
  ...form,
  damage: {
    ...form.damage,
    damageDate: '',
    repairType: null,
    repairFee: '',
    feePayer: null,
    description: '',
    insuranceCompany: null,
    otherInsuranceCompany: '',
    painter: null,
    disassembly: false,
    repair: null,
  },
});

export const resetDamageInsurance = (form: UsedCarForm) => ({
  ...form,
  damage: {
    ...form.damage,
    damageDate: '',
    repairFee: '',
    feePayer: null,
    description: '',
    insuranceCompany: null,
    otherInsuranceCompany: '',
    painter: null,
    disassembly: false,
    repair: null,
  },
});

export const resetDamageOtherInsurance = (form: UsedCarForm) => ({
  ...form,
  damage: {
    ...form.damage,
    otherInsuranceCompany: '',
  },
});

export const resetBodyWarranty = (form: UsedCarForm) => ({
  ...form,
  bodyWarranty: {
    ...form.bodyWarranty,
    description: '',
    painter: null,
    repairIsMade: false,
    repair: null,
  },
});

export const resetBodyWarrantyPainter = (form: UsedCarForm) => ({
  ...form,
  bodyWarranty: {
    ...form.bodyWarranty,
    painter: null,
  },
});
