import Serializer from 'sequelize-to-json';
import Estimation from './../Db/Estimation.mjs';
import EstimationRow from './../Db/EstimationRow.mjs';

const schema = {
    include: ['@all', 'estimationRow'],
    assoc: {
        estimationRow: {
            include: ['minEst', 'optEst', 'maxEst', 'description', 'id']
        }
    }
};

function serialize(EstimationData){
    let serializer = new Serializer(Estimation, schema);
    return serializer.serialize(EstimationData, Estimation);
}

function serializeMany(EstimationsData){
    return Serializer.serializeMany(EstimationsData, Estimation, schema);
}

export { serialize, serializeMany };