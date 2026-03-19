import type { UsedCarForm, CategorizedRepair, Repair, RepairCategory } from '@shared/index.js';

const pushIfRepair = (
  list: CategorizedRepair[],
  name: string,
  workNeeded: boolean,
  repair: Repair | null,
  category: RepairCategory,
) => {
  if (!workNeeded) return;

  list.push({
    name,
    repair,
    category,
  });
};

export const collectRepairs = (form: UsedCarForm): CategorizedRepair[] => {
  const repairs: CategorizedRepair[] = [];

  console.log('korjaus', form, repairs);

  /* ---------------- GENERAL ---------------- */

  pushIfRepair(repairs, 'Katsastus', form.inspection.needed, form.inspection.inspection, 'general');

  pushIfRepair(repairs, 'Huolto', form.service.needed, form.service.repair, 'general');

  pushIfRepair(repairs, 'Jakohihna', form.timing.beltChangeNeeded, form.timing.repair, 'general');

  pushIfRepair(repairs, 'Jakoketju', form.timing.chainChangeNeeded, form.timing.repair, 'general');

  pushIfRepair(
    repairs,
    'Lämmitin',
    form.otherServiceWork.heater.heaterRepair,
    form.otherServiceWork.heater.repair,
    'general',
  );

  pushIfRepair(
    repairs,
    'Ilmastointi',
    form.otherServiceWork.ac.acRepair,
    form.otherServiceWork.ac.repair,
    'general',
  );

  pushIfRepair(
    repairs,
    'Polttimot',
    form.otherServiceWork.bulbChange.bulbChange,
    form.otherServiceWork.bulbChange.repair,
    'general',
  );

  pushIfRepair(
    repairs,
    'Aurauskulmat',
    form.otherServiceWork.wheelAlignment.wheelAlignment,
    form.otherServiceWork.wheelAlignment.repair,
    'general',
  );

  /* ---------------- TYRES ---------------- */

  pushIfRepair(
    repairs,
    'Tasapainotus',
    form.tyres.balancingNeeded.balancingNeeded,
    form.tyres.balancingNeeded.repair,
    'tyres',
  );

  pushIfRepair(
    repairs,
    'Uudet renkaat',
    form.tyres.newTyres.newTyres,
    form.tyres.newTyres.repair,
    'tyres',
  );

  /* ---------------- BODY ---------------- */

  pushIfRepair(repairs, 'Tuulilasi', form.windshield.change, form.windshield.repair, 'body');

  pushIfRepair(repairs, 'Vauriokorjaus', form.damage.damaged, form.damage.repair, 'body');

  pushIfRepair(repairs, 'Koritakuu', form.bodyWarranty.enabled, form.bodyWarranty.repair, 'body');

  /* ---------------- DYNAMIC ---------------- */

  form.otherServiceWork.otherRepairs.forEach((r) => {
    pushIfRepair(repairs, r.otherRepair, true, r.repair, 'general');
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

  return repair.reservation.trim() !== '';
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
