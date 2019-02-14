import * as React from "react";
import {Container, Grid, Header, List, Segment} from "semantic-ui-react";

export class FooterHero extends React.Component{

    render() {
        return ( <Segment inverted={true} vertical={true} style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided={true} inverted={true} stackable={true}>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='About' />
                            <List link inverted>
                                <List.Item as='a'>Contact Us</List.Item>
                                <List.Item as='a'>Blog</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Services' />
                            <List link inverted>
                                <List.Item as='a'>Job Alert</List.Item>
                                <List.Item as='a'>Post Job</List.Item>
                                <List.Item as='a'>Download App</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>
                                We'll notify you!
                            </Header>
                            <p>
                                Subscribe to the newsletter and / or download  the app to get 24/7 live push notifications when something exciting happens (e.g. a Job comes up!)
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>);
    }

}
