import React from 'react'
import Chart from "react-google-charts";


const Stats = () => {

    return (
        <div className="details">
            <Chart
                width={'100%'}
                height={'100%'}

                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['Speech', 7],
                    ['Test', 3],
                    ['Text', 0],
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