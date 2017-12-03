import Estimation from './../Db/Estimation.mjs';
import EstimationRow from './../Db/EstimationRow.mjs';
import { serialize } from './../Serializer/Estimation.mjs';

async function handleGetRequest(req, res){
    let prevEst = await findEstimationByUuid(req.params.uuid);
    if(!prevEst){
        prevEst = await Estimation.create({
            uuid: req.params.uuid
        })
    }
    res.json(serialize(prevEst));
}

async function handlePostRequest(req, res){
    let prevEst = await findEstimationByUuid(req.params.uuid);
    if(!prevEst){
        res.status(404).send("Not found");
        return;
    }
    if(req.body.title){
        prevEst.title = req.body.title;
    }
    req.body.estimations.forEach(async function(estimationData){
        let estimationModel;
        if(estimationData.id){
            estimationModel = await EstimationRow.findById(estimationData.id);
            if(estimationModel){
                estimationModel.update(estimationData);
            }
        }
        if(!estimationModel){
            estimationData.estimationId = prevEst.id;
            estimationModel = await EstimationRow.create(estimationData);
        }
        await estimationModel.save();
    });
    prevEst.save();
    res.json(serialize(prevEst));
}

async function findEstimationByUuid(uuid){
    return await Estimation.findOne({
        where: {
            uuid: uuid
        },
        include: {
            model: EstimationRow,
            as: 'estimationRow'
        }
    });
}

export { handleGetRequest, handlePostRequest }