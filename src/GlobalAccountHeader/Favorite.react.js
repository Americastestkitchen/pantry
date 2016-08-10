import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

export default class Favorite extends Component {
  static propTypes = {
    border: PropTypes.string,
    fill: PropTypes.string,
  }

  static defaultProps = {
    border: '#6BA6AA',
    fill: '#6BA6AA'
  }

  render() {
    const { border, fill } = this.props;
    /* eslint-disable */
    return (
      <svg width="17px" height="28px" viewBox="0 0 17 28" >
        <g id="Symbols" stroke="none" strokeWidth="1" fillRule="evenodd">
          <g id="Social-Bar/Mobile-Saved" transform="translate(-9.000000, 0.000000)" fill={border}>
            <g id="Icons-Copy">
              <g id="Saved" transform="translate(9.000000, 0.000000)">
                <polygon fill={fill} id="Path-2174" points="1.20117187 2.24414062 15.8398104 2.24414062 15.8398104 26.2086182 8.57897949 21.135376 1.20117187 26.3717041"></polygon>
                <path d="M8.45890382,20.461295 C8.6262592,20.461295 8.79378119,20.5154418 8.93298022,20.6243186 L14.8145765,25.2162205 L14.8145765,2.28886595 L2.10339771,2.28886595 L2.10339771,25.2162205 L7.98499402,20.6243186 C8.12410974,20.5154418 8.29171504,20.461295 8.45890382,20.461295 M15.5850444,27.5658602 C15.4165228,27.5658602 15.2490008,27.5106304 15.110968,27.4028365 L8.45898712,22.2094882 L1.80692293,27.4028365 C1.57492455,27.5843534 1.26020646,27.6175079 0.995053553,27.4875555 C0.730233856,27.358686 0.562461957,27.0897845 0.562461957,26.795309 L0.562461957,1.51839807 C0.562461957,1.09272061 0.907335673,0.747930197 1.33292983,0.747930197 L15.5851277,0.747930197 C16.0108052,0.747930197 16.3556789,1.09272061 16.3556789,1.51839807 L16.3556789,26.795309 C16.3556789,27.0897012 16.1878237,27.358686 15.9230873,27.4875555 C15.8157932,27.5402862 15.7003355,27.5658602 15.5850444,27.5658602" id="Page-1"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
    /* eslint-enable */
  }
}
