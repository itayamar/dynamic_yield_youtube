import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YoutubePlayer.css';

class YoutubePlayer extends Component {
render() {

    let url = `http://www.youtube.com/embed/${this.props.videoId}`;
    return (
      <div className="video-player">
          <button className="close-btn" onClick={this.props.onClosePlayerCb}>X</button>
          <iframe src={url} type="text/html" className="video-player-iframe" frameBorder="0"></iframe>
      </div>
    );
  }
}

YoutubePlayer.propTypes ={
    videoId: PropTypes.string,
    onClosePlayerCb: PropTypes.func
};

export default YoutubePlayer;