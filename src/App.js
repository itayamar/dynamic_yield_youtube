import React, {Component} from 'react';
import './App.css';
import YoutubeSearch from './components/YoutubeSearch'
import YoutubeResultList from './components/YoutubeResultList';
import SavedVideos from "./components/SavedVideos";
import YoutubePlayer from './components/YoutubePlayer';
import SaveForLaterDialog from './components/SaveForLaterDialog'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youtubeSearchResults: [],
            isVideoPlayerDisplayed: false,
            isSaveForLaterDialog: false,
            savedVideos: localStorage.getItem('savedVideos') || []
        }
    }

    updateSearchResultsVideos = (searchResults) => {
        this.setState({
            youtubeSearchResults: searchResults,
            isSaveForLaterDialog: false
        });
    };

    handleSaveForLater = (videoItem)=>{
        let savedVideos = this.state.savedVideos;
        savedVideos.push(videoItem);
        this.setState({savedVideos: savedVideos});
        console.log(savedVideos);
        this.toggleSaveForLaterDialog();
    };


    toggleSaveForLaterDialog = () => {
        this.setState({isSaveForLaterDialog: !this.state.isSaveForLaterDialog});
    };

    toggleVideoPlayer = ()=>{
        this.setState({isVideoPlayerDisplayed: !this.state.isVideoPlayerDisplayed})
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
                    <YoutubeResultList searchResults={this.state.youtubeSearchResults} saveForLaterCb={this.handleSaveForLater}/>
                    {this.state.isVideoPlayerDisplayed ? <div className="video-player-container">
                        <YoutubePlayer onClosePlayerCb={this.toggleVideoPlayer}/>
                    </div>: '' }

                    {this.state.isSaveForLaterDialog ? <SaveForLaterDialog closeCb={this.toggleSaveForLaterDialog}/> : ''}
                </div>


            </div>
        );
    }
}

export default App;
