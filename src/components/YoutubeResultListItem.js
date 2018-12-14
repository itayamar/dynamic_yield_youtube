import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YoutubeResultListItem.css';
import alarmClockIcon from '../alarmClock.png'

class YoutubeResultListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWatchLaterDisplayed: false,
            isWatchLaterToggled: false,
            isCurrentlyPlaying: false
        };
    }

    handleHover = () => {
        this.setState({isWatchLaterDisplayed: !this.state.isWatchLaterDisplayed})
    };

    handleSaveForLaterClick = () =>{
        if(this.state.isWatchLaterToggled) return;
        this.setState({isWatchLaterToggled: !this.state.isWatchLaterToggled});
        this.props.saveForLaterCb(this.props.searchResultItem);
    };

    render() {
        let watchLaterBtnStyle = {
            //do not display the watch later btn if already clicked / not hovered
            display: this.state.isWatchLaterDisplayed && !this.state.isWatchLaterToggled ? "block" : "none"
        };

        let nowPlayingElem = <div className="now-playing">Playing</div>
    return (
        <div className="youtubeResultListItem" onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
            <img src={this.props.searchResultItem.snippet.thumbnails.default.url}/>
            <div className="watch-later-btn" style={watchLaterBtnStyle}>
                <img src={alarmClockIcon} className="alarm-clock-img" alt="save for later" onClick={this.handleSaveForLaterClick}/>
            </div>

        </div>
);
  }
}

YoutubeResultListItem.propTypes ={
    searchResultItem: PropTypes.object,
    saveForLaterCb: PropTypes.func
};

export default YoutubeResultListItem;