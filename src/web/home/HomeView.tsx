import * as React from 'react';
import {Action, ActionFlags, GlobalState, GlobalStore, Job, StoreListener, User} from "../../state/GlobalState";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

type state = {
    isLoggedIn: boolean,
    jobs: Array<Job>,
    newestJobs: Array<Job>,
    users: Array<User>,
    message: string,

}

export class HomeView extends React.Component<{}, state> implements StoreListener<state> {
    private clickCounter = 0;

    constructor(props) {
        super(props);
        this.state = {message: 'Not Clicked anything yet..', isLoggedIn: false, jobs: [], newestJobs: [], users: []};
        this.getAction = this.getAction.bind(this);


    }

    componentDidMount() {
        GlobalStore.get().listen(this);
    }


    componentWillUnmount(): void {
        GlobalStore.get().unlisten(this);
    }

    getAction(): Array<ActionFlags> {
        return [ActionFlags.DEBUG];
    }

    update(state: Partial<GlobalState>): void {
        console.log('got called with update')
        this.setState({
            message: state.debugMessage
        });
    }

    render() {
        return <div><h1>Hello world! I need to tell you something: {this.state.message} </h1><br/>
            <Button onClick={() => {
                this.clickCounter++;
                GlobalStore.get().update({debugMessage: 'Clicked ' + this.clickCounter}, ActionFlags.DEBUG);
            }}>Click Me!</Button>
        </div>
    }
}
