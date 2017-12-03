import db from './Sequelize.mjs';
import Sequelize from 'sequelize';
import EstimationRow from './EstimationRow.mjs';

const Estimation = db.define('estimation', {
    title: Sequelize.STRING,
    uuid: Sequelize.STRING
});

Estimation.hasMany(EstimationRow, { as: "estimationRow" });

export default Estimation;