import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Header extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  }

  render() {
    const {msg} = this.props;

    return (
      <header>
        <h1>
          {msg.title}
        </h1>
      </header>
    );
  }

}
