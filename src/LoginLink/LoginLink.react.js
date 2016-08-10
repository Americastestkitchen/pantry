import Component from 'react-pure-render/component';
import LinkBase from '../Link/Link.react';
import React, { PropTypes } from 'react';

export default class LoginLink extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    className: PropTypes.string,
    title: PropTypes.string
  }

  handleClick(e) {
    const blacklist = ['/sign_in', '/sign_out'];
    const loc = document.location.pathname;
    if (blacklist.indexOf(loc) === -1) {
      e.preventDefault();
      document.location.href = `/sign_in?next=${document.location.pathname}`;
      return false;
    }
    return true;
  }

  render() {
    const { children, className, title } = this.props;
    return (
      <LinkBase className={className}
        href="/sign_in"
        onClick={this.handleClick}
        title={title}
      >
        {children}
      </LinkBase>
    );
  }
}
