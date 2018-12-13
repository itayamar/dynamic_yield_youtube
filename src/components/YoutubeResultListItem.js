import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YoutubeResultListItem.css';

class YoutubeResultListItem extends Component {
render() {
    return (
        <div className="youtubeResultListItem">
            <img src={this.props.searchResultItem.snippet.thumbnails.default.url}/>
        </div>
);
  }
}

YoutubeResultListItem.propTypes ={
    searchResultItem: PropTypes.object
};

export default YoutubeResultListItem;