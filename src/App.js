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
        let savedVideos = localStorage.getItem('savedVideos');
        savedVideos = savedVideos ? JSON.parse(savedVideos) : [];
        this.state = {
            youtubeVideosSearchResults: [],
            isVideoPlayerDisplayed: false,
            isSaveForLaterDialog: false,
            savedVideos: savedVideos,
            currentlyPlayingVideo: null
        }
    }

    updateSearchResultsVideos = (searchResults) => {
        this.setState({
            youtubeVideosSearchResults: searchResults.filter((searchItem)=>{
                return searchItem.id.kind === 'youtube#video';
            }),
            isSaveForLaterDialog: false
        });
    };

    handleSaveForLater = (videoItem)=>{
        let savedVideos = this.state.savedVideos;
        if(savedVideos.filter((item)=>{return item.id.videoId === videoItem.id.videoId}).length) return;
        savedVideos.push(videoItem);
        this.setState({savedVideos: savedVideos});
        localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
        this.toggleSaveForLaterDialog();
    };


    toggleSaveForLaterDialog = () => {
        this.setState({isSaveForLaterDialog: !this.state.isSaveForLaterDialog});
    };

    toggleVideoPlayer = (videoItem)=>{
        let isVideoPlayerDisplayed = !!videoItem;
        videoItem = isVideoPlayerDisplayed ? videoItem : null;
        this.setState({currentlyPlayingVideo: videoItem, isVideoPlayerDisplayed: isVideoPlayerDisplayed});
        console.log('isVideoPlayerDisplayed', isVideoPlayerDisplayed, 'videoItem', videoItem);
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
                    <YoutubeResultList searchResults={this.state.youtubeVideosSearchResults}
                                       savedForLaterVideos={this.state.savedVideos}
                                       currencyPlaying={this.state.currentlyPlayingVideo}
                                       saveForLaterCb={this.handleSaveForLater} playVideoCb={this.toggleVideoPlayer}/>
                    {this.state.isVideoPlayerDisplayed && this.state.currentlyPlayingVideo ? <div className="video-player-container">
                        <YoutubePlayer onClosePlayerCb={this.toggleVideoPlayer}
                                       videoId={this.state.currentlyPlayingVideo && this.state.currentlyPlayingVideo.id ? this.state.currentlyPlayingVideo.id.videoId: this.state.currentlyPlayingVideo}/>
                    </div>: '' }

                    {this.state.isSaveForLaterDialog ? <SaveForLaterDialog closeCb={this.toggleSaveForLaterDialog}/> : ''}
                </div>


            </div>
        );
    }
}

export default App;
