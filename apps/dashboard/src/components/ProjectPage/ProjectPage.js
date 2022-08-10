import React, {Component} from 'react';
import styles from './ProjectPage.module.css';
import {apiLtv} from 'shared-lib/src/api/api';
import {dataHandler} from "shared-lib/src/utils/dataHandler";
import Main from "./Main/Main";
import TabsPanel from "./TabsPanel/TabsPanel";
import Ltv from "./Ltv/Ltv";
import ExperimentList from './ExperimentList/ExperimentList';
import LoadingSpinner from "./Ltv/LoadingSpinner/LoadingSpinner";


const userId = window.userId;
const gameId = window.gameId;
// const gameId = "1650488652114x823208019400586600";
// const userId = "1623250768931x718529467914691200";


class ProjectPage extends Component {
    state = {
        gameData: {},
        teamData:{},
        producerData: {},
        experimentData: [],
        editGameData: {},
        editedCpi: {},
        editedCtr: {},
        userType: {},
        testRedirectId : '',
        notionLink: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState(prevState => ({isLoading: !prevState.isLoading}));

        apiLtv.getGame(gameId).then((response) => {
            const result = response.response;
            const link = dataHandler.modifyNotionId(result.NotionID);
            this.setState({
                gameData: result,
                notionLink: link
            })
                apiLtv.getTeam(result.DevelopmentTeam).then((response) => {
                    const result = response.response;
                    this.setState({
                        teamData: result
                    })
                    apiLtv.getProducer(this.state.gameData.DUCKYProducer).then(response => {
                        const result = response.response;
                        this.setState({
                            producerData: result
                        })
                            apiLtv.getUserType(userId).then(response => {
                                const result = response.response;
                                this.setState({
                                    userType: result
                                })
                                apiLtv.getExperiment(gameId).then(response => {
                                    const resultExp = dataHandler.getExperiment(response.response.results);
                                    this.setState({
                                        experimentData: resultExp
                                    })
                                    this.setState(prevState => ({isLoading: !prevState.isLoading}))
                                })
                            })
                    });
                });
        });
    }

    editGameHandler = (data) => {
        this.setState({editGameData: data})
    };

    handleCpiTest = (data) => {
        const result = dataHandler.createNewCpiTest(data, this.state.experimentData, gameId, this.state.teamData);
        this.setState({editedCpi: result})
    }

    handleCtrTest = (data) => {
        const result = dataHandler.createNewCtrTest(data, this.state.experimentData, gameId, this.state.teamData);
        this.setState({editedCtr: result})

    }

    testRedirectHandler = (id) => {
        this.setState({testRedirectId: id})
    }


    componentDidUpdate(prevProps, prevState) {
        const {editedCpi, editedCtr, testRedirectId} = this.state;

        if (prevState.editGameData !== this.state.editGameData) {

            if(prevState.editGameData.file !== this.state.editGameData.file) {
                apiLtv.uploadImg(this.state.editGameData.file).then(response => {
                    const url = response.data.public_url;
                    const result = dataHandler.editGame(this.state.editGameData, url);
                    apiLtv.editGame(gameId, result).then(response => {
                        apiLtv.getGame(gameId).then((response) => {
                            const result = response.response;
                            this.setState({
                                gameData: result
                            })
                        })
                    });
                })
            }
            const result = dataHandler.editGame(this.state.editGameData);

            apiLtv.editGame(gameId, result).then(response => {
                apiLtv.getGame(gameId).then((response) => {
                    const result = response.response;
                    this.setState({
                        gameData: result
                    })
                })
            });


        }

        if (prevState.editedCpi !== this.state.editedCpi) {
            apiLtv.createCpiTest(editedCpi).then(response => {
                apiLtv.triggerCpiWf(response.id).then(response => {
                    apiLtv.getExperiment(gameId).then(response => {
                        const result = dataHandler.getExperiment(response.response.results);
                        this.setState({
                            experimentData: result
                        })
                    })
                })
            })
        }

        if(prevState.editedCtr !== this.state.editedCtr){
            apiLtv.createCtrTest(editedCtr).then(response => {
                apiLtv.triggerCtrWf(response.id).then(response => {
                    apiLtv.getExperiment(gameId).then(response => {
                        const result = dataHandler.getExperiment(response.response.results);
                        this.setState({
                            experimentData: result
                        })
                    })
                })
            })
        }

        if (prevState.testRedirectId !== this.state.testRedirectId){
            const link = dataHandler.redirectToTestPage(userId, testRedirectId);

            if (link !== undefined) {
                console.log(link);
                window.location.assign(link)
            }

            this.setState(prevState => ({testRedirectId: ''}))
        }
    }

    render() {

        return (
            <div className={styles.container}>
                {this.state.isLoading ? <LoadingSpinner/> :
                    <>  <Main gameData={this.state.gameData} teamData={this.state.teamData} editGameHandler={this.editGameHandler} gameIcon={this.state.gameData.GameIcon}
                            producerData={this.state.producerData} userType={this.state.userType} notionLink={this.state.notionLink}
                        />
                        <TabsPanel ltv={ <Ltv/> } gameName={this.state.gameData.GameName} handleCpiTest={this.handleCpiTest} handleCtrTest={this.handleCtrTest}
                                   experimentList={ <ExperimentList data={this.state.experimentData} testRedirectHandler={this.testRedirectHandler} /> }
                        />
                    </>
                }
            </div>
        );
    }
}


export default ProjectPage;