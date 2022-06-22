import React, {Component} from 'react';
import styles from './ProjectPage.module.css';
import {apiLtv} from 'shared-lib/src/api/api';
import StaffCard from "./StaffCard/StaffCard";
import Button from "./Button/Button";
import TabsPanel from "./TabsPanel/TabsPanel";
import Ltv from "../Ltv/Ltv";


const gameId = window.gameId;

const modifyString = (str)=>{
   if (str) return str.slice(0, 10)
}


class ProjectPage extends Component {
    state = {
        game: {}
    }

    componentDidMount() {
        apiLtv.getGame(gameId).then((response) => {
            const result = response.response;
            // console.log(result);
            this.setState({
                game: result
            })
        });
    }

    render() {
        // console.log(this.state)
        const {gameicon_image, game_name_text,development_team_custom_team, } = this.state.game;
        const modifiedDate = this.state.game['Modified Date'];
        // console.log(modifiedDate)
        return (
            <div className={styles.container}>

                <div className={styles.card}>
                    <img className={styles.img} src={gameicon_image} alt="project_icon" width={135} height={135}/>
                    <div>
                        <h1 className={styles.title}>{game_name_text}</h1>
                        <h2 className={styles.team}>By Rush Production Team</h2>
                        <div className={styles.cardInfo}>
                            <a href="/">Released Platforms</a>
                            <p>Last update {modifyString(modifiedDate)}</p>
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        <StaffCard title={'Producer'} name={'Nick Shapovalov'}/>
                        <StaffCard title={'Marketing'} name={'Not assigned'}/>
                        <ul>
                            <li><Button name={'EDIT GAME'}/></li>
                            <li><Button name={'DELETE GAME'}/></li>
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
                <TabsPanel>
                    <Ltv/>
                </TabsPanel>
            </div>
        );
    }
}

export default ProjectPage;