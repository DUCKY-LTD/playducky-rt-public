import React, {Component} from "react";
import styled from "styled-components";

const INITIAL_STATE = {
    creatives: '',
    description: '',
};

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

        const { creatives, description } = this.state;

        console.log(`
      creatives: ${creatives}
      description: ${description}
    
    `);

        // this.props.onSubmit({ ...this.state });
        this.reset();
    };

    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    render (){
        const { creatives, description } = this.state;
        const isDisable = creatives.length !== 0;
        console.log(isDisable)


        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Creatives for test
                        <input
                            type="text"
                            placeholder="http://drive.google.com/"
                            name="creatives"
                            value={creatives}
                            onChange={this.handleChange}
                        />
                    </label>
                    <hr/>
                    <label>
                        What's new in this videos? (What did you change?)
                        <textarea
                            rows={5}
                            placeholder="Camera, Different colors, New water..."
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        />
                    </label>


                    <button type="submit" disabled={!isDisable}>Test it</button>
                </form>
            </div>
        )
    }
}