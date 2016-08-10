import classnames from 'classnames';
import Component from 'react-pure-render/component';
import Favorite from './Favorite.react';
import LinkBase from '../LinkBase/LinkBase.react';
import LoginLink from '../LoginLink/LoginLink.react';
import React, { PropTypes } from 'react';
import ToggleNav from '../ToggleNav/ToggleNav.react';

const messages = {
  favorites: 'My Favorites',
  logIn: 'Log In',
  register: 'REGISTER',
  support: 'Support',
  freeTrialCta: 'START FREE TRIAL',
  renewCta: 'RENEW',
  upgradeCta: 'UPGRADE'
};

export default class GlobalHeaderAccount extends Component {
  static propTypes = {
    deviceType: PropTypes.string,
    includeAccount: PropTypes.bool,
    optionalComponent: PropTypes.func,
    user: PropTypes.object.isRequired
  }

  static defaultProps = {
    includeAccount: false
  }

  renderUser() {
    const { deviceType, includeAccount, user } = this.props;
    const favorites = messages.favorites;
    const classNames = 'global-header-account__link button';
    let ctaLink = null;
    if (user.cta === 'upgrade') {
      const upgradeCta = messages.upgradeCta;
      ctaLink = (
        <LinkBase
          className={classnames(classNames, `global-header-account--${user.cta}-cta`)}
          deviceType={deviceType}
          href="/upgrade"
          target="_self"
          title={upgradeCta}
          trackingCodeParameter={'upgrade_header_cta'}
        >
          {upgradeCta}
        </LinkBase>
      );
    } else if (user.cta === 'register') {
      const registerCta = messages.register;
      ctaLink = (
        <LinkBase
          className={classnames(classNames, `global-header-account--${user.cta}-cta`)}
          deviceType={deviceType}
          href="/register"
          target="_self"
          title={registerCta}
          trackingCodeParameter={'anon_header_drawer'}
        >
          {registerCta}
        </LinkBase>
      );
    } else if (user.cta === 'trial' || user.cta === 'renew') {
      const cta = user.cta === 'trial' ? messages.freeTrialCta : messages.renewCta
      let parameter = 'registerant_header_cta';
      if (user.cta === 'renew') {
        parameter = 'renewal_header_cta';
      } else if ((user.cta === 'trial' && user.memberships_cancelled.includes('cio')) ||
        (user.cta === 'trial' && user.memberships_cancelled.includes('cco'))) {
        parameter = 'former_cio_or_cco_trial_header_cta';
      }
      ctaLink = (
        <LinkBase
          className={classnames(classNames, `global-header-account--${cta}-cta`)}
          deviceType={deviceType}
          href="/order"
          target="_self"
          title={cta}
          trackingCodeParameter={parameter}
        >
          {cta}
        </LinkBase>
      );
    }

    let accountMenu = null;
    if (includeAccount) {
      const options = [{
        slug: '/support',
        target: '_self',
        title: 'Support'
      }, {
        slug: '/user',
        target: '_self',
        title: 'Account'
      }, {
        slug: '/sign_out',
        title: 'Log Out'
      }];
      accountMenu = (
        <ToggleNav
          baseUrl=""
          className="basic global-nav-account"
          data={options}
          header={user.first_name || 'Account'}
        />
      );
    }

    return (
      <div className="global-header-account">
        <LinkBase className="global-header-account__link favorites"
          href="/favorites"
          target="_self"
          title={favorites}
        >
          <Favorite />
          {favorites}
        </LinkBase>
        {accountMenu}
        {ctaLink}
      </div>
    );
  }

  renderAnonymous() {
    const { optionalComponent, deviceType, user } = this.props;
    const logIn = messages.logIn;
    const support = messages.support;
    const classNames = 'global-header-account__link button';
    const registerCta = messages.register;

    const ctaLink = (
      <LinkBase
        className={classnames(classNames, `global-header-account--${user.cta}-cta`)}
        deviceType={deviceType}
        href="/register"
        target="_self"
        title={registerCta}
        trackingCodeParameter={'anon_header_drawer'}
      >
        {registerCta}
      </LinkBase>
    );
    return (
      <div className="global-header-account">
        <LinkBase
          className="global-header-account__link"
          href="/support"
          target="_self"
          title={support}
        >
          {support}
        </LinkBase>
        <LoginLink className="global-header-account__link"
          title={logIn}
        >
          {logIn}
        </LoginLink>
        {ctaLink}
        {optionalComponent()}
      </div>
    );
  }

  render() {
    const { user } = this.props;
    return user.first_name  ? this.renderUser() : this.renderAnonymous();
  }
}
