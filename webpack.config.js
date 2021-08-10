const nodeExternals = require("webpack-node-externals");

const web = {
    target: "web",
    entry: "./src/sheetsdb.js",
    output: {
        filename: "sheetsdb.min.js",
        globalObject: "this",
        library: {
            name: "sheetsdb",
            type: "umd"
        }
    }
}

const node = {
    target: "node",
    entry: "./src/sheetsdb.js",
    externals: [nodeExternals()],
    output: {
        filename: "sheetsdb-node.min.js",
        library: {
            name: "sheetsdb",
            type: "umd"
        }
    }
}

module.exports = [web, node];