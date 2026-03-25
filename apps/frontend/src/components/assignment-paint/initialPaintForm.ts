import type { PaintForm } from '../../../../../packages/shared/src/index.js';

export const initialPaintForm: PaintForm = {
  regNum: '',

  front: {
    bumberLeft: false,
    bumberMiddle: false,
    bumberRight: false,
    bonnet: false,
    mirrorLeft: false,
    mirrorRight: false,
    description: '',
  },

  rear: {
    bumberLeft: false,
    bumberMiddle: false,
    bumberRight: false,
    rearlid: false,
    backLeft: false,
    backRight: false,
    description: '',
  },

  top: {
    roofLeft: false,
    roofMiddle: false,
    roofRight: false,
    bonnet: false,
    rearlidTop: false,
    rearFenderLeft: false,
    rearFenderRight: false,
    frontFenderLeft: false,
    frontFenderRight: false,
    description: '',
  },

  left: {
    frontBumber: false,
    rearBumber: false,
    roofRight: false,
    rearFender: false,
    frontFender: false,
    rearDoor: false,
    frontDoor: false,
    sillMiddle: false,
    sillFront: false,
    sillRear: false,
    description: '',
  },

  right: {
    frontBumber: false,
    rearBumber: false,
    roofRight: false,
    rearFender: false,
    frontFender: false,
    rearDoor: false,
    frontDoor: false,
    sillMiddle: false,
    sillFront: false,
    sillRear: false,
    description: '',
  },
};
