export class StateManager<T> {
    constructor(private initialData: T) {
    }

    get state() {
        return this.initialData;
    }
}
