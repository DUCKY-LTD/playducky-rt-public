import React, {Component} from "react";
import s from "./Edit.module.css";

export default class Edit extends Component {
    state = {
        gameTitle: this.props.gameName,
        immutableTitle: this.props.gameName,
        shortDescription: this.props.shortDescription,
        fullDescription: this.props.fullDescription,
        link: this.props.link,
        gpBundleId: this.props.gpBundleId,
        iosBundleId: this.props.iosBundleId,
        iosAppId: this.props.iosAppId,
        file: undefined,
        preview: null
    }


    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({ [name]: value });
    };

    handleImg = ({target}) => {

        let img = target.files[0];
        let preview = URL.createObjectURL(img);
        console.log(preview)

        this.setState({
            file: img,
            preview: preview
        })
    }

    handleSubmit = evt => {
        evt.preventDefault();

        this.props.editGameHandler({ ...this.state });
    };

    render() {
        const {immutableTitle, gameTitle, shortDescription, fullDescription, link, gpBundleId, iosBundleId, iosAppId} = this.state;
        const {handleClose} = this.props;

        return(
            <>
                <div className={s.title_div}>
                    <h2 className={s.title}>Edit {immutableTitle} Info</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={s.float_div} style={{marginBottom: "5px"}}>
                        <label className={s.float_label} htmlFor="game_title">GAME NAME:</label>
                            <input
                                className={s.input}
                                id="game_title"
                                type="text"
                                name="gameTitle"
                                value={gameTitle}
                                onChange={this.handleChange}
                            />
                    </div>
                    <div style={{marginBottom: "5px"}}>
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
                    <div style={{marginBottom: "5px"}}>
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
                    <div style={{marginBottom: "5px"}}>
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
                    <div className={s.upload_container}>
                        <div className={s.img_input_container}>
                            {this.state.preview ?  <img src={this.state.preview} alt="preview img" width="100%" height="100%"/>:
                                <>
                                    <input className={s.img_input} multiple={false} type="file" name="upload" id="upload" onChange={this.handleImg}/>
                                    <label className={s.img_input_label} htmlFor="upload">Click to upload Game Logo</label>
                                </>}
                        </div>
                        <div>
                            <ul>
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
                        </div>
                    </div>
                    <button className={s.button} type='submit' onClick={handleClose}>Save</button>
                </form>

            </>
        )
    }
}