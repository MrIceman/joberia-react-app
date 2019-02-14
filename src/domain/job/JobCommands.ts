import {StoreCommand} from "../../state/Command";
import {GatewayImpl} from "../../data/GatewayImpl";
import {Job} from "../../entity/Entities";

export class JobCommands extends StoreCommand {

    constructor(
        private readonly gateway = GatewayImpl.getInstance()
    ) {
        super();
    }

    getAllJobs(): Promise<Array<Job>> {
        return this.gateway.getAllJobs();
    }
}
