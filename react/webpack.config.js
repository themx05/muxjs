const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                use: 'ts-loader', 
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', '.js'],
    },

    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
        library: "Mux",
        path: path.resolve(__dirname, 'lib'),
    },

    externals: {
        react: "react",
        "react-dom": "react-dom"
    }
}