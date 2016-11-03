export class Dispatcher {
    constructor(component) {
        this.component = component;
        this.emitter = component.props.emitter;
        this.emit = this.emit.bind(this);
        this.dispose = this.dispose.bind(this);
        this.setState = this.setState.bind(this);
        this.getState = this.getState.bind(this);
    }
    emit(action, data) {
        this.emitter.emit(action, data);
    }
    getState() {
        return this.component.state;
    }
    setState(state) {
        this.component.setState(state);
    }
    dispose() {
        if(this.subscriptions.length) {
            for (subcription in this.subcriptions) {
                this.subcriptions[subcription].dispose();
            }
        }
        else{
            this.subscriptions.dispose();
        }
    }
}