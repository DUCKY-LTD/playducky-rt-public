import React, {Component} from "react";
import s from "./Experiment.module.css";


const INITIAL_STATE = {
    creatives: '',
    whatsNew: '',
};

const makeActiveButton = (isDisabled) => {
    const buttonClass = [s.button];

    if (!isDisabled) {
        buttonClass.push(s.disabled);
        return buttonClass.join(' ')
    }

    return s.button
}

export default class Ctr extends Component {

    state = {
        ...INITIAL_STATE
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };


    handleSubmit = evt => {
        evt.preventDefault();

        this.props.handleCtrTest({...this.state});
        this.reset();
        this.props.handleClose();
    };

    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    render (){
        const { creatives, whatsNew } = this.state;
        const isDisable = creatives.length !== 0;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label style={{marginBottom: "5px"}} className={s.label} htmlFor="creatives_ctr">
                        Creatives for test
                    </label>
                    <p className={s.ctr_explanation}>
                        Video requirements:<br/>
                        1. MP4, aspect ratio 4:5 (1080x1350). Avoid black or blurred borders.<br/>
                        2. Length 15-20 seconds.<br/>
                        3. Start with the best action scene, no intro.<br/>
                        4. Raw gameplay footage, no montage cuts, no effects.<br/>
                        5. Please check that access to google drive is open to everyone
                    </p>
                        <input
                            style={{marginBottom: "5px"}}
                            id="creatives_ctr"
                            className={s.input}
                            type="text"
                            placeholder="http://drive.google.com/"
                            name="creatives"
                            value={creatives}
                            onChange={this.handleChange}
                        />
                    <label className={s.label} style={{marginBottom: "5px"}} htmlFor="ctr_description">
                        What's new in this videos? (What did you change?)
                    </label>
                        <textarea
                            className={s.textarea}
                            id="ctr_description"
                            rows={3}
                            placeholder="Camera, Different colors, New water..."
                            name="whatsNew"
                            value={whatsNew}
                            onChange={this.handleChange}
                        />
                    <button className={makeActiveButton(isDisable)} type="submit" disabled={!isDisable}>Test it</button>
                </form>
            </div>
        )
    }
}