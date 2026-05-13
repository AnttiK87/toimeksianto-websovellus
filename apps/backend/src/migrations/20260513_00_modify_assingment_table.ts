import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context }: { context: QueryInterface }): Promise<void> {
  // info
  await context.addColumn('used_car_forms', 'additionalInfo', {
    type: DataTypes.TEXT,
    allowNull: true,
  });
}

export async function down({ context }: { context: QueryInterface }): Promise<void> {
  await context.removeColumn('used_car_forms', 'additionalInfo');
}
