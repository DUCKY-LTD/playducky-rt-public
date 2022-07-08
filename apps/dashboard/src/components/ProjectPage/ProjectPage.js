import React, {Component} from 'react';
import styles from './ProjectPage.module.css';
import {apiLtv} from 'shared-lib/src/api/api';
import {dataHandler} from "shared-lib/src/utils/dataHandler";
import StaffCard from "./StaffCard/StaffCard";
import TabsPanel from "./TabsPanel/TabsPanel";
import Ltv from "./Ltv/Ltv";
import TransitionsModal from './TransitionsModal/TransitionsModal';
import ExperimentList from './ExperimentList/ExperimentList';


// const gameId = window.gameId;
const gameId = "1650488652114x823208019400586600";
const modifyString = (str)=>{
   if (str) return str.slice(0, 10)
}

class ProjectPage extends Component {
    state = {
        gameData: {},
        teamData:{},
        experimentData: [],
        ediGameData: {}
    }

    componentDidMount() {
        apiLtv.getGame(gameId).then((response) => {
            const result = response.response;
            this.setState({
                gameData: result
            })
            if (result.development_team_custom_team){
                apiLtv.getTeam(result.development_team_custom_team).then((response) => {
                    const result = response.response;
                    this.setState({
                        teamData: result
                    })
                });
            }
        });

        apiLtv.getExperiment(gameId).then(response => {
            const result = dataHandler.getExperiment(response.response.results);
            this.setState({
                experimentData: result
            })
        })
    }

    editGameHandler = (data) => {
        this.setState({ediGameData: data})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.ediGameData !== this.state.ediGameData){
            let sortedData = {};
            function createData(game_name_text) {
                sortedData = {game_name_text} ;
            }
            createData(this.state.ediGameData.game_name_text)

            console.log(sortedData)

            apiLtv.editGame(gameId, sortedData).then(response =>{
                console.log(response)
            })
        }
    }




    render() {
        console.log(this.state.gameData)
        // console.log(this.state.ediGameData);
        const {gameicon_image, game_name_text } = this.state.gameData;
        const modifiedDate = this.state.gameData['Modified Date'];
        const {team_name_text} = this.state.teamData;
        // console.log(this.state.teamData)

        return (
            <div className={styles.container}>

                <div className={styles.card}>
                    <img className={styles.img} src={gameicon_image} alt="project_icon" width={135} height={135}/>
                    <div>
                        <h1 className={styles.title}>{game_name_text}</h1>
                        <h2 className={styles.team}>By {team_name_text} Team</h2>
                        <div className={styles.cardInfo}>
                            <p>Released Platforms</p>
                            <p>Last update {modifyString(modifiedDate)}</p>
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        <StaffCard title={'Producer'} name={'Nick Shapovalov'}/>
                        <StaffCard title={'Marketing'} name={'Not assigned'}/>
                        <div>
                            <ul style={{listStyle: "none"}}>
                                <li>
                                    <TransitionsModal btnName={'EDIT GAME'} btnBgColor={'#ed652b'} gameName={game_name_text} type = {'edit'}
                                                      editGameHandler={this.editGameHandler} modalWidth={630}/>
                                </li>
                                <li>
                                    <TransitionsModal btnName={'DELETE GAME'} btnBgColor={'#d90000'} gameName={game_name_text} type={'delete'}
                                                      modalWidth={410}/>
                                </li>
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
                <TabsPanel ltv={ <Ltv/> } gameName={game_name_text}  experimentList={ <ExperimentList data={this.state.experimentData}/>}/>
            </div>
        );
    }
}

export default ProjectPage;