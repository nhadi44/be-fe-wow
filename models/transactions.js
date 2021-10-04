'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.users, {
        as: 'users',
        foreignKey: {
          name: 'idUser'
        }
      })
    }
  };
  transactions.init({
    transferProof: DataTypes.STRING,
    remainingActive: DataTypes.INTEGER,
    userStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};