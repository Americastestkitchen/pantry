import classnames from 'classnames';
import Component from 'react-pure-render/component';
import Link from '../Link/Link.react';
import React, { PropTypes } from 'react';

export default class LinkList extends Component {

  static propTypes = {
    baseUrl: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired,
    ]),
    onClick: PropTypes.func
  }

  static defaultProps = {
    baseUrl: ''
  }

  /* this is a 'DUMB' component - once rendered it should not change. */
  /* NOTE: the parent component MAY change, in which case a new instance will be created */
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { baseUrl, className, data, onClick } = this.props;

    return (
      <ul className={classnames('link-list', className)}>
        {data.map(({ target, title, slug }, idx) =>
        <li key={idx}>
          <Link onClick={onClick}
            href={`${baseUrl}${slug}`}
            target={target}
          >
            {title}
          </Link>
        </li>
      )}
      </ul>
    );
  }
}
