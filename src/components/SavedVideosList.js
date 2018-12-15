import React, {Component} from 'react';
import PropTypes from 'prop-types';
import YoutubeResultListItem from './YoutubeResultListItem'

import './SavedVideosList.css';

class SavedVideosList extends Component {
    render() {
        let savedVideosElements = this.props.savedVideos.map((savedVideo, i) => {
            let isCurrentlyPlaying = this.props.currencyPlaying && this.props.currencyPlaying.id && savedVideo.id.videoId === this.props.currencyPlaying.id.videoId;

            return <div className="saved-video-container" key={i}>
                <div className="saved-video-content">

                    <YoutubeResultListItem playVideoCb={()=>{this.props.playVideoCb(savedVideo)}}
                                           isSaved={true}
                                           saveForLaterCb={()=>{}}
                                           searchResultItem={savedVideo}
                                           isPlaying={isCurrentlyPlaying}/>
                    <button className="remove-btn" onClick={() => {this.props.removeSavedCb(savedVideo)}}>remove</button>
                </div>

            </div>
        });

        return (
            <div className="saved-videos-list">
                {savedVideosElements}
            </div>
        );
    }
}

SavedVideosList.propTypes = {
    savedVideos: PropTypes.array,
    removeSavedCb: PropTypes.func,
    playVideoCb: PropTypes.func,
    currencyPlaying: PropTypes.object,
};

export default SavedVideosList;