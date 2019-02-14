import {StoreCommand} from "../../state/Command";
import {GatewayImpl} from "../../data/GatewayImpl";
import {ActionFlags} from "../../state/GlobalState";
import {PLATFORM_ID} from "../../Settings";

export class AuthCommand extends StoreCommand {

    constructor(
        private readonly gateway = GatewayImpl.getInstance()
    ) {
        super();
    }

    signUp(username, email, role, firstName, lastName, password): void {
        this.gateway.signUp(username, email, role, firstName, lastName, PLATFORM_ID, password).then(
            (result) => {
                this.update({jwtToken: result}, ActionFlags.SIGNUP);
            },
            (error) => {
                this.update({debugMessage: error}, ActionFlags.SIGNUP);
            });
    }
}
