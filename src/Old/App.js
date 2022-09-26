import React, { useState, useEffect, Component } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import APICommunicator from './components/APICommunicator';


 class App extends Component {
  state = {value: '', receive: 'Something'};

  getData = async() => {
      const response = await fetch("https://j8zwyrwj3b.execute-api.us-east-1.amazonaws.com/dev/Ellie/said");
      const text = await response.text();
      await this.setState({receive: text});
  };

  postData = async(event) => {
    event.preventDefault();
    const send = await fetch("https://j8zwyrwj3b.execute-api.us-east-1.amazonaws.com/dev/Ellie/said", {method: "POST", body: this.state.value});
    const text = await send.text();
    await this.setState({receive: text});
    console.log("Received: " + this.state.receive);
  };  

  textChange = async(event) => {
    console.log("here");
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div class="clearfix">
        <APICommunicator postData={this.postData} onChange={this.textChange}/>
        <h1 class="display-6">{this.state.receive}</h1>
        <button class="btn btn-info" onClick={this.getData}>Get Data</button>
      </div>
    );
  }
}

export default App;