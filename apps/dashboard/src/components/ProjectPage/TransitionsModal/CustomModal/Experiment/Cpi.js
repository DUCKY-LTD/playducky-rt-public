import React, {Component} from "react";
import s from "./Experiment.module.css";

const Platform = {
    IOS: 'ios',
    GP: 'gp',
};

const INITIAL_STATE = {
    creatives: '',
    link: '',
    agreed_1: false,
    agreed_2: false,
    agreed_3: false,
    platform: null
};

export default class Cpi extends Component {

    state = {
        ...INITIAL_STATE
    };

    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({ [name]: value });
    };

    handleCheck = ({target}) => {
        const { type, checked, value } = target;
        console.log(value)
        console.log(type, checked)
        this.setState({[value]: checked})
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const { creatives, link, agreed_1, agreed_2, agreed_3, platform } = this.state;

        console.log(`
      creatives: ${creatives}
      link: ${link}
      agreed_1: ${agreed_1}
      agreed_2: ${agreed_2}
      agreed_3: ${agreed_3}
      platform: ${platform}
    `);

        // this.props.onSubmit({ ...this.state });
        this.reset();
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
                        <label className={s.label} htmlFor="tested_app_Link">
                            Tested App Link
                        </label>
                        <input
                            id="tested_app_Link"
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
                            checked={platform === Platform.GP}
                            name="platform"
                            value={Platform.GP}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="cpi_gp">GP</label>
                    </div>

                    <ul>
                        <li><label>
                            <input
                                type="checkbox"
                                checked={agreed_1}
                                value="agreed_1"
                                onChange={this.handleCheck}
                            />
                            I've filled the checklist:
                        </label></li>
                        <li><label>
                            <input
                                type="checkbox"
                                checked={agreed_2}
                                value="agreed_2"
                                onChange={this.handleCheck}
                            />
                            I've added 1330472120783838 as Authorized Ad Account
                        </label></li>
                        <li><label>
                            <input
                                type="checkbox"
                                checked={agreed_3}
                                value="agreed_3"
                                onChange={this.handleCheck}
                            />
                            I've turned on App in LIVE on FB
                        </label></li>
                    </ul>

                    <button type="submit" disabled={!isDisable}>Test it</button>
                </form>
            </div>
        )
    }
}