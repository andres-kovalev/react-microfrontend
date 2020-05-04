// second micro-frontend app
export function createComponent({ React, Router, host }) {
    return () => React.createElement(
        React.Fragment,
        null,
        [
            React.createElement(
                Router.Link,
                { to: '/second/deeper' },
                'Go deeper'
            ),
            React.createElement(
                Router.Route,
                {
                    exact: true,
                    path: '/second/deeper'
                },
                React.createElement(
                    // we can render another micro-frontend app inside
                    host.MicroFrontend,
                    {
                        name: 'third'
                    },
                    'DEEP CONTENT'
                )
            )
        ]
    )
}