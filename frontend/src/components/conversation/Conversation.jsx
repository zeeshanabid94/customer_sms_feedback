import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import Icon from '@material-ui/core/Icon';
import { IoMdHappy } from "react-icons/io";
import { IoMdSad } from "react-icons/io";

const mainStyle = {
    background: "white",
    color: "gray",
    height: "350px"
}

const divStyle = {
    flexGrow: 1,
    display: "block",
    marginTop: "10%",
    marginLeft: "30%",
    marginRight: "2.5%",
    padding: "2.5%",
    background: "white",
    boxShadow: "5px 5px 5px gray",
    border: "solid",
    borderColor: "gray",
    borderWidth: "0.5px"
}

const messageStyle = {
    paddingLeft: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "20px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px gray",
    marginTop: "10px",
    marginBottom: "10px",
    border: "solid",
    borderColor: "gray",
    borderWidth: "0.5px"
}

const messageTextStyle = {
    width: "80%",
    display: "inline-block",
    border: "none",
    background: "white"
}

const messageEditStyle = {
    width: "15%",
    marginLeft: "2.5%",
    background: "orange",
    color: "White",
    borderRadius: "25px"
}
class Conversation extends React.Component {
    static propTypes = {
        onChangeAutomated: PropTypes.func.isRequired,
        onChangePositive: PropTypes.func.isRequired,
        onChangeNegative: PropTypes.func.isRequired,
        automatedResponse: PropTypes.string.isRequired,
        negativeResponse: PropTypes.string.isRequired,
        positiveResponse: PropTypes.string.isRequired
    }
    constructor(props) {
        super(props);

        this.state = {
            automatedDisabled: true,
            positiveDisabled: true,
            negativeDisabled: true
        }

        this.editAutomatedResponse = this.editAutomatedResponse.bind(this);
        this.editNegativeResponse = this.editNegativeResponse.bind(this);
        this.editPositiveResponse = this.editPositiveResponse.bind(this);
    }

    editAutomatedResponse() {
        console.log("Automated Response Edited");
        let newState = this.state;
        newState.automatedDisabled = !(newState.automatedDisabled);
        this.setState(newState);
    }

    editPositiveResponse() {
        console.log("Positive Response Edited");
        let newState = this.state;
        newState.positiveDisabled = !(newState.positiveDisabled);
        this.setState(newState);
    }

    editNegativeResponse() {
        console.log("Negative Response Edited");
        let newState = this.state;
        newState.negativeDisabled = !(newState.negativeDisabled);
        this.setState(newState);
    }


    render() {
        console.log("State", this.state);
        return (
            <div style={divStyle}>
            <main style={mainStyle}>
                <div>
                    First Automated Message
                </div>
                {messageElement({
                    message: this.props.automatedResponse,
                    disabled: this.state.automatedDisabled,
                    buttonCallback: this.editAutomatedResponse,
                    textareaCallback: this.props.onChangeAutomated
                })}
                <div>
                    If Positive Response
                    <IoMdHappy />
                </div>
                {messageElement({
                    message: this.props.positiveResponse,
                    disabled: this.state.positiveDisabled,
                    buttonCallback: this.editPositiveResponse,
                    textareaCallback: this.props.onChangePositive
                })}
                
                <div>
                    If Negative Response
                    <IoMdSad />
                </div>
                {messageElement({
                    message: this.props.negativeResponse,
                    disabled: this.state.negativeDisabled,
                    buttonCallback: this.editNegativeResponse,
                    textareaCallback: this.props.onChangeNegative
                })}

                
            </main>
            </div>
            
        )
    }
}

let messageElement = function(props) {
    const {message, disabled, buttonCallback, textareaCallback} = props;
    let children = []
    if (disabled==true) {
        children.push(<textarea style = {messageTextStyle} disabled defaultValue={message}>
            </textarea>)
    } else {
        children.push(<textarea style = {messageTextStyle} defaultValue={message} onChange={textareaCallback} >
            </textarea>)
    }

    if (disabled === true) {
        children.push(<Button style = {messageEditStyle} onClick={buttonCallback}>
            Edit
        </Button>)
    } else {
        children.push(<Button style = {messageEditStyle} onClick={buttonCallback}>
            Finish
        </Button>)
    }
    return (
        <div style = {messageStyle}>
            {children}
        </div>
    )
}
export default Conversation;