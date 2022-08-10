import styles from "./Main.module.css";
import StaffCard from "../StaffCard/StaffCard";
import TransitionsModal from "../TransitionsModal/TransitionsModal";
import defaultImage from 'shared-lib/src/shared/images/default.jpg';

const modifyString = (str)=>{
    if (str) return str.slice(0, 10)
}

function Main (props) {

    const {GameName, ShortDescription, Description,
        GPStoreBundleID, iOsStoreBundleID, iOsStoreAppID } = props.gameData;
    const modifiedDate = props.gameData['Modified Date'];
    const {TeamName} = props.teamData;
    const {FullName} = props.producerData;
    const {UserTypeText} = props.userType;

    return (
        <div>
            <div className={styles.card}>
                <img className={styles.img} src={props.gameIcon} alt="project_icon" />
                <div>
                    <h1 className={styles.title}>{GameName}</h1>
                    <h2 className={styles.team}>By {TeamName} Team</h2>
                    <div className={styles.cardInfo}>
                        {/*<p>Released Platforms</p>*/}
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
                                                  editGameHandler={props.editGameHandler} modalWidth={630}
                                                  gameName={GameName} shortDescription={ShortDescription}
                                                  fullDescription={Description} link={props.gameData['Gameplay Video Link']}
                                                  gpBundleId={GPStoreBundleID} iosBundleId={iOsStoreBundleID}
                                                  iosAppId={iOsStoreAppID}

                                />
                            </li>
                            {/*{(UserTypeText === 'Producer' || UserTypeText === 'Admin') &&*/}
                            {/*   ( <li>*/}
                            {/*    <TransitionsModal btnName={'DELETE GAME'} btnBgColor={'#d90000'} gameName={GameName} type={'delete'}*/}
                            {/*                      modalWidth={410} />*/}
                            {/*</li>)}*/}
                            <li> {((UserTypeText === 'Producer' || UserTypeText === 'Admin') && props.notionLink) &&
                                (<a href={props.notionLink} target="_blank"
                                    rel="noopener noreferrer">
                                    <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1638797149646x236744111126793600%2FNotion_app_logo.png?w=64&h=64&auto=compress&fit=crop&dpr=1"
                                         alt="notion_logo" width={45} height={45}/>
                                    <p>Project page</p>
                                </a>)
                            }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

Main.defaultProps = {
    gameIcon : defaultImage,
}

export default Main;