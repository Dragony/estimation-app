import db from './Sequelize.mjs';
import Sequelize from 'sequelize';
//import Estimation from './Estimation.mjs';

const EstimationRow = db.define('estimationRow', {
    minEst: Sequelize.FLOAT,
    optEst: Sequelize.FLOAT,
    maxEst: Sequelize.FLOAT,
    description: Sequelize.STRING,
    estimationId: {
        type: Sequelize.INTEGER,
        //model: Estimation,
        key: 'id'
    }
});

//EstimationRow.belongsTo(Estimation);

export default EstimationRow;