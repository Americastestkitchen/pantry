import React, { Component, PropTypes } from 'react';

export default class Html extends Component {

  static propTypes = {
    bodyHtml: PropTypes.string.isRequired
  }

  render() {
    const { bodyHtml } = this.props;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </html>
    );
  }

}
