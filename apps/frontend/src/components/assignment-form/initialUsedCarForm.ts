const today = new Date().toISOString().split('T')[0];

import type { UsedCarForm } from '../../../../../packages/shared/src/index.js';

export const initialUsedCarForm: UsedCarForm = {
  date: today,
  salesMan: null,
  assigneer: '',
  location: null,
  sold: false,
  handOverDate: '',
  regNum: '',
  vin: '',

  car: {
    makeAndModel: '',

    mileage: '',
    regDate: '',
  },

  warranty: {
    enabled: false,
    until: '',
  },

  serviceHistory: {
    lastService: '',
    lastServiceDate: '',
    nextService: '',
    nextServiceDate: '',
  },

  inspection: {
    date: '',
    needed: false,
    inspection: null,
  },

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

  tyres: {
    summer: '',
    winter: '',
    winterType: null,
    balancingNeeded: {
      balancingNeeded: false,
      balancingWheels: null,
      repair: null,
    },
    newTyres: {
      newTyres: false,
      tyreType: null,
      difference: false,
      tyreSize1: '',
      tyreSize2: '',
      usedState: null,
      storage: '',
      usedTyre: '',
      ordered: null,
      tyreSize3: '',
      tyreSize4: '',
      usedState2: null,
      storage2: '',
      usedTyre2: '',
      ordered2: null,
      repair: null,
    },
  },

  service: {
    needed: false,
    type: null,
    selected: [],
    repair: null,
  },

  timing: {
    type: null,
    beltChangeKm: '',
    beltChangeTime: '',
    lastBeltChangeKm: '',
    lastBeltChangeTime: '',
    beltChangeNeeded: false,
    chainChangeNeeded: false,
    repair: null,
  },

  otherServiceWork: {
    heater: {
      heater: null,
      heaterRepair: false,
      repair: null,
    },
    ac: {
      ac: null,
      acRepair: false,
      acService: null,
      repair: null,
    },
    bulbChange: {
      bulbChange: false,
      bulbs: '',
      repair: null,
    },
    wheelAlignment: {
      wheelAlignment: false,
      repair: null,
    },
    otherRepairs: [],
  },

  windshield: {
    change: false,
    camera: false,
    heated: false,
    hud: false,
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

  damage: {
    damaged: false,
    repairType: null,
    insuranceCompany: null,
    otherInsuranceCompany: '',
    damageDate: '',
    repairFee: '',
    damageId: '',
    feePayer: null,
    painter: null,
    disassembly: false,
    repair: null,
  },

  bodyWarranty: {
    enabled: false,
    repairIsMade: false,
    painter: null,
    repair: null,
  },
};
