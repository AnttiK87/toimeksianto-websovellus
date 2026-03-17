import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context }: { context: QueryInterface }): Promise<void> {
  await context.createTable('paint_assignments', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'used_car_forms',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      unique: true,
    },
    regNum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    front: { type: DataTypes.JSON, allowNull: false },
    rear: { type: DataTypes.JSON, allowNull: false },
    top: { type: DataTypes.JSON, allowNull: false },
    left: { type: DataTypes.JSON, allowNull: false },
    right: { type: DataTypes.JSON, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });

  await context.addIndex('paint_assignments', ['assignmentId'], {
    name: 'idx_paint_assignments_assignmentId',
  });
}

export async function down({ context }: { context: QueryInterface }): Promise<void> {
  await context.dropTable('paint_assignments');
}
