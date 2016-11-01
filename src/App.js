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
    setTimeout(()=>{resolve(dummyData)}, 1000);
    /*let x = new XMLHttpRequest();
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
    x.send(null);*/
  })
}

class App extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.playAll = this.playAll.bind(this);
    this.state = {
      feed: {
        item: []
      },
      loading: true,
      filterValue: "",
      playingAll: false
    }
  }
  async componentDidMount(){ 
    let feed = await loadBloombergFeed();  
    feed.item = feed.item.slice(1,20);
    this.setState({feed: feed, loading: false});
    console.log(feed);
  }
  handleChange(event) {
    this.setState({filterValue: event.target.value});
  }
  playAll() {
    //Complete functionality there
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <input
          className="form-control"
          type="text"
          value={this.state.filterValue}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.playAll} className="btn btn-default">Play All</button>
        <div className="App-intro row">
          {(() => {
            if (this.state.loading) {
              return <Spinner style={{paddingTop: 20}} spinnerName="three-bounce" />
            }
          })()}
          <ReactCSSTransitionGroup 
            transitionName="example" 
            transitionEnterTimeout={500} 
            transitionLeaveTimeout={300}>
            {this.state.feed.item
              .filter((item, i) => { 
                return this.state.filterValue != "" ? item.title[0].startsWith(this.state.filterValue): true})
              .map((item, i) => (
                <div className="col-md-4 panel panel-defaul" style={{'height': 400, 'overflow': 'hidden'}} key={i}>
                  <div className="panel-body">
                    <h1>{item.title[0]}</h1>
                    <div style={{'textOverflow': 'ellipsis'}}>{item['itunes:summary'][0]}</div>
                    <audio className="player" controls>
                      <source src={item.link[0]} type='audio/mp3' />
                    </audio>
                  </div>
                </div>
            ))}
          </ReactCSSTransitionGroup> 
        </div>
      </div>
    );
  }
}

export default App;
