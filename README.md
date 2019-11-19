# pantry

`@atk/pantry` is a Pattern Library for re-usable React components at America's Test Kitchen.

## Setting up pantry

pantry depends on node version 12.6.0. If you aren't using node 12.6.0, you will need to install it.
You can use a node version manager such as [nvm](https://github.com/creationix/nvm) to install node 12.6.0
if you dont' have it.

```
$ git clone git@github.com:Americastestkitchen/pantry.git
$ npm install
```

## Running the app

There is a basic site available within pantry that exposes the components available in the project.
The code for the app lives in the `app` folder at the root of the project.

To run the server:
```
$ gulp
```

There are also tests available for all components included in pantry.

To run the tests:
```
$ gulp test
```

The home page is a list of components in pantry. Each component has a route associated with it that will render that component.
The route for GlobalHeader would be /global_header.

## Using components in your project

#### Javascript

This example assumes you are including the `PageTitle` pantry widget within a local container component named `DetailPage`.

```javascript
import {PageTitle} from '@atk/pantry';
import React, {PropTypes} from 'react';

export default class DetailPage extends Component {
  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg: {detail: msg}} = this.props;
    return (
      <main className='detail-main'
            role="main">
        <PageTitle text={msg.buttonText}/>
      </main>
    );
  }
}
```

#### SCSS

From within your container component's css file, import the relevant scss files from your project's node_modules directory.

_NOTE: This process is still TBD_

```scss
# DetailPage.scss
@import '~@atk/pantry/dist/Button/Button';

.detail-page {
  button {
    @include pantry-button;
  }
}

```

All of the defined styles will be imported into your stylesheet at build time.
You can use any of the mixins defined in this package as normal.

## Creating a new component

### Development
```
# 1) Clone the `pantry` GitHub repository
$ git clone https://github.com/Americastestkitchen/pantry.git

# 2) `cd` into the `pantry` directory
$ cd pantry

# 3) Create a new project branch based on `develop` (see below for branch naming conventions)
$ git checkout develop
$ git checkout -b jd-ATK-123

# 4) Develop your new component, using the following pattern.

#  -- React component
#  -- SCSS file
#  -- Tests
$ mkdir src/PageTitle
$ mkdir src/PageTitle/__test__
$ touch src/PageTitle/__test__/PageTitle.spec.js
$ touch src/PageTitle/PageTitle.react.js
$ touch src/PageTitle/PageTitle.scss

# Add an export directive to `src/index.js`
exports.PageTitle = import PageTitle from './components/PageTitle';

# Add a link for the component to the Home Page and add a route for the component.

# 5) Update the minor release version in ./package.json (was previously 1.0.0 in this example)
{
  "name": "atk-pantry",
  "version": "1.1.0",
  ...
}

# 6) Publish your changes to github
$ git add .
$ git commit -m "A new component in all its awesomeness"
$ git push origin jd-ATK-123

# 7) Open PR, have PR reviewed, merge PR to develop
# 8) Merge develop to master

# IMPORTANT - this should happen in master
# 9) Transpile assets and move stylesheets to `dist`
$ gulp dist

# 10) Tag your changes for npm and GitHub
#   - https://docs.npmjs.com/getting-started/semantic-versioning
#   - https://docs.npmjs.com/cli/version
$ npm version major|minor|patch -m "release message"

# 11) Publish the updated `atk-pantry` package to npm
$ npm publish --access=public

```

### Development Troubleshooting

If you would like to preview some new component development you are doing in your local environment, you can install the `@atk/pantry` npm package from local source. To do this, for example, within in `atk` uninstall the existing `@atk/pantry` package and then install from a local directory:
```
$ npm uninstall @atk/pantry
$ npm install /path/to/pantry
```
Note: When working in this manner, for any new changes to show in `atk`, you will need to make the change in `pantry`, run `gulp dist`, `npm uninstall` and `npm install` all over again. As such, it is generally more advisable to do the component development directly within `pantry`'s `jumper_cables` environment or within `atk` and then export the finished component to `pantry`.


## Updating an existing component

To Update an existing component, follow the same procedure as creating a new component, being sure to increment the version number by running the `npm publish major|minor|patch` command.

## Style guide

### Directory structure

```
PageTitle
│   PageTitle.scss
│   PageTitle.react.js
│
└───__test__
    │   PageTitle.spec.js
```

### Javascript
```
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class PageTitle extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    const {text} = this.props;

    return (
      <h1 className='page-title'>
        {text}
      </h1>
    );
  }
}

```

### SCSS

Each component created within `pantry` can optionally include a companion `.scss` file. This file should ideally contain only highly configurable `@mixin` declarations. By developing in this manner, the final implementation details are determined by the consuming style sheet and are not dictated by the component itself. For more examples, see [DoCSSa](http://docssa.info/#components).

```
# each mixin should be prefixed with 'pantry-'
# scss files should be linted prior to release
@mixin pantry-button($backgroundColor: #ff0000, $textColor: #ffffff) {
  background-color: $backgroundColor;
  border: 1px solid gray;
  color: $textColor;
  padding: .5em 1em;
  text-decoration: none;
  border-radius: 3px;

  &:hover {
    background:darken($backgroundColor,8%);
    transition: all 0.3s ease;
  }
  &:active {
    background:darken($backgroundColor,25%);
  }
}
```
