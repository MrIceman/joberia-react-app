import * as React from "react";
import {Segment} from "semantic-ui-react";
import {FooterHero} from "./Footer";
import {TopMenu} from "./TopMenu";

type props = {
    hero?: React.Component | React.ComponentElement<any, any>
}

export class BaseView extends React.Component<props> {

    render() {
        return (
            <React.Fragment>
                <Segment textAlign={"center"} vertical={true} inverted={true}>
                    <TopMenu/>
                    {this.props.hero}
                </Segment>
                <Segment style={{padding: '8em 0em'}} color={'grey'} vertical={true} inverted={false}>
                    {this.props.children}
                </Segment>

                <FooterHero/>
            </React.Fragment>
        );
    }
}
