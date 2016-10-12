import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import {parseString} from 'xml2js';

async function loadBloombergFeed() {
  return new Promise(function(resolve, reject) {
    let x = new XMLHttpRequest();
    x.open("GET", "https://crossorigin.me/https://www.bloomberg.com/feeds/podcasts/etf_report.xml", true);
    x.onreadystatechange = function () {
      if (x.readyState === 4 && x.status === 200)
      {
        var doc = x.response;
        parseString(doc, function(err, result) {
          if(!err) {
            resolve(result.rss.channel[0]);
          } else {
            reject(err);
          }
        })
      }
    };
    x.send(null);
  }) 
}

class App extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  async componentDidMount(){ 
    let feed = await loadBloombergFeed();  
    console.log(feed);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
