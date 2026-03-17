// migrations/20260317-add-virtual-columns-to-used-car-forms.ts
import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context }: { context: QueryInterface }): Promise<void> {
  // Lisää virtuaaliset sarakkeet
  await context.sequelize.query(`
    ALTER TABLE used_car_forms
    ADD COLUMN regNum_virtual VARCHAR(20) 
      GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(car, '$.regNum'))) STORED,
    ADD COLUMN vin_virtual VARCHAR(50) 
      GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(car, '$.vin'))) STORED
  `);

  // Lisää indeksit
  await context.addIndex('used_car_forms', ['regNum_virtual'], {
    name: 'idx_regNum_virtual',
  });
  await context.addIndex('used_car_forms', ['vin_virtual'], {
    name: 'idx_vin_virtual',
  });
}

export async function down({ context }: { context: QueryInterface }): Promise<void> {
  // Poista indeksit
  await context.removeIndex('used_car_forms', 'idx_regNum_virtual');
  await context.removeIndex('used_car_forms', 'idx_vin_virtual');

  // Poista virtuaaliset sarakkeet
  await context.sequelize.query(`
    ALTER TABLE used_car_forms
    DROP COLUMN regNum_virtual,
    DROP COLUMN vin_virtual
  `);
}
