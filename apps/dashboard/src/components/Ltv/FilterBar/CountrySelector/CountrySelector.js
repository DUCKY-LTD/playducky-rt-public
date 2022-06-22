import React, {useState, useEffect} from "react";
import styles from './CountrySelector.module.css'
import Select from 'react-select'
import {countries} from "shared-lib/src/shared/countries";


const options = countries.map((el)=>({'value':el, 'label':el}));
options.unshift({'value':null, 'label':'All'})


const selectorStyles = {
    control: (styles) => {
        return {
            ...styles, backgroundColor: "#FFF",
            cursor:  "pointer",
            border: "1px solid #EAECEE",
            fontSize: '12px',
            alignItems: 'center',
        }
    },

    option: (styles) => {
        return {
            ...styles,
            backgroundColor:  "#FFF",
            color: "#6E6C6C",
            cursor:  "pointer",
            fontSize: '12px',
        };
    },
    singleValue: (styles) => ({...styles, color: "#6E6C6C"})
};

function CountrySelector({countryHandler}) {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{
        if(selectedOption){
            countryHandler(selectedOption.value)
        }
    }, [selectedOption, countryHandler])

    return <div className={styles.container} >
        <p className={styles.text}>Country</p>
        <Select
            defaultValue={null}
            placeholder={options[0].label}
            onChange={setSelectedOption}
            options={options}
            styles={selectorStyles}
        />
    </div>;
}

export default CountrySelector;