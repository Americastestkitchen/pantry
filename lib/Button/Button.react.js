import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    const {onClick, text} = this.props;

    return (
      <button className='button'
              onClick={e => {
                e.preventDefault();
                onClick();
              }}
      >
        {text}
      </button>
    );
  }
}
