import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  }

  render() {
    const { onClick, text } = this.props;

    const buttonText = text ? text : 'Button';

    return (
      <div className="button">
        <button
          className='button__button'
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}
