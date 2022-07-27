import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const btnStyle = {
    width: "100px",
    color: "#46008c",
    border: "1px solid #46008c",
    marginBottom: "20px"
};

export default function TestToggleButton({alignment, handleChange}) {

    return (
        <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton style={btnStyle} value="CPI">CPI</ToggleButton>
            <ToggleButton style={btnStyle} value="CTR">CTR</ToggleButton>
        </ToggleButtonGroup>
    );
}
