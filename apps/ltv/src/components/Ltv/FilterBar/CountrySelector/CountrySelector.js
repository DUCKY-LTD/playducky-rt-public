import React, { useState, useMemo } from "react";
import Select from "react-select";
import countries from "../../../../shared/countries.json";
console.log(countries);

function CountrySelector() {
    const [value, setValue] = useState("");
    // const options = useMemo(() => countryList().getData(), []);

    // const changeHandler = (value) => {
    //   setValue(value);
    // };

    // return <Select options={options} value={value} onChange={changeHandler} />;
    return <div>1</div>;
}

export default CountrySelector;