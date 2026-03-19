import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context }: { context: QueryInterface }): Promise<void> {
  // location
  await context.addColumn('used_car_forms', 'location', {
    type: DataTypes.INTEGER,
    allowNull: true,
  });

  // sold
  await context.addColumn('used_car_forms', 'sold', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });

  // handOverDate
  await context.addColumn('used_car_forms', 'handOverDate', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  });
}

export async function down({ context }: { context: QueryInterface }): Promise<void> {
  await context.removeColumn('used_car_forms', 'handOverDate');
  await context.removeColumn('used_car_forms', 'sold');
  await context.removeColumn('used_car_forms', 'location');
}
