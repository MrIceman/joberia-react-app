import * as React from "react";
import {Button, Container, Header, Icon, Segment} from "semantic-ui-react";

type props = {
    mobile: boolean,
    title: string,
    shortDescription: string,
}

export class HeaderHero extends React.Component<props> {
    render() {
        return (<Container text={true}>
            <Header
                as='h1'
                color={'yellow'}
                content={this.props.title}
                inverted={true}
                style={{
                    fontSize: this.props.mobile ? '2em' : '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: this.props.mobile ? '1.5em' : '3em',
                }}
            />
            <Header
                as='h2'
                content={this.props.shortDescription}
                inverted={true}
                style={{
                    fontSize: this.props.mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginTop: this.props.mobile ? '0.5em' : '1.5em',
                }}
            />
            <Segment inverted={true}>
                <Button size='huge' color="yellow" inverted={true}>
                    See Jobs
                    <Icon name={"arrow right"}/>
                </Button>
            </Segment>
        </Container>);
    }
}
