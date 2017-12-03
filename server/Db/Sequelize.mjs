import Sequelize from 'sequelize';

if(process.env.CLEARDB_DATABASE_URL){
    const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
        dialect: 'mysql',
        operatorsAliases: false
    });
}else{
    const sequelize = new Sequelize('estimations', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    });
}

export default sequelize;