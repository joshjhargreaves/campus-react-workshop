## Prerequisites
### Node 
[Install node.js](https://nodejs.org/en/download/)
Running the installer should install node and npm <br>
You should be able to run 'node --version && npm --version' from your command line without errors.

### create-react-app
Create-react-app is a handy utility for creating React apps with zero confiugration.
We can install it and use it to create ourselves a react application below. 

```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start

```

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Display a list of podcasts
We're going to be editing src/app.js.<br>
This is where our main component is that is being rendered to the screen when we run `npm start`.

```js
class App extends Component {
  constructor() {
    super();
    // Here we bind the current context so we can call
    // setState on our component from componentDidMount
    this.componentDidMount = this.componentDidMount.bind(this);
    // Configure our initial state
    this.state = {
      feed: {
        item: []
      },
      loading: true
    }
  }
  async componentDidMount(){ 
   //Do something
  }
  render() {
    return (
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
    )
  }
```

For each one of our items in `this.state.feed.item` we will render a `div` with the title and an `audio` element with the mp3 as the source. 


Firstly we are going to fetch some Bloomberg podcasts with the below code. 

```js
async function loadBloombergFeed() {
  return new Promise(function(resolve, reject) {
    // Here we can resolve with some 'fake' data if we want
    // resolve(dummyData);
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

```
