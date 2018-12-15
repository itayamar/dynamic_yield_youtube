import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './YoutubeSearch.css'

const settings = require('../settings');

const maxResults = 50;
const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${settings.youtube_api_key}&part=snippet&maxResults=${maxResults}&q=`;

class YoutubeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    search = (e) =>{
        let self= this;
        let inputValue = e.target.value;
        let querySearchUrl = searchUrl + inputValue;

        self.props.updateQueryCb(inputValue);

        let performSearchFun = debounce(()=> {
            fetch(querySearchUrl)
                .then((response) => {
                    return response.json();
                })
                .then((searchResults) => {
                    self.props.updateSearchResultsCb(searchResults.items);
                });
        }, 500);

        if(!inputValue) {
            // do not search an empty string
            self.props.updateSearchResultsCb([]);
        }else{
            performSearchFun();
        }
    };

    render() {
        return (
            <div className="youtubeSearchContainer">
                <input className="youtubeSearch" type="text" value={this.props.query}  onChange={this.search}/>
            </div>
        );
    }
}

YoutubeSearch.propTypes ={
    updateSearchResultsCb: PropTypes.func,
    query: PropTypes.string,
    updateQueryCb: PropTypes.func
};

export default YoutubeSearch;


function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}