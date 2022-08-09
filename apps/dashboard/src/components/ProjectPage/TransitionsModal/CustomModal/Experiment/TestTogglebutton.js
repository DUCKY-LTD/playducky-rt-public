import React, {useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const btnStyle = {
    width: "100px",
    color: "#46008c",
    border: "1px solid #46008c",
    marginBottom: "10px",
};



export default function TestToggleButton({alignment, handleChange}) {
    const [disableCpi, setDisableCpi] = useState(true);
    const [disableCtr, setDisableCtr] = useState(false);

    const isDisable = () => {
        setDisableCtr(!disableCtr);
        setDisableCpi(!disableCpi);
    };

    return (
        <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton style={btnStyle} disabled={disableCpi} value="CPI" onClick={isDisable}>CPI</ToggleButton>
            <ToggleButton style={btnStyle} disabled={disableCtr} value="CTR" onClick={isDisable}>CTR</ToggleButton>
        </ToggleButtonGroup>
    );
}
