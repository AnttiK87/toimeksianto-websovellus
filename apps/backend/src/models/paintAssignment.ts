import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../utils/db.js';
import type { PaintForm } from '../../../../packages/shared/src/dist/index.js';

interface PaintAssignmentAttributes {
  id: number;
  assignmentId: number;
  regNum: string;

  front: PaintForm['front'];
  rear: PaintForm['rear'];
  top: PaintForm['top'];
  left: PaintForm['left'];
  right: PaintForm['right'];

  createdAt?: Date;
  updatedAt?: Date;
}

interface PaintAssignmentCreationAttributes extends Optional<PaintAssignmentAttributes, 'id'> {}

class PaintAssignmentForm
  extends Model<PaintAssignmentAttributes, PaintAssignmentCreationAttributes>
  implements PaintAssignmentAttributes
{
  declare id: number;
  declare assignmentId: number;
  declare regNum: string;

  declare front: PaintForm['front'];
  declare rear: PaintForm['rear'];
  declare top: PaintForm['top'];
  declare left: PaintForm['left'];
  declare right: PaintForm['right'];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

PaintAssignmentForm.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    regNum: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    front: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    rear: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    top: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    left: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    right: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'paint_assignments',
    timestamps: true,
  },
);

export default PaintAssignmentForm;
