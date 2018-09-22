import classnames from 'classnames';
import Component from 'react-pure-render/component';
import LinkList from '../LinkList/LinkList.react';
import React, { PropTypes } from 'react';
import ToggleArrow from './ToggleArrow.react';

export default class ToggleNav extends Component {

  static propTypes = {
    baseUrl: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired,
    ]),
    header: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    selected: PropTypes.string
  }

  static defaultProps = {
    header: '',
    selected: null
  }

  constructor(props) {
    super(props);
    this.open = false;
    this.linkClickListener = this.linkClickListener.bind(this);
    this.windowClickListener = this.handleWindowClick.bind(this);
  }

  componentWillUnmount() {
    this.stopListeningForClick();
  }

  getItemTitleBySlug(items, selected) {
    const category = items.find((item) => item.slug === selected);
    return category && category.title || this.props.header;
  }

  linkClickListener(e) {
    e.preventDefault();
    this.toggle();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  handleLinkClick(e) {
    this.toggle();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  handleWindowClick() {
    if (this.open) {
      this.toggle();
    }
  }

  startListeningForClick() {
    window.addEventListener('click', this.windowClickListener);
  }

  stopListeningForClick() {
    window.removeEventListener('click', this.windowClickListener);
  }

  toggle() {
    this.refs.el.classList.toggle('active');
    this.open = !this.open;
    setTimeout(() => {
      if (this.open) {
        this.startListeningForClick();
      } else {
        this.stopListeningForClick();
      }
    }, 0);
  }

  render() {
    const { baseUrl, className, data, header, selected } = this.props;

    return (
      <section className={classnames('toggle-nav', className)}
        ref="el"
      >
        <div
          className="toggle-nav__header-wrapper"
          onClick={this.linkClickListener}
        >
          <a className="toggle-nav__header"
            href={'#show-menu'}
          >
            {selected ? this.getItemTitleBySlug(data, selected) : header}
          </a>
          <ToggleArrow />
        </div>
        <LinkList className="toggle-nav__list"
          baseUrl={baseUrl}
          data={data}
          onClick={this.handleLinkClick.bind(this)}
        />
      </section>
    );
  }
}
