// third micro-frontend app
export function createComponent({ React }) {
    return ({ children }) => React.createElement(
        'div',
        null,
        [
            'content is: ',
            children
        ]
    )
}