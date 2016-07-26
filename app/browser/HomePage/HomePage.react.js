import Component from 'react-pure-render/component';
import { Link } from 'react-router';
import React from 'react';

export default class HomePage extends Component {
  render() {
    return (
      <section className="home-page">
        <Link to="/button">
          Button
        </Link>
      </section>
    );
  }

}
