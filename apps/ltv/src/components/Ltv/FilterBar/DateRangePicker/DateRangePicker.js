import React, { useState, useEffect, forwardRef } from "react";
import styles from "./DateRangePicker.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {logDOM} from "@testing-library/react";

function DateRangePicker({ dateRangeHandler }) {
    //custom datepicker local state
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setIsActive('custom')
    };

    //datePicker block days settings
    const dateBlockFrom = new Date();
    dateBlockFrom.setDate(dateBlockFrom.getDate()-2);
    const dateBlockTo = new Date();
    dateBlockTo.setDate(dateBlockTo.getDate()+3650);

    //set style for active button
    const [isActive, setIsActive] = useState('7');
    const makeActiveButton = (button, isActive)=>{
        const buttonClasses = [styles.button];

        if(button === isActive){
            buttonClasses.push(styles.button__active);
            return buttonClasses.join(' ')
        }

        return styles.button
    }

    //send date params from buttons to getLtv api
    const onDate =(from,to, active)=>{
        dateRangeHandler(moment().subtract(from, "days").format("YYYY-MM-DD"),
            moment().subtract(to, "days").format("YYYY-MM-DD"));
        setIsActive(active)
    }

    //send date params from custom datePicker to getLtv api
    useEffect(() => {
        if (endDate) {
            dateRangeHandler(moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD"));
        }
    }, [endDate]);

    const CustomInput = forwardRef(({value, onClick }, ref) => (
        <button className={(makeActiveButton('custom', isActive)) +' '+(styles.buttonLast)} onClick={onClick} ref={ref}>
            {'Custom'}
        </button>
    ));


    return (
        <div className={styles.container}>
            <button className={(makeActiveButton('3', isActive))+' '+(styles.buttonFirst)}
                    type="button" onClick={()=>onDate(4, 2, '3')}>
                3 days
            </button>
            <button className={makeActiveButton('7', isActive)}
                    type="button" onClick={()=>onDate(8, 2, '7')}>
                7 days
            </button>
            <button className={makeActiveButton('30', isActive)}
                    type="button" onClick={()=>onDate(31, 2,'30')}>
                30 days
            </button>

            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                customInput={<CustomInput />}
                excludeDateIntervals={[
                    { start: dateBlockFrom, end: dateBlockTo },
                ]}
            />
        </div>
    );
}

export default DateRangePicker;
