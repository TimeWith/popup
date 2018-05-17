# Popup

React redux-driven Popup system.

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install @time-with/popup
or
$ yarn add @time-with/popup
```

## Setup

Add the Component to the root Router of your React layout

    import Popup from '@time-with/popup'

    render() {
      return (
        <Router>
          <div id='layout-root'>
            <Popup />
            // ...

Import the reducer to your reducers combiner
    
    import { popupReducer } from '@time-with/popup';
    export {
      // other reducers
      popupReducer,
    };

## Usage

    import { popupActions } from '@time-with/popup';

    popupActions.showPopup( <SomeReactComponent /> );


## License

MIT
