import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card'

import './Board.css'


class Board extends Component {

    render() {
        return (

            <div className='Board'>
                <Card />
                <Card />
            </div>

        )
    }
}


export default Board