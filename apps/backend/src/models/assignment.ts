import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.js';
import type { UsedCarForm } from '@shared/index.js';

type UsedCarFormDB = Omit<UsedCarForm, 'id'> & {
  id: number;
};

interface UsedCarFormAttributes extends UsedCarFormDB {
  createdAt?: Date;
  updatedAt?: Date;
}

interface UsedCarFormCreationAttributes extends Optional<UsedCarFormAttributes, 'id'> {}

class UsedCarAssignment
  extends Model<UsedCarFormAttributes, UsedCarFormCreationAttributes>
  implements UsedCarFormAttributes
{
  declare id: number;
  declare date: string;
  declare salesMan: number | null;
  declare assigneer: string;

  declare car: UsedCarForm['car'];
  declare warranty: UsedCarForm['warranty'];
  declare serviceHistory: UsedCarForm['serviceHistory'];
  declare inspection: UsedCarForm['inspection'];
  declare electric: UsedCarForm['electric'];
  declare tyres: UsedCarForm['tyres'];
  declare service: UsedCarForm['service'];
  declare timing: UsedCarForm['timing'];
  declare otherServiceWork: UsedCarForm['otherServiceWork'];
  declare windshield: UsedCarForm['windshield'];
  declare damage: UsedCarForm['damage'];
  declare bodyWarranty: UsedCarForm['bodyWarranty'];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UsedCarAssignment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    tableName: 'used_car_forms',
    sequelize,
  },
);

export default UsedCarAssignment;
