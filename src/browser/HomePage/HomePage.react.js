import ButtonSummary from '../components/ButtonSummary.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';

export default class HomePage extends Component {

  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const { msg: { HomePage: msg } } = this.props;

    return (
      <section className="home-page">
        <Helmet title={msg.title} />
        <h2>{msg.componentHeader}</h2>
        <ButtonSummary />
      </section>
    );
  }

}
