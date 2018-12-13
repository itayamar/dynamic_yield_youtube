import React, { Component } from 'react';
import './App.css';
import YoutubeSearch from './components/YoutubeSearch'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchResultVideos:[]
        }
    }

    updateSearchResultsVideos = (searchResults) => {
        console.log(JSON.stringify(searchResults));

        this.setState({
          searchResultVideos: searchResults
      });
    };

    render() {
    return (
      <div className="App">

        <header>
          Dynamic Yeild YouTube
        </header>

        <YoutubeSearch updateSearchResultsCb={this.updateSearchResultsVideos}/>

      </div>
    );
  }
}

export default App;
