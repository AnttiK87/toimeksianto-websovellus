export interface UsedCarForm {
  id?: number;
  date: string;
  salesMan: number | null;
  assigneer: string;

  car: {
    makeAndModel: string;
    regNum: string;
    vin: string;
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
    inspection: Inspection | null;
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

    balancingNeeded: {
      balancingNeeded: boolean;
      balancingWheels: number | null;
      repair: Repair | null;
    };

    newTyres: {
      newTyres: boolean;
      tyreType: number | null;
      tyreSize: string;
      usedChecked: boolean;
      usedState: number | null;
      storage: string;
      usedTyre: string;
      repair: Repair | null;
    };
  };

  service: {
    needed: boolean;
    type: number | null;
    selected: string[];
    repair: Repair | null;
  };

  timing: {
    type: number | null;
    beltChangeKm: string;
    beltChangeTime: string;
    lastBeltChangeKm: string;
    lastBeltChangeTime: string;
    beltChangeNeeded: boolean;
    chainChangeNeeded: boolean;
    repair: Repair | null;
  };

  otherServiceWork: {
    heater: {
      heater: number | null;
      heaterRepair: boolean;
      repair: Repair | null;
    };

    ac: {
      ac: number | null;
      acRepair: boolean;
      acService: number | null;
      repair: Repair | null;
    };
    bulbChange: {
      bulbChange: boolean;
      bulbs: string;
      repair: Repair | null;
    };
    wheelAlignment: {
      wheelAlignment: boolean;
      repair: Repair | null;
    };
    otherRepairs: OtherRepair[];
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
    repair: Repair | null;
  };

  damage: {
    damaged: boolean;
    damageDate: string;
    repairType: number | null;
    repairFee: string;
    damageId: string;
    feePayer: number | null;
    insuranceCompany: number | null;
    otherInsuranceCompany: string;
    painter: number | null;
    disassembly: boolean;
    repair: Repair | null;
  };

  bodyWarranty: {
    enabled: boolean;
    repairIsMade: boolean;
    repair: Repair | null;
    painter: number | null;
  };
}

export interface Repair {
  reservation: string;
  workorder: string;
  ready: boolean;
}

export interface Inspection {
  reservation: string;
  ready: boolean;
}

export interface OtherRepair {
  otherRepair: string;
  repair: Repair | null;
}

export interface VehiclePdfData {
  regNumber: string;
  mileage: string;
  firstRegistration: string;
  nextInspection: string;
  model: string;
}

export interface VehiclePdfData {
  regNumber: string;
  mileage: string;
  firstRegistration: string;
  nextInspection: string;
  model: string;
}

export interface AssignmentResponse {
  data: UsedCarForm | undefined;
  message: string;
}

export interface PaintAssignmentResponse {
  data: PaintForm | undefined;
  message: string;
}

export interface BasicResponse {
  message: string;
}

export interface PaintForm {
  id?: number;
  assignmentId?: number;
  regNum: string;
  front: {
    bumberLeft: boolean;
    bumberMiddle: boolean;
    bumberRight: boolean;
    bonnet: boolean;
    mirrorLeft: boolean;
    mirrorRight: boolean;
    description: string;
  };
  rear: {
    bumberLeft: boolean;
    bumberMiddle: boolean;
    bumberRight: boolean;
    rearlid: boolean;
    backLeft: boolean;
    backRight: boolean;
    description: string;
  };
  top: {
    roofLeft: boolean;
    roofMiddle: boolean;
    roofRight: boolean;
    bonnet: boolean;
    rearlidTop: boolean;
    rearFenderLeft: boolean;
    rearFenderRight: boolean;
    frontFenderLeft: boolean;
    frontFenderRight: boolean;
    description: string;
  };
  left: {
    frontBumber: boolean;
    rearBumber: boolean;
    roofRight: boolean;
    rearFender: boolean;
    frontFender: boolean;
    rearDoor: boolean;
    frontDoor: boolean;
    sillMiddle: boolean;
    sillFront: boolean;
    sillRear: boolean;
    description: string;
  };
  right: {
    frontBumber: boolean;
    rearBumber: boolean;
    roofRight: boolean;
    rearFender: boolean;
    frontFender: boolean;
    rearDoor: boolean;
    frontDoor: boolean;
    sillMiddle: boolean;
    sillFront: boolean;
    sillRear: boolean;
    description: string;
  };
}

export type Step = 'form' | 'paint';
