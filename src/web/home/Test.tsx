import * as React from 'react';
import {Action, ActionFlags, GlobalStore, Job, StoreListener, User} from "../../state/GlobalState";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

type state = {
    isLoggedIn: boolean,
    jobs: Array<Job>,
    newestJobs: Array<Job>,
    users: Array<User>,
    message: string,
    clickCounter: number;

}

export class TestView extends React.Component<{}, state> {
    private clickCounter = 0;

    constructor(props) {
        super(props);
    }

    render() {
        return <div>hi</div>
    }
}
