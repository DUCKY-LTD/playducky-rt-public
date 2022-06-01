import React, { useState, useEffect } from "react";
import styles from "./DateRangePicker.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function DateRangePicker({ dateRangeHandler }) {
    //custom datepicker local state
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    //datePicker block days settings
    const dateBlockFrom = new Date();
    dateBlockFrom.setDate(dateBlockFrom.getDate()-2);
    const dateBlockTo = new Date();
    dateBlockTo.setDate(dateBlockTo.getDate()+3650);

    //show datePicker
    const [status, setStatus] = useState(false);
    const handleShow = (active) => {
        setIsActive(active);
        setStatus((prevState) => !prevState);
    };

    //set style for active button
    const [isActive, setIsActive] = useState(7);
    const makeActiveButton = (button, isActive)=>{
        const buttonClasses = [styles.button];

        if(button === isActive){
            buttonClasses.push(styles.button__active);
            return buttonClasses.join(' ')
        }

        return styles.button
    }

    //send date params from buttons to getLtv api
    const onClick =(from,to, active)=>{
        dateRangeHandler(moment().subtract(from, "days").format("YYYY-MM-DD"),
            moment().subtract(to, "days").format("YYYY-MM-DD"));
        setIsActive(active)
    }

    //send date params from custom datePicker to getLtv api
    useEffect(() => {
        if (endDate) {
            dateRangeHandler(moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD"));
            setStatus((prevState) => !prevState);
        }
    }, [endDate]);

    return (
        <div className={styles.container}>
            <button className={makeActiveButton(3, isActive)}
                    type="button" onClick={()=>onClick(4, 2, 3)}>
                3 days
            </button>
            <button className={makeActiveButton(7, isActive)}
                    type="button" onClick={()=>onClick(8, 2, 7)}>
                7 days
            </button>
            <button className={makeActiveButton(30, isActive)}
                    type="button" onClick={()=>onClick(31, 2,30)}>
                30 days
            </button>
            <>
            <button className={makeActiveButton('custom', isActive)}
                    type="button" onClick={()=>handleShow('custom')}>
                {endDate
                    ? moment(startDate).format("YYYY-MM-DD") +
                    " - " +
                    moment(endDate).format("YYYY-MM-DD")
                    : "Custom"}
            </button>
            {status && (
                    <DatePicker
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    excludeDateIntervals={[
                        { start: dateBlockFrom, end: dateBlockTo },
                    ]}
                />
            )}
            </>
        </div>
    );
}

export default DateRangePicker;
