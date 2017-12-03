import Sequelize from 'sequelize';

let sequelize;
if(process.env.CLEARDB_DATABASE_URL){
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
        dialect: 'mysql',
        operatorsAliases: false
    });
}else{
    sequelize = new Sequelize('estimations', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    });
}

export default sequelize;