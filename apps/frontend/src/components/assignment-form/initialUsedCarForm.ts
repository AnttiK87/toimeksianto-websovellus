const today = new Date().toISOString().split('T')[0];

import type { UsedCarForm } from '@shared/index.js';

export const initialUsedCarForm: UsedCarForm = {
  date: today,
  salesMan: null,
  assigneer: '',

  car: {
    makeAndModel: '',
    regNum: '',
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
    balancingNeeded: false,
    balancingWheels: null,
    newTyres: false,
    tyreType: null,
    tyreSize: '',
    usedChecked: false,
    usedState: null,
    storage: '',
    usedTyre: '',
  },

  service: {
    needed: false,
    type: null,
    selected: [],
  },

  timing: {
    type: null,
    beltChangeKm: '',
    beltChangeTime: '',
    lastBeltChangeKm: '',
    lastBeltChangeTime: '',
    beltChangeNeeded: null,
    chainChangeNeeded: null,
  },

  workshop: {
    heater: null,
    heaterRepair: null,
    ac: null,
    acRepair: null,
    acService: null,
    bulbChange: false,
    bulbs: '',
    wheelAlignment: false,
    otherRepairs: '',
  },

  windshield: {
    change: false,
    workshop: null,
    subcontractor: '',
    insurance: false,
    insuranceCompany: null,
    otherInsuranceCompany: '',
    damageDate: '',
    changeFee: '',
    feePayer: null,
  },

  damage: {
    damaged: false,
    description: '',
    insuranceCompany: null,
    repairType: null,
    painter: null,
    disassembly: false,
  },

  bodyWarranty: {
    enabled: false,
    description: '',
    repairIsMade: false,
  },
};
