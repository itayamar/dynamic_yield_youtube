import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YoutubeResultListItem.css';
import alarmClockIcon from '../alarmClock.png'

class YoutubeResultListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWatchLaterDisplayed: false
        };
    }

    handleHover = () => {
        this.setState({isWatchLaterDisplayed: !this.state.isWatchLaterDisplayed})
    };

    handleSaveForLaterClick = (e) =>{
        if(this.state.isSaved) return;
        this.setState({isSaved: !this.state.isSaved});
        this.props.saveForLaterCb(this.props.searchResultItem);
        e.stopPropagation();
    };

    handleClick = () =>{
        this.props.playVideoCb(this.props.searchResultItem);
    };

    render() {
        let watchLaterBtnStyle = {
            //do not display the watch later btn if already clicked / not hovered
            display: this.state.isWatchLaterDisplayed && !this.props.isSaved ? "block" : "none"
        };

        let nowPlayingElem = this.props.isPlaying ? <div className="now-playing">Playing</div> : '';
    return (
        <div className="youtubeResultListItem" onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} onClick={this.handleClick}>
            <img className="video-thumbnail" src={this.props.searchResultItem.snippet.thumbnails.default.url}/>
            <div className="watch-later-btn" style={watchLaterBtnStyle}>
                <img src={alarmClockIcon} className="alarm-clock-img" alt="save for later" onClick={this.handleSaveForLaterClick}/>
            </div>
            {nowPlayingElem}
        </div>
);
  }
}

YoutubeResultListItem.propTypes ={
    searchResultItem: PropTypes.object,
    saveForLaterCb: PropTypes.func,
    playVideoCb: PropTypes.func,
    isPlaying: PropTypes.bool,
    isSaved: PropTypes.bool
};

export default YoutubeResultListItem;