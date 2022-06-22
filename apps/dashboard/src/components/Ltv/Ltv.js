import React, { Component } from "react";
import styles from "./Ltv.module.css";
import moment from "moment";
import FilterBar from "./FilterBar/FilterBar";
import THeader from "./Theader/THeader";
import TBody from "./TBody/TBody";
import TFooter from "./TFooter/TFooter";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import {apiLtv} from "shared-lib/src/api/api";
import { dataHandler } from "shared-lib/src/utils/dataHandler";


// for debug
// const gPBundleId = 'team.teagames.mergemonstersarmy';
// const iOsAppId = 'id1609950100';

const gPBundleId = window.gPBundleId;
const iOsAppId = window.iOsAppId;

class Ltv extends Component {
    state = {
        params:{
            gP: gPBundleId,
            iOs: iOsAppId,
            from: moment().subtract(8, "days").format("YYYY-MM-DD"),
            to: moment().subtract(2, "days").format("YYYY-MM-DD"),
            country: null,
            iosStatus:true,
            gpStatus: true
        },
        sortedData: [],
        isLoading: false
    }

    componentDidMount() {
        const {from, to, gP, iOs} = this.state.params;

        this.setState(prevState => ({isLoading: !prevState.isLoading}));

        apiLtv.getLtv(from, to, {app_id:[gP, iOs]}).then((response) => {
            const copyData = JSON.parse(JSON.stringify(response));
            const result = dataHandler.getSortedData(copyData);
            this.setState({
                sortedData: result
            });
            this.setState(prevState => ({isLoading: !prevState.isLoading}))
        });
    }

     dateRangeHandler = (from, to) => {
         const {params} = this.state;
         this.setState({
            params: {
                ...params,
                from: from,
                to: to
            }
        });
    };

    countryHandler = (country) => {
        console.log(country)
        const {params} = this.state;
        this.setState({
            params:{
                ...params,
                country: country
            }
        });
    }

    platformHandler = (evt) => {
        const {params} = this.state;
        const { value, checked, type } = evt.target;

        this.setState({
            params: {
                ...params,
        [value]: type === 'checkbox' ? checked : value}
        })
    };


    componentDidUpdate(prevProps, prevState) {
        const {
            params:{
            from, to, country, gP, iOs, iosStatus, gpStatus
        }} = this.state;

        if(prevState.params !== this.state.params){
            // this.setState(prevState => ({isLoading: !prevState.isLoading}));

            if(gpStatus && iosStatus){
                apiLtv.getLtv(from, to, {country, app_id:[gP, iOs]}).then((response) => {
                    const copyData = JSON.parse(JSON.stringify(response));
                    const result = dataHandler.getSortedData(copyData);
                    this.setState({
                        sortedData: result
                    });
                    // this.setState(prevState => ({isLoading: !prevState.isLoading}))
                })
            } else if (!gpStatus && iosStatus){
                apiLtv.getLtv(from, to, {country, app_id:[iOs]}).then((response) => {
                    const copyData = JSON.parse(JSON.stringify(response));
                    const result = dataHandler.getSortedData(copyData);
                    this.setState({
                        sortedData: result
                    });
                    // this.setState(prevState => ({isLoading: !prevState.isLoading}))
                })
            } else if (!iosStatus && gpStatus){
                apiLtv.getLtv(from, to, {country, app_id:[gP]}).then((response) => {
                    const copyData = JSON.parse(JSON.stringify(response));
                    const result = dataHandler.getSortedData(copyData);
                    this.setState({
                        sortedData: result
                    });
                    // this.setState(prevState => ({isLoading: !prevState.isLoading}))
                })
            } else if (!iosStatus && !gpStatus){
                this.setState(prevState => {
                    return {
                        params: {
                            ...this.state.params,
                            iosStatus: !prevState.iosStatus,
                            gpStatus: !prevState.gpStatus
                        }
                    }
                });
                // this.setState(prevState => ({isLoading: !prevState.isLoading}))
            }
        }
    }

    render() {
        const {isLoading, sortedData, params} = this.state;
        // console.log(params.country)

        return (
             <div className={styles.container}>
            <FilterBar dateRangeHandler={this.dateRangeHandler} countryHandler={this.countryHandler}
            platformHandler={this.platformHandler} iosStatus={params.iosStatus} gpStatus={params.gpStatus}/>
                 {isLoading ? <LoadingSpinner/> :
                     (sortedData.length === 0) ? <h1 className={styles.title}>Data not available</h1> :
                         <div className={styles.overflow__container}>
                             <table className={styles.table__dash}>
                                 <THeader/>
                                 <TBody sortedData={sortedData}/>
                                 <TFooter sortedData={sortedData}/>
                             </table>
                         </div>
                 }
            </div>
        )
    }
}

export default Ltv;


