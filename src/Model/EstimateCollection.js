class EstimateCollection{
    constructor(elements, listener){
        this.elements = elements || [];
        if(this.elements.length > 0){
            this.elements.forEach(el => this.addListenersToElement(el));
        }
        this.listener = listener;
    }
    all(){
        return this.elements;
    }
    addElement(element){
        this.addListenersToElement(element);
        this.elements.push(element);
        this.updateListener();
    }
    addListenersToElement(element){
        element.addListener('update', this.updateListener.bind(this));
        element.addListener('remove', this.removeListener.bind(this));
    }
    updateListener(){
        this.listener && this.listener();
    }
    removeListener(el){
        let idx = this.elements.indexOf(el);
        this.elements.splice(idx, 1);
        this.updateListener();
    }
    getTotalEstimated(){
        let totalEst = 0;
        this.elements.map(el => totalEst += el.state.totalEst);
        return totalEst;
    }
}

export default EstimateCollection;