import models from '../models/index.js';
const { User } = models;

export const getUserById = async (id: number | string) => {
  return User.findByPk(id);
};

export const getUserByEmail = async (email: string) => {
  return User.findOne({
    where: {
      email,
    },
  });
};
