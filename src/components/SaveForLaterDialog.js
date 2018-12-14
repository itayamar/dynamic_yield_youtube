import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SaveForLaterDialog.css'

class SaveForLaterDialog extends Component {
render() {
    return (
        <div className="save-for-later-dialog">
            <p>Video has been saved for later!</p>
            <span className="close-btn" onClick={this.props.closeCb}>X</span>
        </div>
    );
  }
}

SaveForLaterDialog.propTypes ={
    closeCb: PropTypes.func
};
export default SaveForLaterDialog;