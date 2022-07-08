import React, {Component} from "react";
import s from "./Edit.module.css";
import styled from "styled-components";





const INITIAL_STATE = {
    shortDescription: '',
    fullDescription: '',
    link: '',
    gpBundleId: '',
    iosBundleId: '',
    iosAppId: ''
};

export default class Edit extends Component {
    state = {
        ...INITIAL_STATE,
        game_name_text: this.props.gameName,
        immutableTitle: this.props.gameName
    }

    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({ [name]: value });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        // const { title, link, shortDescription, fullDescription, gpBundleId, iosBundleId, iosAppId } = this.state;

    //     console.log(`
    //   title: ${title}
    //   shortDescription: ${shortDescription}
    //   fullDescription: ${fullDescription}
    //   fullDescription: ${fullDescription}
    //   link: ${link}
    //   gpBundleId: ${gpBundleId}
    //   gpBundleId: ${iosBundleId}
    //   gpBundleId: ${iosAppId}
    // `);

        this.props.editGameHandler({ ...this.state });
    };

    render() {
        const {immutableTitle, game_name_text, shortDescription, fullDescription, link, gpBundleId, iosBundleId, iosAppId} = this.state;
        const {handleClose} = this.props;

        return(
            <>
                <div className={s.title_div}>
                    <h2 className={s.title}>Edit {immutableTitle} Info</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={s.float_div} style={{marginBottom: "26px"}}>
                        <label className={s.float_label} htmlFor="game_title">GAME NAME:</label>
                            <input
                                className={s.input}
                                id="game_title"
                                type="text"
                                name="game_name_text"
                                value={game_name_text}
                                onChange={this.handleChange}
                            />
                    </div>
                    <div style={{marginBottom: "26px"}}>
                        <label className={s.label}  htmlFor="short_description">
                            Short Description
                        </label>
                        <textarea
                            id="short_description"
                            className={s.textarea}
                            rows={1}
                            name="shortDescription"
                            value={shortDescription}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div style={{marginBottom: "26px"}}>
                        <label className={s.label} htmlFor="full_description">
                            Full Description
                        </label>
                        <textarea
                            id="full_description"
                            className={s.textarea}
                            rows={4}
                            name="fullDescription"
                            value={fullDescription}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div style={{marginBottom: "26px"}}>
                        <label className={s.label} htmlFor="gameplay_link">
                            Gameplay Video Link (for stores)
                        </label>
                        <input
                            id="gameplay_link"
                            className={s.input}
                            type="text"
                            name="link"
                            value={link}
                            onChange={this.handleChange}
                        />
                    </div>
                    <ul style={{marginBottom: "30px"}}>
                        <li>
                            <div className={s.float_div}>
                                <label className={s.float_label} htmlFor="gp_bundle_id">GP Bundle ID</label>
                                <input
                                    className={s.s_input}
                                    id="gp_bundle_id"
                                    type="text"
                                    name="gpBundleId"
                                    value={gpBundleId}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </li>
                        <li>
                            <div className={s.float_div}>
                                <label className={s.float_label} htmlFor="ios_bundle_id">iOS Bundle ID</label>
                                <input
                                    className={s.s_input}
                                    id="ios_bundle_id"
                                    type="text"
                                    name="iosBundleId"
                                    value={iosBundleId}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </li>
                        <li>
                            <div className={s.float_div}>
                                <label className={s.float_label} htmlFor="ios_app_id">iOS App ID</label>
                                <input
                                    className={s.s_input}
                                    id="ios_app_id"
                                    type="text"
                                    name="iosAppId"
                                    value={iosAppId}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </li>
                    </ul>
                    <button className={s.button} type='submit' onClick={handleClose}>Save</button>
                </form>
            </>
        )
    }
}