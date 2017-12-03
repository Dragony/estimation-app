import db from '../Db/Sequelize.mjs';

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        db.close();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });