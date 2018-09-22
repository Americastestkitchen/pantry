import React, { Component, PropTypes } from 'react';

export default class Html extends Component {

  static propTypes = {
    bodyHtml: PropTypes.string.isRequired
  }

  render() {
    const { bodyHtml } = this.props;

    const fontStyles = (
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Merriweather:400,300,700,700italic,400italic,300italic&subset=latin,latin-ext"
        rel="stylesheet"
        type="text/css"
      />
    );

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          {fontStyles}
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </html>
    );
  }

}
