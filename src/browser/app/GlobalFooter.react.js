import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class GlobalFooter extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  }

  render() {
    const {msg} = this.props;

    return (
      <footer>
        <p>
          {msg.copywrite}
        </p>
      </footer>
    );
  }

}
