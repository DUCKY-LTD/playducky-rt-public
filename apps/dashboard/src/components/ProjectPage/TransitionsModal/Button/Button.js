import React from 'react';
import styled from "styled-components";

const Buttons = styled.button`
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: ${props => props.large ? "200px" : "120px"};
  border-radius: 5px;
  border: none;
  background-color: ${props => props.color};
  letter-spacing: ${props => props.large ? "2px" : "normal"};
  color: #fff;
  padding: ${props => props.large ? "17px 0" : "5px 0"};
  font-family: Raleway, sans-serif;
  font-size: 14px;
  font-weight: bold;
  transition: 0.2s;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.large ? "#ffc929" : "none"};
  }
`;

export default function Button({name, bgColor, onClick, size}) {
    return (
        <Buttons large={size} color={bgColor} onClick={onClick} type='button'>{name}</Buttons>
    );
}
