import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Chart from "react-google-charts"
import Stats from './Stats'

configure({ adapter: new Adapter() })

const results = {
    test: 0,
    speech: 0
}

describe('Component Stats', () => {

    it("Should return only one chart", () => {

        const wrapper = shallow(<Stats stats={results} />)
        expect(wrapper.find(Chart))

    })

})