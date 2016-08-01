import classnames from 'classnames';
import Component from 'react-pure-render/component';
import { Link as ReactLink, IndexLink } from 'react-router';
import React, { PropTypes } from 'react';

export default class Link extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element.isRequired,
      PropTypes.string.isRequired,
      PropTypes.array.isRequired
    ]),
    className: PropTypes.string,
    deviceType: PropTypes.string,
    eventName: PropTypes.string,
    eventParams: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    target: PropTypes.string,
    title: PropTypes.string,
    trackingCodeParameter: PropTypes.string,
    queryParamTrackingCodes: PropTypes.func
  }

  static defaultProps = {
    href: '#link'
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    if (this.context && this.context.router) {
      this.listener = this.context.router.listen(this.doUpdate.bind(this));
    }
  }

  componentWillUnmount() {
    if (this.listener) this.listener();
  }

  doUpdate() {
    this.forceUpdate();
  }

  render() {
    let element = null;
    const {
      className,
      deviceType,
      eventName,
      eventParams,
      href,
      onClick,
      style,
      target,
      title,
      trackingCodeParameter,
      queryParamTrackingCodes
    } = this.props;

    let finalHref = href;
    if (trackingCodeParameter && deviceType && typeof queryParamTrackingCodes !== 'undefined') {
      const multiSiteCodeParameters = ['renewal_header_cta', 'upgrade_header_cta'];
      const mulitSiteCheck = multiSiteCodeParameters.includes(trackingCodeParameter);
      const params = queryParamTrackingCodes(trackingCodeParameter, deviceType, mulitSiteCheck);
      const paramsFinal = href.includes('?') ? params.replace('?', '&') : params;
      finalHref = `${href}${paramsFinal}`;
    }
    if (href === '/') {
      /* use IndexLink to prevent always active state */
      element = (
        <IndexLink activeClassName="active"
          className={classnames(className)}
          to={finalHref}
          onClick={onClick}
          style={style}
          title={title}
          data-event={eventName}
          data-event-params={eventParams}
        >
          {this.props.children}
        </IndexLink>
      );
    } else if (finalHref.match(/^(\/\/|http|#)/)) {
      /* Using LinkBase for fully qualified urls */
      element = (
        <a
          className={classnames(className)}
          href={finalHref}
          key={href}
          onClick={onClick}
          style={style}
          target={target}
          title={title}
          data-event={eventName}
          data-event-params={eventParams}
        >
          {this.props.children}
        </a>
      );
    } else {
      /* Fallback to react-router Link */
      element = (
        <ReactLink activeClassName="active"
          className={classnames(className)}
          to={finalHref}
          onClick={onClick}
          style={style}
          target={target}
          title={title}
          data-event={eventName}
          data-event-params={eventParams}
        >
          {this.props.children}
        </ReactLink>
      );
    }
    return element;
  }
}
