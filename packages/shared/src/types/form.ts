export interface UsedCarForm {
  date: string;
  salesMan: number | null;
  assigneer: string;

  car: {
    makeAndModel: string;
    regNum: string;
    mileage: string;
    regDate: string;
  };

  warranty: {
    enabled: boolean;
    until: string;
  };

  serviceHistory: {
    lastService: string;
    lastServiceDate: string;
    nextService: string;
    nextServiceDate: string;
  };

  inspection: {
    date: string;
    needed: boolean;
  };

  electric: {
    type: number | null;
    acPower: string;
    dcPower: string;
    capacityGross: string;
    capacityNet: string;
    range: string;
    chargeCable: string;
    standard: number | null;
  };

  tyres: {
    summer: string;
    winter: string;
    winterType: number | null;

    balancingNeeded: boolean;
    balancingWheels: number | null;

    newTyres: boolean;
    tyreType: number | null;
    tyreSize: string;

    usedChecked: boolean;
    usedState: number | null;
    storage: string;
    usedTyre: string;
  };

  service: {
    needed: boolean;
    type: number | null;
    selected: string[];
  };

  timing: {
    type: number | null;
    beltChangeKm: string;
    beltChangeTime: string;
    lastBeltChangeKm: string;
    lastBeltChangeTime: string;
    beltChangeNeeded: number | null;
    chainChangeNeeded: number | null;
  };

  workshop: {
    heater: number | null;
    heaterRepair: number | null;

    ac: number | null;
    acRepair: number | null;
    acService: number | null;

    bulbChange: boolean;
    bulbs: string;

    wheelAlignment: boolean;
    otherRepairs: string;
  };

  windshield: {
    change: boolean;
    workshop: number | null;
    subcontractor: string;
    insurance: boolean;
    insuranceCompany: number | null;
    otherInsuranceCompany: string;
    damageDate: string;
    changeFee: string;
    feePayer: number | null;
  };

  damage: {
    damaged: boolean;
    description: string;
    insuranceCompany: number | null;
    repairType: number | null;
    painter: number | null;
    disassembly: boolean;
  };

  bodyWarranty: {
    enabled: boolean;
    description: string;
    repairIsMade: boolean;
  };
}
