import * as React from 'react';
import {Action, ActionFlags, Job, StoreListener, User} from "../state/GlobalState";

type state = {
    isLoggedIn: boolean,
    jobs: Array<Job>,
    newestJobs: Array<Job>,
    users: Array<User>,

}

export class HomeView extends React.Component implements StoreListener<state> {
    getAction(): Action {
        return [ActionFlags.USER_LIST, ActionFlags.JOB_LIST];
    }

    update(state: state): void {
    }

    render() {
        return <h1>Hello world!</h1>
    }
}
