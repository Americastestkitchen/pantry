import '../main.scss';
import Component from 'react-pure-render/component';
import GlobalFooter from './GlobalFooter.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import RouterHandler from '../../common/components/RouterHandler.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import { connect } from 'react-redux';


class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
  }

  render() {
    const { location: { pathname }, msg } = this.props;
    return (
      // Pass data-pathname to allow route specific styling.
      <main className="content app" data-pathname={pathname}>
        <Helmet
          meta={[{
            name: msg.meta.name,
            content: msg.meta.content
          }]}
          titleTemplate="this is a title"
        />
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <Header msg={msg.Header} />
        <RouterHandler {...this.props} />
        <GlobalFooter msg={msg.GlobalFooter} />
      </main>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
