import db from '../Db/Sequelize.mjs';
import estimation from '../Db/Estimation.mjs';
import estimationRow from '../Db/EstimationRow.mjs';

const args = process.argv.slice(2);

db.sync({ force: args[0] && args[0] === 'true' }).then(db.close.bind(db));