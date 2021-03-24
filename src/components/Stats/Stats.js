import React from 'react'
import Chart from "react-google-charts"
import database from '../../config'
import { ChartR } from 'react-charts'


const Stats = (props) => {

    console.log(props.data)
    // console.log(typeof props.data[1][0], typeof props.data[1][1]);
    return (

        <div className="details">

            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Forma', 'ilość'],
                    ['Wymowa', props.stats.speech / 5],
                    ['Słownictwo', props.stats.test],
                    ['Tekst', props.stats.text]
                ]}
                options={{
                    title: 'Statystyki z wykonywania testow',
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
            />

            <Chart
                width={'100%'}
                height={'300px'}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={props.data}
                options={{
                    title: 'Statystyki pracy z tekstem',
                    hAxis: { title: 'Testy', titleTextStyle: { color: '#333' }, scaleType: 'linear' },
                    vAxis: { minValue: 0 },
                    // For the legend to fit, we make the chart area smaller
                    chartArea: { width: '50%', height: '70%' },
                    // lineWidth: 25
                }}
                // For tests
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}


export default Stats