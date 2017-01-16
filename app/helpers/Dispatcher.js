var emitter = require('./Emitter');
var Rx = require('rxjs');
import $ from 'jquery';

export class Dispatcher {
    constructor(component) {
        let {state, componentWillUnmount} = component;
        this.subscriptions = {};
        this.component = component;
        this.emitter = emitter;
        this.emit = this.emit.bind(this);
        this.dispose = this.dispose.bind(this);
        this.setState = this.setState.bind(this);
        this.getState = this.getState.bind(this);
        this.disposeAll.bind(componentWillUnmount);
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
    subscribe(action, callback) {
        this.subscriptions[action] = this.emitter.listen(action, callback);
    }
    pollApi(endpoint, timeout, callback, error) {
        var state$ = Rx.Observable.timer(timeout)
            .switchMap(() => Rx.Observable.fromPromise($.get(endpoint)))
            .repeat() // Repeat when we get a response
            .retry() // Retry if there is an error
            .share(); // Make multiple subscribers share stream

        state$.subscribe(callback);
    }
    dispose(subscription) {
        this.subscriptions[subscription].dispose();
    }
    disposeAll() {
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