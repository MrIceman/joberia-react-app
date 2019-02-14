import * as React from "react";
import {Button, Container, Header, Icon, Image, Menu, Segment, SemanticICONS} from "semantic-ui-react";
import {Link} from "react-router-dom";

export class TopMenu extends React.Component {
    render() {
        return <Menu fixed='top'
                     pointing={true}
                     color={'black'}
                     inverted={true}
                     size={"huge"}>
            <Container>
                <Menu.Item as='p'>
                    joberia<span style={{color: '#FFD700'}}>.ai</span>
                </Menu.Item>
                <Menu.Item as={Link} active={true} to={'/'}>Home</Menu.Item>
                <Menu.Item as='a'>Jobs</Menu.Item>
                <Menu.Item as='a'>Experts</Menu.Item>
            </Container>
            <Menu.Menu position={"right"}>
                <Menu.Item as='a'>Sign In</Menu.Item>
                <Menu.Item as='a' className={'signin-button'}>Post Job</Menu.Item>
            </Menu.Menu>
        </Menu>
    }
}
