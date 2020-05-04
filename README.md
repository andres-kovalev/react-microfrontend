# react-microfrontend

React Micro-Frontend PoC app

## try

```sh
git clone ...
npm i
npm start
```

## how it work?

Each microapp should be in separate js/mjs module. Each module should expose `createComponent()` function which consumes object with dependencies including host app in `host` field. For instance:

```js
export function createComponent({ React, host }) {
    return () => React.createElement(
        ...
    )
}
```

Since it's just an example, `host` dependency contains only `MicroFrontend` component to render other micro apps.
