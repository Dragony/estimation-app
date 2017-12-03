import 'whatwg-fetch';

class Backend{
    static async getEstimationState(uuid){
        let res = await fetch('/api/' + uuid);
        return res.json();
    }
    static async postEstimationState(uuid, data){
        let res = await fetch('/api/' + uuid, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(data)
        });
        return res.json();
    }
    static async deleteEstimation(json){
        let res = await fetch('/api/delete-estimation', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(json)
        });
        return res.json();
    }
}

export default Backend;