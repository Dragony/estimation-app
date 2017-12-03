import Sequelize from 'sequelize';

const sequelize = new Sequelize('estimations', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});

export default sequelize;