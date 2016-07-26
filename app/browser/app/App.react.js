import '../main.scss';
import Component from 'react-pure-render/component';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import React, { PropTypes } from 'react';
import RouterHandler from '../../common/components/RouterHandler.react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { location: { pathname } } = this.props;
    return (
      <main
        className="content app"
        data-pathname={pathname}
      >
        <h1 className="app__header">
          <Link to="/">
            America's Test Kitchen - Pantry
          </Link>
        </h1>
        <RouterHandler {...this.props} />
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
