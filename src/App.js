import React, {Component} from 'react';
import './App.css';
import YoutubeSearch from './components/YoutubeSearch'
import YoutubeResultList from './components/YoutubeResultList';
import SavedVideos from "./components/SavedVideos";
import YoutubePlayer from './components/YoutubePlayer';
import SaveForLaterDialog from './components/SaveForLaterDialog';
import SavedVideosList from './components/SavedVideosList';

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
            currentlyPlayingVideo: null,
            isSavedVideosDisplayed: false,
            searchQuery: ''
        }
    }

    updateSearchResultsVideos = (searchResults) => {
        this.setState({
            youtubeVideosSearchResults: searchResults.filter((searchItem)=>{
                return searchItem.id.kind === 'youtube#video';
            }),
            isSaveForLaterDialog: false,
            isSavedVideosDisplayed: false,
            currentlyPlayingVideo:null
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
    };

    handleSavedVideosClick = ()=>{
        this.setState({isSavedVideosDisplayed: true, searchQuery: ''});
    };

    handleRemoveSaved = (videoToRemove)=>{
        let savedVideos = this.state.savedVideos.filter((video)=>{return video.id.videoId !== videoToRemove.id.videoId});
        this.setState({savedVideos: savedVideos});
    };

    onQueryChange = (query)=> {
        this.setState({searchQuery: query});
    };

    render() {
        let resultsElem = <div className="resultsContainer">
            <YoutubeResultList searchResults={this.state.youtubeVideosSearchResults}
                               savedForLaterVideos={this.state.savedVideos}
                               currencyPlaying={this.state.currentlyPlayingVideo}
                               saveForLaterCb={this.handleSaveForLater} playVideoCb={this.toggleVideoPlayer}/>
            {this.state.isSaveForLaterDialog ? <div className="save-for-later-dialog-container" onClick={this.toggleSaveForLaterDialog}>
                <SaveForLaterDialog closeCb={this.toggleSaveForLaterDialog}/>
            </div> : ''}
        </div>;

        let savedVideosElem = <div className="saved-videos-container">
            <SavedVideosList savedVideos={this.state.savedVideos}
                             currencyPlaying={this.state.currentlyPlayingVideo}
                             removeSavedCb={this.handleRemoveSaved}
                             playVideoCb={this.toggleVideoPlayer}/>
        </div>;

        let youtubePlayerElem = this.state.isVideoPlayerDisplayed && this.state.currentlyPlayingVideo ? <div className="video-player-container">
                <YoutubePlayer onClosePlayerCb={this.toggleVideoPlayer}
                               videoId={this.state.currentlyPlayingVideo && this.state.currentlyPlayingVideo.id ? this.state.currentlyPlayingVideo.id.videoId: this.state.currentlyPlayingVideo}/>
            </div>: '' ;

        return (
            <div className="App">

                <header>
                    Dynamic Yeild YouTube
                </header>

                <div className="search-saved-container">
                    <YoutubeSearch query={this.state.searchQuery}
                                   updateQueryCb={this.onQueryChange}
                                   updateSearchResultsCb={this.updateSearchResultsVideos}/>
                    <SavedVideos savedVideos={this.state.savedVideos} onClickCb={this.handleSavedVideosClick} />
                </div>

                <section className="videos-container">
                    {this.state.isSavedVideosDisplayed ? savedVideosElem : resultsElem }
                    {youtubePlayerElem}
                </section>

            </div>
        );
    }
}

export default App;
