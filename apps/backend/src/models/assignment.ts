import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db.js';

interface UsedCarFormAttributes {
  id: number;
  date: string;
  salesMan: number | null;
  assigneer: string;

  car: object; // { makeAndModel, regNum, mileage, regDate }
  warranty: object;
  serviceHistory: object;
  inspection: object;
  electric: object;
  tyres: object;
  service: object;
  timing: object;
  otherServiceWork: object;
  windshield: object;
  damage: object;
  bodyWarranty: object;

  createdAt?: Date;
  updatedAt?: Date;
}

// id ei ole pakollinen create-vaiheessa
interface UsedCarFormCreationAttributes extends Optional<UsedCarFormAttributes, 'id'> {}

class UsedCarForm
  extends Model<UsedCarFormAttributes, UsedCarFormCreationAttributes>
  implements UsedCarFormAttributes
{
  public id!: number;
  public date!: string;
  public salesMan!: number | null;
  public assigneer!: string;

  public car!: object;
  public warranty!: object;
  public serviceHistory!: object;
  public inspection!: object;
  public electric!: object;
  public tyres!: object;
  public service!: object;
  public timing!: object;
  public otherServiceWork!: object;
  public windshield!: object;
  public damage!: object;
  public bodyWarranty!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UsedCarForm.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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

export default UsedCarForm;
