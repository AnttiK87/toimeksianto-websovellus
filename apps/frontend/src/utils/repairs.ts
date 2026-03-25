import type {
  UsedCarForm,
  CategorizedRepair,
  Repair,
  RepairCategory,
} from '../../../../packages/shared/src/index.js';

const pushIfRepair = (
  list: CategorizedRepair[],
  name: string,
  workNeeded: boolean,
  repair: Repair | null,
  category: RepairCategory,
  repairPath: string,
  formId: number | undefined,
) => {
  if (!workNeeded) return;
  if (!formId) return;

  list.push({
    name,
    category,
    repair,
    repairPath,
    formId,
  });
};

export const collectRepairs = (form: UsedCarForm): CategorizedRepair[] => {
  const repairs: CategorizedRepair[] = [];

  /* ---------------- GENERAL ---------------- */

  pushIfRepair(
    repairs,
    'Katsastus',
    form.inspection.needed,
    form.inspection.inspection,
    'general',
    'inspection.inspection',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Huolto',
    form.service.needed,
    form.service.repair,
    'general',
    'service.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Jakohihna',
    form.timing.beltChangeNeeded,
    form.timing.repair,
    'general',
    'timing.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Jakoketju',
    form.timing.chainChangeNeeded,
    form.timing.repair,
    'general',
    'timing.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Lämmitin',
    form.otherServiceWork.heater.heaterRepair,
    form.otherServiceWork.heater.repair,
    'general',
    'otherServiceWork.heater.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Ilmastointi',
    form.otherServiceWork.ac.acRepair,
    form.otherServiceWork.ac.repair,
    'general',
    'otherServiceWork.ac.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Polttimot',
    form.otherServiceWork.bulbChange.bulbChange,
    form.otherServiceWork.bulbChange.repair,
    'general',
    'otherServiceWork.bulbChange.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Pyöränkulmat',
    form.otherServiceWork.wheelAlignment.wheelAlignment,
    form.otherServiceWork.wheelAlignment.repair,
    'general',
    'otherServiceWork.wheelAlignment.repair',
    form.id,
  );

  /* ---------------- TYRES ---------------- */

  pushIfRepair(
    repairs,
    'Tasapainotus',
    form.tyres.balancingNeeded.balancingNeeded,
    form.tyres.balancingNeeded.repair,
    'tyres',
    'tyres.balancingNeeded.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Uudet renkaat',
    form.tyres.newTyres.newTyres,
    form.tyres.newTyres.repair,
    'tyres',
    'tyres.newTyres.repair',
    form.id,
  );

  /* ---------------- BODY ---------------- */

  pushIfRepair(
    repairs,
    'Tuulilasi',
    form.windshield.change,
    form.windshield.repair,
    'body',
    'windshield.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Vauriokorjaus',
    form.damage.damaged,
    form.damage.repair,
    'body',
    'damage.repair',
    form.id,
  );

  pushIfRepair(
    repairs,
    'Koritakuu',
    form.bodyWarranty.enabled,
    form.bodyWarranty.repair,
    'body',
    'bodyWarranty.repair',
    form.id,
  );

  /* ---------------- DYNAMIC ---------------- */

  form.otherServiceWork.otherRepairs.forEach((r, index) => {
    pushIfRepair(
      repairs,
      r.otherRepair,
      true,
      r.repair,
      'general',
      `otherServiceWork.otherRepairs[${index}].repair`,
      form.id,
    );
  });

  return repairs;
};

export const groupRepairsByCategory = (repairs: CategorizedRepair[]) => ({
  general: repairs.filter((r) => r.category === 'general'),
  tyres: repairs.filter((r) => r.category === 'tyres'),
  body: repairs.filter((r) => r.category === 'body'),
});

export const isRepairHandled = (repair: Repair | null): boolean => {
  if (!repair) return false;

  return repair.reservation !== '';
};

export const isRepairReady = (repair: Repair | null): boolean => {
  if (!repair) return false;

  return repair.ready === true;
};

export const isHandledRepair = (r: CategorizedRepair) => isRepairHandled(r.repair);

export const isReadyRepair = (r: CategorizedRepair) => isRepairReady(r.repair);

export const getHandledRepairs = (repairs: CategorizedRepair[]): CategorizedRepair[] => {
  return repairs.filter(isHandledRepair);
};

export const getReadyRepairs = (repairs: CategorizedRepair[]): CategorizedRepair[] => {
  return repairs.filter(isReadyRepair);
};

export const getPendingRepairs = (repairs: CategorizedRepair[]): CategorizedRepair[] => {
  return repairs.filter((r) => !isReadyRepair(r));
};

export const getRepairStats = (repairs: CategorizedRepair[]) => {
  const total = repairs.length;
  const handled = getHandledRepairs(repairs).length;
  const ready = getReadyRepairs(repairs).length;

  return {
    total,
    handled,
    ready,
    pending: total - ready,
    progress: total === 0 ? 0 : Math.round((ready / total) * 100),
  };
};
