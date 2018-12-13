import React, {Component} from 'react';
import './App.css';
import YoutubeSearch from './components/YoutubeSearch'
import YoutubeResultList from './components/YoutubeResultList';
import SavedVideos from "./components/SavedVideos";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youtubeSearchResults: [],
            savedVideos: localStorage.getItem('savedVideos') || []
        }
    }

    updateSearchResultsVideos = (searchResults) => {
        // console.log(JSON.stringify(searchResults));

        this.setState({
            youtubeSearchResults: searchResults
        });
    };

    render() {
        return (
            <div className="App">

                <header>
                    Dynamic Yeild YouTube
                </header>

                <div className="search-container">
                    <YoutubeSearch updateSearchResultsCb={this.updateSearchResultsVideos}/>
                    <SavedVideos savedVideos={this.state.savedVideos}/>
                </div>
                <div className="resultsContainer">
                    <YoutubeResultList searchResults={this.state.youtubeSearchResults}/>
                </div>
            </div>
        );
    }
}

export default App;
