import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import {parseString} from 'xml2js';
import Spinner from 'react-spinkit';
import dummyData from './dummyData';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

async function loadBloombergFeed() {
  return new Promise(function(resolve, reject) {
    resolve(dummyData);
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
    // Here we bind the current context so we can call
    // setState on our component from componentDidMount
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      feed: {
        item: []
      },
      loading: true
    }
  }
  async componentDidMount(){ 
    let feed = await loadBloombergFeed();
    // Pick the first 20  
    feed.item = feed.item.slice(1,20);
    this.setState({feed: feed, loading: false});
    console.log(feed);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button type="button" onClick={this.playAll} className="btn btn-default">Play All</button>
        <div className="App-intro row">
            {this.state.feed.item
              .map((item, i) => (
                  <div>
                    <h1>{item.title[0]}</h1>
                    <div style={{'textOverflow': 'ellipsis'}}>{item['itunes:summary'][0]}</div>
                    <audio className="player" controls>
                      <source src={item.link[0]} type='audio/mp3' />
                    </audio>
                  </div>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
