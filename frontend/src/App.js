import React, { Component } from 'react';

import EmotiveAppBar from './components/appbar/EmotiveAppBar';
import Drawer from './components/drawer/Drawer';
import './App.css';
import Conversation from './components/conversation/Conversation';
import {CookiesProvider, withCookies} from 'react-cookie';
import PropTypes from 'prop-types';
import CustomerForm from './components/forms/CustomerForm';


let smsSendURI = "/sms_feedback/send_sms/"

class App extends Component {
  static propTypes = {
    cookie: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      customerName: null,
      phoneNumber: null,
      productType: null,
      automatedResponse: "Hi <firstName>! I saw that you received our <productType>! How is it going so far?",
      positiveReply: "Great! Can you describe what you love most about the <productType>?",
      negativeReply: "I'm sorry to hear that! Can you let us know what you disliked about the <productType>?"
    }

    this.onChangeAutomated = this.onChangeAutomated.bind(this);
    this.onChangeNegative = this.onChangeNegative.bind(this);
    this.onChangePositive = this.onChangePositive.bind(this);
    this.onSendSMS = this.onSendSMS.bind(this);
    this.interpolateString = this.interpolateString.bind(this);
  }

  interpolateString(customerName, productType, message) {
    return message.replace("<firstName>", customerName).replace("<productType>", productType);
  }
  onSendSMS(formData) {
    let data = {
      customer_name: formData.customerName,
      phone_number: formData.phoneNumber,
      product_type: formData.product,
      automated_message: this.interpolateString(formData.customerName, formData.product, this.state.automatedResponse),
      positive_reply: this.interpolateString(formData.customerName, formData.product, this.state.positiveReply),
      negative_reply: this.interpolateString(formData.customerName, formData.product, this.state.negativeReply)
    }

    let options = {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRFToken": this.props.cookies.get("csrftoken")
      }
    }

    fetch(smsSendURI, options).then((res) => {
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.json());
      return res.json();
    }).then((jsonResponse) => {
      console.log(jsonResponse);
    }).catch((err) => {
      console.log(err.toString());
    })
    console.log("Will send", data);
    console.log("With options", options);
  }

  onChangeAutomated(event) {
    console.log("Automated Response Changed.")
    let newState = this.state;
    newState.automatedResponse = event.target.value;
    this.setState(newState);
  }

  onChangePositive(event) {
    console.log("Positive Response Changed.")
    let newState = this.state;
    newState.positiveReply = event.target.value;
    this.setState(newState);
  }

  onChangeNegative(event) {
    console.log("Negative Response Changed.")
    let newState = this.state;
    newState.negativeReply = event.target.value;
    this.setState(newState);
  }
  render() {
    console.log("APP OUTPUT", this.props);
    let drawerChildren = [
      <CustomerForm onSubmit={this.onSendSMS}></CustomerForm>
    ]
    return (
      <CookiesProvider>
        <div className="App">
          <EmotiveAppBar></EmotiveAppBar>
          <Drawer children={drawerChildren}/>
          <Conversation onChangeAutomated={this.onChangeAutomated} onChangePositive={this.onChangePositive}
          onChangeNegative={this.onChangeNegative} automatedResponse={this.state.automatedResponse}
          negativeResponse={this.state.negativeReply} positiveResponse={this.state.positiveReply}/>
        </div>
      </CookiesProvider>
      
    );
  }
}

export default withCookies(App);
