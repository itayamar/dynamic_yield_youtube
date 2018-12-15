import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YoutubeResultListItem from './YoutubeResultListItem';
import './YoutubdResultList.css';

class YoutubeResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let listItemsElements = this.props.searchResults.map((item,index)=>{
            let isSavedForLater = !!this.props.savedForLaterVideos.filter((videoItem)=>{return videoItem.id.videoId === item.id.videoId}).length;
            let isCurrentlyPlaying = this.props.currencyPlaying && this.props.currencyPlaying.id && item.id.videoId === this.props.currencyPlaying.id.videoId;
            return <YoutubeResultListItem searchResultItem={item} key={index}
                                          saveForLaterCb={this.props.saveForLaterCb}
                                          isPlaying={isCurrentlyPlaying}
                                          isSaved={isSavedForLater}
                                          playVideoCb={this.props.playVideoCb}/>
        });


        return (
            <div className="youtubeResultList">
                {listItemsElements}
            </div>
        );
    }
}

YoutubeResultList.propTypes ={
    searchResults: PropTypes.array,
    saveForLaterCb: PropTypes.func,
    playVideoCb: PropTypes.func,
    currencyPlaying: PropTypes.object,
    savedForLaterVideos: PropTypes.array
};

export default YoutubeResultList;