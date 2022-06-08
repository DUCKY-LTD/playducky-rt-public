import React, {useState, useEffect} from "react";
import Select from 'react-select'
import {countries} from "shared-lib/src/shared/countries";

const options = countries.map((el)=>{
    return {'value':el, 'label':el}
})
console.log(options);

const selectorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#FFF",
        cursor:  "pointer",
        border: "1px solid #EAECEE",
        fontSize: '12px'}),
    option: (styles) => {
        return {
            ...styles,
            backgroundColor:  "#FFF",
            color: "#6E6C6C",
            cursor:  "pointer",
            fontSize: '12px'
        };
    }
};

function CountrySelector({countryHandler}) {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{
        if(selectedOption){
            countryHandler(selectedOption.value)
        }
    }, [selectedOption])

    return <div style={{paddingRight:'8px'}}>
        <Select
            defaultValue={null}
            defaultInputValue={'All'}
            onChange={setSelectedOption}
            options={options}
            styles={selectorStyles}
        />
    </div>;
}

export default CountrySelector;