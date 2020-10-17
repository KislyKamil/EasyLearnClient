import React, { Component } from 'react';
import NavMenu from '../../components/Navigation/NavMenu'


import Aux from '../Auxiliary/Auxiliary';


class Layout extends Component {

    render() {
        return (
            <Aux>
                <NavMenu />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux >
        )
    }
}

export default Layout;