import React from 'react'
import Chart from "react-google-charts";


const Stats = (props) => {

    return (
        <div className="details">
            <Chart
                width={'100%'}
                height={'100%'}

                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Forma', 'ilosc'],
                    ['Wymowa', props.stats.speech / 5],
                    ['Slownictwo', props.stats.test],
                    ['Tekst', 0]
                ]}
                options={{
                    title: 'Statystyki z wykonywania testow',
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
            />

        </div>
    )
}


export default Stats