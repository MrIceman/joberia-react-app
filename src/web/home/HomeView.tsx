import * as React from 'react';
import {ActionFlags, GlobalState, GlobalStore, StoreListener,} from "../../state/GlobalState";
import {Job, User} from "../../entity/Entities";
import {TopMenu} from "../TopMenu";
import {Segment, Container, Grid, Header, Image, Button, SemanticCOLORS} from "semantic-ui-react";
import {HeaderHero} from "./HeaderHero";
import {SHORT_DESCRIPTION, TITLE} from "../../Settings";
import {FooterHero} from "../common/Footer";

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
        console.log('got called with update');
        this.setState({
            message: state.debugMessage
        });
    }

    render() {
        return <div><Segment textAlign={"center"} vertical={true} inverted={true}>
            <TopMenu/>
            <HeaderHero mobile={false} title={TITLE} shortDescription={SHORT_DESCRIPTION}/>
        </Segment>
            <Segment style={{padding: '8em 0em'}} color={'grey'} vertical={true} inverted={false}>
                <Grid container={true} stackable={true} verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h3' style={{fontSize: '2em'}}>
                                Only what you need!
                            </Header>
                            <p style={{fontSize: '1.33em'}}>
                                We believe a Job Platform should serve the company and the engineer the most.
                                Therefore you will only find Machine Learning Engineers and openings on this website.
                            </p>
                            <Header as='h3' style={{fontSize: '2em'}}>
                                Sorry recruiters!
                            </Header>
                            <p style={{fontSize: '1.33em'}}>
                                This platform is exclusive to the companies that want to hire the engineers.
                                We only accept first-hand job openings and engineers.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <Image size='large' src='robot.svg'/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Button size='huge'>Check the Experts!</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <FooterHero/>
        </div>
    }
}
