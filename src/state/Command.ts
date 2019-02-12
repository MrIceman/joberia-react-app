import {ActionFlags, GlobalState, GlobalStore} from "./GlobalState";

export abstract class StoreCommand {

    constructor(private readonly store = GlobalStore.get()) {
    }


    protected update(state: Partial<GlobalState>, action: ActionFlags) {
        this.store.update(state, action);
    }

}
