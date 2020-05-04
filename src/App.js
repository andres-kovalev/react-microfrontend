import React from 'react';
import * as Router from 'react-router-dom'

// host context - we can also provide it for apps
const HostContext = React.createContext({})

// host app provider - holds all loaded components, so we can reload all apps by re-mounting this one
const HostProvider = ({ children, dependencies }) => {
  const [ components, setComponents ] = React.useState({})
  const getComponent = React.useCallback((name) => {
    if (components[name]) {
      return components[name]
    }

    // another hack (i just don't want to spend time on CRA config, so just put this one here)
    setTimeout(() => {
      window.load(name)
        .then(
          ({ createComponent }) => setComponents({
            ...components,
            [name]: createComponent({
              ...dependencies,
              host: { MicroFrontend }
            })
          })
        ).catch((error) => {
          console.error(error)

          setComponents({
            ...components,
            [name]: createErrorComponent(name)
          })
        })
    }, 100)

    return Loader
  }, [ components ])

  return (
    <HostContext.Provider value={ getComponent }>
      { children }
    </HostContext.Provider>
  )
}

// container for micro-frontend apps
function MicroFrontend({ name, ...props }) {
  const getComponent = React.useContext(HostContext)
  const Component = getComponent(name)

  return (
    <Component { ...props } />
  )
}

// fallback (we can show this one while loading micro-frontend app)
function Loader() {
  return <div>loading...</div>
}

// plug to show when micro-frontend app loading failed
function createErrorComponent(name) {
  return () => (
    <div>error loading { name }...</div>
  )
}

function App() {
  return (
    // specify dependencies here
    <HostProvider dependencies={{ React, Router }}>
      <Router.BrowserRouter>
        <div id='app'>
          <div id='links'>
            <div>
              <Router.Link to='/first'>First</Router.Link>
            </div>
            <div>
              <Router.Link to='/second'>Second</Router.Link>
            </div>
            <div>
              <Router.Link to='/wrong'>Wrong</Router.Link>
            </div>
          </div>
          <div id='content'>
            <Router.Switch>
              <Router.Route
                exact
                path='/first'
                render={
                  () => <MicroFrontend name='first' />
                }
                />
              <Router.Route
                path='/second'
                render={
                  // micro-frontend app can consume additional arguments
                  () => <MicroFrontend name='second' value='hello' />
                }
                />
            </Router.Switch>
          </div>
        </div>
      </Router.BrowserRouter>
    </HostProvider>
  );
}

export default App;
