import * as React from "react";
import {Route, Switch} from "react-router";
import {HomeView} from "./home/HomeView";
import {SignUpView} from "./auth/SignUp";

export class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact={true} path={'/'} component={HomeView}/>
                <Route exact={true} path={'/register'} component={SignUpView}/>
            </Switch>
        );
    }
}
