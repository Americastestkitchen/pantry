import classnames from 'classnames';
import Component from 'react-pure-render/component';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

export default class LinkBase extends Component {

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
    if (trackingCodeParameter && deviceType) {
      const multiSiteCodeParameters = ['renewal_header_cta', 'upgrade_header_cta'];
      const mulitSiteCheck = multiSiteCodeParameters.includes(trackingCodeParameter);
      const params = queryParamTrackingCodes(trackingCodeParameter, deviceType, mulitSiteCheck);
      const paramsFinal = href.includes('?') ? params.replace('?', '&') : params;
      finalHref = `${href}${paramsFinal}`;
    }

    element = (
      <Link className={classnames(className)}
        to={finalHref}
        key={href}
        onClick={onClick}
        style={style}
        target={target}
        title={title}
        data-event={eventName}
        data-event-params={eventParams}
      >
        {this.props.children}
      </Link>
    );
    return element;
  }
}
