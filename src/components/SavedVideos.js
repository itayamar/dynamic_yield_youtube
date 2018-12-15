import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SavedVideos.css';
import saveIcon from '../Save-icon.png'
import YoutubeSearch from "./YoutubeSearch";


class SavedVideos extends Component {
render() {
    return (
      <div className="savedVideos" onClick={this.props.onClickCb}>
          <img className="saved-icon" src={saveIcon} alt="saved videos"/>
          <span className="saved-indicator">{this.props.savedVideos.length}</span>
      </div>
    );
  }
}

YoutubeSearch.propTypes ={
    savedVideos: PropTypes.array,
    onClickCb: PropTypes.func
};

export default SavedVideos;