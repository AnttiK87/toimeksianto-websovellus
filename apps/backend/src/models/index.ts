import User from './user.js';
import Session from './session.js';
import UsedCarAssignment from './assignment.js';
import PaintAssignment from './paintAssignment.js';

UsedCarAssignment.hasOne(PaintAssignment, { foreignKey: 'assignmentId', onDelete: 'CASCADE' });
PaintAssignment.belongsTo(UsedCarAssignment, { foreignKey: 'assignmentId' });

export default {
  User,
  Session,
  UsedCarAssignment,
  PaintAssignment,
};
