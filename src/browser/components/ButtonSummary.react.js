import Button from '../../../lib/Button/Button.react';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class ButtonSummary extends Component {

  static propTypes = {
    onClick: PropTypes.func
  }

  render() {
    return (
      <section className="component-summary">
        <h3>Standard Button</h3>
        <Button onClick={e => {alert('clicked');}}
                text='test 123'
        />
      </section>
    );
  }

}
