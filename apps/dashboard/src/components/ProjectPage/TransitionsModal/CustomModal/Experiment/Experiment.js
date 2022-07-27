import React, {useState} from "react";
import styled from "styled-components";
import TestToggleButton from "./TestTogglebutton";
import Cpi from "./Cpi";
import Ctr from "./Ctr";

const Title = styled.div`
  font-family: Raleway, sans-serif;
  font-size: 40px;
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
`;

const Div = styled.div`
  position: relative;
  background-color: #46008c;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 40px;
`;

const CloseDiv = styled.div`
  position: absolute;
  top: -9px;
  right: -8px;
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border: 2px solid #46008c;
  border-radius: 50%;
`;

const CloseBtn = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: none;
  border-radius: 50%;
  border: transparent;
`;

const CloseImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
`;

export default function Experiment ({gameName, handleClose, handleCpiTest, handleCtrTest}) {
    const [alignment, setAlignment] = useState('CPI');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <Div>
                <CloseDiv>
                    <CloseBtn onClick={handleClose}>
                        <CloseImg alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjAiIGhlaWdodD0iMjAiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDQuNzA3MDMxMiAzLjI5Mjk2ODggTCAzLjI5Mjk2ODggNC43MDcwMzEyIEwgMTAuNTg1OTM4IDEyIEwgMy4yOTI5Njg4IDE5LjI5Mjk2OSBMIDQuNzA3MDMxMiAyMC43MDcwMzEgTCAxMiAxMy40MTQwNjIgTCAxOS4yOTI5NjkgMjAuNzA3MDMxIEwgMjAuNzA3MDMxIDE5LjI5Mjk2OSBMIDEzLjQxNDA2MiAxMiBMIDIwLjcwNzAzMSA0LjcwNzAzMTIgTCAxOS4yOTI5NjkgMy4yOTI5Njg4IEwgMTIgMTAuNTg1OTM4IEwgNC43MDcwMzEyIDMuMjkyOTY4OCB6Ij48L3BhdGg+PC9zdmc+"/>
                    </CloseBtn>
                </CloseDiv>
                <Title>Add new {alignment} Experiment?</Title>
            </Div>
            <TestToggleButton alignment={alignment} handleChange={handleChange}/>
            {alignment === 'CPI' ?
                <Cpi handleClose={handleClose} gameName={gameName} handleCpiTest={handleCpiTest}/> :
                <Ctr handleClose={handleClose} gameName={gameName} handleCtrTest={handleCtrTest}/>}
        </>
    )
}