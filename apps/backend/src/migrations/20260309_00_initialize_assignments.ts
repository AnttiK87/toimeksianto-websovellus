import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context }: { context: QueryInterface }): Promise<void> {
  await context.createTable('used_car_forms', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesMan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigneer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    warranty: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    serviceHistory: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    inspection: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    electric: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    tyres: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    service: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    timing: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    otherServiceWork: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    windshield: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    damage: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    bodyWarranty: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
}

export async function down({ context }: { context: QueryInterface }): Promise<void> {
  await context.dropTable('used_car_forms');
}
