import React, { Component } from 'react';
import NavMenu from '../../components/Navigation/NavMenu'
import SideMenu from '../../components/UI/SideMenu/SideMenu'
import * as ActionTypes from '../../store/actions'
import { connect } from 'react-redux'
import './Layout.css'
import Aux from '../Auxiliary/Auxiliary';


class Layout extends Component {

    render() {

        return (
            <Aux>
                <NavMenu isEnabled={this.props.isEnabled} />
                <main className="Content">
                    {this.props.children}
                </main>
                <SideMenu isEnabled={this.props.isEnabled}
                    isExamOn={this.props.isExamOn}
                    disableSideView={this.props.disableSideView}
                    turnExamOn={this.props.turnExamOn}
                    testAmount={this.props.testAmount}
                    openMenuHandler={this.props.openMenu}
                />
            </Aux >
        )
    }
}

const mapStateToProps = (state) => {


    return {
        isEnabled: state.isEnabled,
        testAmount: state.user.testCount,
        isExamOn: state.isExamOn
    }

}

const mapDispatchToProps = dispatch => {
    return {
        disableSideView: () => dispatch({ type: ActionTypes.DISABLE_TEST }),
        turnExamOn: () => dispatch({ type: ActionTypes.EXAM_ON }),
        openMenu: () => dispatch({ type: ActionTypes.ENABLE_TEST })

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);