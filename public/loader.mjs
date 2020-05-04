function load(name) {
    return import(`./micro-apps/${name}.mjs`)
}

window.load = load