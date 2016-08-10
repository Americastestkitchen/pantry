import Component from 'react-pure-render/component';
import GlobalHeaderAccount from '../GlobalAccountHeader/GlobalAccountHeader.react';
import LinkBase from '../LinkBase/LinkBase.react';
import NavAtk from './icons/NavAtk.react';
import NavBookStore from './icons/NavBookStore.react';
import NavCookingSchool from './icons/NavCookingSchool.react';
import NavCooksCountry from './icons/NavCooksCountry.react';
import NavCooksIllustrated from './icons/NavCooksIllustrated.react';
import NavCooksScience from './icons/NavCooksScience.react';
import NavRadio from './icons/NavRadio.react';
import NavShop from './icons/NavShop.react';
import React, { PropTypes } from 'react';

const messages = {
  ATK: 'AMERICA\'S TEST KITCHEN',
  CIO: 'COOK\'S ILLUSTRATED',
  CCO: 'COOK\'S COUNTRY',
  CSO: 'COOK\'S SCIENCE',
  CookingSchool: 'COOKING SCHOOL',
  BookStore: 'BOOKSTORE',
  Shop: 'SHOP',
  Radio: 'RADIO'
};

export default class GlobalBrandsHeader extends Component {
  static propTypes = {
    deviceType: PropTypes.string,
    optionalComponent: PropTypes.func,
    user: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.user.auth_token !== this.props.user.auth_token;
  }

  render() {
    const { deviceType, optionalComponent, user } = this.props;
    const ATK = messages.ATK;
    const CIO = messages.CIO;
    const CCO = messages.CCO;
    const CSO = messages.CSO;
    const CookingSchool = messages.CookingSchool;
    const BookStore = messages.BookStore;
    const Shop = messages.Shop;
    const Radio = messages.Radio;

    return (
      <section className="global-header-brands">
        <div>
          <LinkBase
            className="global-header-brands__atk"
            href="/"
            target="_blank"
            title={ATK}
          >
            <span className="atk-brand-border"></span>
            <NavAtk />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="http://www.cooksillustrated.com"
            target="_blank"
            title={CIO}
            trackingCodeParameter={'cio_header_link'}
          >
            <NavCooksIllustrated />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="http://www.cookscountry.com"
            target="_blank"
            title={CCO}
            trackingCodeParameter={'cco_header_link'}
          >
            <NavCooksCountry />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="http://www.cooksscience.com"
            target="_blank"
            title={CSO}
            trackingCodeParameter={'sco_header_link'}
          >
            <NavCooksScience />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="http://www.onlinecookingschool.com"
            target="_blank"
            title={CookingSchool}
            trackingCodeParameter={'school_header_link'}
          >
            <NavCookingSchool />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="http://americastestkitchen.buysub.com/"
            target="_blank"
            title={BookStore}
            trackingCodeParameter={'book_store_header_link'}
          >
            <NavBookStore />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="https://shop.americastestkitchen.com/?utm_source=Nav&utm_medium=AKO&utm_term=Global&utm_content=Home&utm_campaign=Onsite" //eslint-disable-line
            target="_blank"
            title={Shop}
          >
            <NavShop />
          </LinkBase>
          <LinkBase
            className="global-header-brands__brand"
            deviceType={deviceType}
            href="/radio"
            target="_blank"
            title={Radio}
            trackingCodeParameter={'radio_header_link'}
          >
            <NavRadio />
          </LinkBase>
        </div>
        <div>
          <GlobalHeaderAccount
            deviceType={deviceType}
            includeAccount
            optionalComponent={optionalComponent}
            user={user}
          />
        </div>
      </section>
    );
  }
}
