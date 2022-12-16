import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button className="Button" type="button" onClick={this.props.loadMore}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
