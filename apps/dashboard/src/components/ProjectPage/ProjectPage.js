import React, {Component} from 'react';
import styles from './ProjectPage.module.css';
import {apiLtv} from 'shared-lib/src/api/api';
import {dataHandler} from "shared-lib/src/utils/dataHandler";
import StaffCard from "./StaffCard/StaffCard";
import TabsPanel from "./TabsPanel/TabsPanel";
import Ltv from "./Ltv/Ltv";
import TransitionsModal from './TransitionsModal/TransitionsModal';
import ExperimentList from './ExperimentList/ExperimentList';
import LoadingSpinner from "./Ltv/LoadingSpinner/LoadingSpinner";
// import defaultImage from 'shared-lib/src/shared/images/default.jpg';

const userId = window.userId;
const gameId = window.gameId;
// const gameId = "1650552170075x873725647565619200";
// const userId = "1623250768931x718529467914691200";

const modifyString = (str)=>{
   if (str) return str.slice(0, 10)
}

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
        isLoading: false
    }

    componentDidMount() {
        this.setState(prevState => ({isLoading: !prevState.isLoading}));

        apiLtv.getGame(gameId).then((response) => {
            const result = response.response;
            this.setState({
                gameData: result
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
        const {GameIcon, GameName, ShortDescription, Description,
             GPStoreBundleID, iOsStoreBundleID, iOsStoreAppID } = this.state.gameData;
        const modifiedDate = this.state.gameData['Modified Date'];
        const {TeamName} = this.state.teamData;
        const {FullName} = this.state.producerData;
        // const {UserTypeText} = this.state.userType;


        return (
            <div className={styles.container}>
                {this.state.isLoading ? <LoadingSpinner/> :
                    <>
                        <div className={styles.card}>
                            <img className={styles.img} src={GameIcon} alt="project_icon" width={135} height={135}/>
                            <div>
                                <h1 className={styles.title}>{GameName}</h1>
                                <h2 className={styles.team}>By {TeamName} Team</h2>
                                <div className={styles.cardInfo}>
                                    <p>Released Platforms</p>
                                    <p>Last update {modifyString(modifiedDate)}</p>
                                </div>
                            </div>
                            <div className={styles.editBlock}>
                                <StaffCard title={'Producer'} name={FullName}/>
                                {/*<StaffCard title={'Marketing'} name={'Not assigned'}/>*/}
                                <div>
                                    <ul style={{listStyle: "none"}}>
                                        <li>
                                            <TransitionsModal btnName={'EDIT GAME'} btnBgColor={'#ed652b'} type={'edit'}
                                                              editGameHandler={this.editGameHandler} modalWidth={630}
                                                              gameName={GameName} shortDescription={ShortDescription}
                                                              fullDescription={Description} link={this.state.gameData['Gameplay Video Link']}
                                                              gpBundleId={GPStoreBundleID} iosBundleId={iOsStoreBundleID}
                                                              iosAppId={iOsStoreAppID}

                                            />
                                        </li>
                                        {/*{(UserTypeText === 'Producer' || UserTypeText === 'Admin') &&*/}
                                        {/*   ( <li>*/}
                                        {/*    <TransitionsModal btnName={'DELETE GAME'} btnBgColor={'#d90000'} gameName={GameName} type={'delete'}*/}
                                        {/*                      modalWidth={410} />*/}
                                        {/*</li>)}*/}
                                        <li>
                                            <a href="https://www.notion.so/playducky/61923c2f4c9846d78ea39eb61a18a1df?v=005720ff02b14720ad3450395bcfd929" target='_blank'
                                               rel="noopener noreferrer">
                                                <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1638797149646x236744111126793600%2FNotion_app_logo.png?w=64&h=64&auto=compress&fit=crop&dpr=1"
                                                     alt="notion_logo" width={45} height={45}/>
                                                <p>Project page</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <TabsPanel ltv={ <Ltv/> } gameName={GameName} handleCpiTest={this.handleCpiTest} handleCtrTest={this.handleCtrTest}
                                   experimentList={ <ExperimentList data={this.state.experimentData} testRedirectHandler={this.testRedirectHandler} /> }
                        />
                    </>
                }
            </div>

            // <div className={styles.test}>TEST</div>
        );
    }
}


export default ProjectPage;