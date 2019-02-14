import {StoreCommand} from "../../state/Command";
import {GatewayImpl} from "../../data/GatewayImpl";
import {ActionFlags} from "../../state/GlobalState";

export class JobCommands extends StoreCommand {

    constructor(
        private readonly gateway = GatewayImpl.getInstance()
    ) {
        super();
    }

    getAllJobs(): void {
        this.gateway.getAllJobs().then((result) => {
            this.update({jobs: result}, ActionFlags.JOB_LIST);
        });
    }
}
