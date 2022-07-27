import React, {Component} from "react";
import s from "./Experiment.module.css";

const Platform = {
    IOS: 'iOs',
    ANDROID: 'android',
};

const INITIAL_STATE = {
    creatives: '',
    link: '',
    agreed_1: false,
    agreed_2: false,
    agreed_3: false,
    platform: null
};

const makeActiveButton = (isDisabled) => {
    const buttonClass = [s.button];

    if (!isDisabled) {
        buttonClass.push(s.disabled);
        return buttonClass.join(' ')
    }

    return s.button
}

    export default class Cpi extends Component {

    state = {
        ...INITIAL_STATE
    };

    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({ [name]: value });
    };

    handleCheck = ({target}) => {
        const { checked, value } = target;
        this.setState({[value]: checked})
    }

    handleSubmit = evt => {
        evt.preventDefault();

        this.props.handleCpiTest({...this.state})
        this.reset();
        this.props.handleClose();
    };

    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    render (){
        const {gameName} = this.props;
        const { creatives, link, agreed_1, agreed_2, agreed_3, platform } = this.state;
        const isDisable = agreed_1 && agreed_2 && agreed_3;


        return (
            <div>
                <div style={{marginBottom: "30px"}}>
                    <p className={s.label}>Game name</p>
                    <p className={s.input}>{gameName}</p>
                </div>
                <form onSubmit={this.handleSubmit}>
                   <div style={{marginBottom: "30px"}}>
                       <label className={s.label} htmlFor="creatives">
                           Creatives for test
                       </label>
                       <input
                           id="creatives"
                           className={s.input}
                           type="text"
                           placeholder="https://drive.google.com/drive/folders/YOURID?usp=sharing"
                           name="creatives"
                           value={creatives}
                           onChange={this.handleChange}
                       />
                   </div>
                    <div style={{marginBottom: "20px"}}>
                        <label className={s.label} htmlFor="link">
                            Tested App Link
                        </label>
                        <input
                            id="link"
                            className={s.input}
                            type="text"
                            placeholder="http://itunes.apple.com/app/id1517450645"
                            name="link"
                            value={link}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={s.float_div}>
                        <input
                            id="cpi_ios"
                            type="radio"
                            checked={platform === Platform.IOS}
                            name="platform"
                            value={Platform.IOS}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="cpi_ios">iOs</label>
                        <input
                            id="cpi_gp"
                            type="radio"
                            checked={platform === Platform.ANDROID}
                            name="platform"
                            value={Platform.ANDROID}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="cpi_gp">GP</label>
                    </div>

                    <ul className={s.list}>
                        <li>
                            <input
                                type="checkbox"
                                checked={agreed_1}
                                value="agreed_1"
                                onChange={this.handleCheck}
                            />
                            <label> I've filled the checklist: <a href="https://playducky.notion.site/CPI-RD1-checklist-Team-s-store-EN-b25787cc10524008bacbfcc342895477"
                                                                  target="_blank" rel="noopener noreferrer">[CHECKLIST]</a></label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                checked={agreed_2}
                                value="agreed_2"
                                onChange={this.handleCheck}
                            />
                            <label> I've added 1330472120783838 as Authorized Ad Account</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                checked={agreed_3}
                                value="agreed_3"
                                onChange={this.handleCheck}
                            />
                            <label> I've turned on App in LIVE on FB</label>
                        </li>
                        <li><a href="https://playducky.notion.site/The-quick-guide-to-CPI-videos-280d6076a0c2448bbbcad71850d675eb" target="_blank"
                        rel="noopener noreferrer">The quick guide to CPI videos.</a></li>
                    </ul>

                    <button className={makeActiveButton(isDisable)} type="submit" disabled={!isDisable}>Test it</button>
                </form>
            </div>
        )
    }
}