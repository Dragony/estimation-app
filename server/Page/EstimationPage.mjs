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
    if(req.body.estimationRow){
        let estimationIdMap = [];
        let newEstimations = [];
        for(let i in req.body.estimationRow) {
            if(!req.body.estimationRow[i].id){
                newEstimations.push(req.body.estimationRow[i]);
            }else{
                estimationIdMap[req.body.estimationRow[i].id] = req.body.estimationRow[i];
            }
        }
        let estimations = await prevEst.getEstimationRow();
        for(let k in estimations){
            if(estimations.hasOwnProperty(k)){
                let estimation = estimations[k];
                estimation.update(estimationIdMap[estimation.id]);
            }
        }
        for(let i in newEstimations){
            let newEstimation = await EstimationRow.create(newEstimations[i]);
            prevEst.addEstimationRow(newEstimation);
        }

    }
    await prevEst.save();

    // Quickfix to reload all the changed data
    prevEst = await findEstimationByUuid(req.params.uuid);
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

async function handleEstimationDeleteRequest(req, res){
    console.log('delete', req.body);
    await EstimationRow.destroy({
        where: {
            id: req.body.id
        }
    });
    res.json({
        status: true
    })
}

export { handleGetRequest, handlePostRequest, handleEstimationDeleteRequest }