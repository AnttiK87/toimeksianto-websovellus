import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context }: { context: QueryInterface }): Promise<void> {
  // regNum
  await context.addColumn('used_car_forms', 'regNum', {
    type: DataTypes.STRING,
    allowNull: false,
  });

  // vin
  await context.addColumn('used_car_forms', 'vin', {
    type: DataTypes.STRING,
    allowNull: false,
  });
}

export async function down({ context }: { context: QueryInterface }): Promise<void> {
  await context.removeColumn('used_car_forms', 'regNum');
  await context.removeColumn('used_car_forms', 'vin');
}
