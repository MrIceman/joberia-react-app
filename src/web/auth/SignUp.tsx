import * as React from "react";
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import {BaseView} from "../common/Base";
import {ActionFlags, GlobalState, GlobalStore, StoreListener} from "../../state/GlobalState";
import {AuthCommand} from "../../domain/auth/AuthCommand";

type viewstate = {
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
    firstName: string,
    lastName: string,
} & appstate

type appstate = {
    jwtToken: string,
    debugMessage: string
}

type props = {
    name: string
}

export class SignUpView extends React.Component<{}, viewstate> implements StoreListener<appstate> {

    createFormInput(key: keyof viewstate, type: string, placeholder: string, icon?: string, fluid = true) {
        return <Form.Input fluid={fluid} icon={icon}
                           iconPosition='left'
                           type={type}
                           onChange={(text, value) => {
                               this.setState({...this.state, [key]: value.value})
                           }}
                           placeholder={placeholder}/>;
    }

    render() {
        return (
            <BaseView>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='black' textAlign='center'>

                            Create your Account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                {this.createFormInput('username', 'text', 'username', 'user')}
                                {this.createFormInput('email', 'text', 'email', 'user')}
                                {this.createFormInput('password', 'password', 'password', 'lock')}
                                {this.createFormInput('repeatPassword', 'password', 'repeat password', 'lock')}
                                {this.createFormInput('firstName', 'text', 'first name', 'user')}
                                {this.createFormInput('lastName', 'text', 'last name', 'user')}
                                <Button color='yellow' fluid size='large' inverted={true} onClick={() => {
                                    if (this.state.repeatPassword != this.state.password)
                                        alert('Passwords are not the same');
                                    else if (this.state.password.length < 6)
                                        alert('Please put atleast 6 passwords');
                                    else
                                        new AuthCommand().signUp(this.state.username, this.state.email, 'dev', this.state.firstName, this.state.lastName, this.state.password);
                                }}>
                                    Signup
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </BaseView>
        );
    }

    componentDidMount(): void {
        GlobalStore.get().listen(this);
    }

    componentWillUnmount(): void {
        GlobalStore.get().unlisten(this);
    }

    getAction(): Array<ActionFlags> {
        return [ActionFlags.SIGNUP];
    }

    update(state: Partial<GlobalState>): void {
        this.setState({
            jwtToken: state.jwtToken,
            debugMessage: state.debugMessage
        });

        alert('jwt token: ' + state.jwtToken + " / debugMessage: " + state.debugMessage);
    }
}
