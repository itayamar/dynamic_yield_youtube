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
            return <YoutubeResultListItem searchResultItem={item} key={index} saveForLaterCb={this.props.saveForLaterCb}/>
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
    saveForLaterCb: PropTypes.func
};

export default YoutubeResultList;