const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "Hangman", "scripts", "index"),
    GameManager: path.resolve(
      __dirname,
      "Hangman",
      "scripts",
      "GameManager.js"
    ),
    userManager: path.resolve(
      __dirname,
      "Hangman",
      "scripts",
      "userDatabaseManager.js"
    ),
  },
  output: {
    filename: "[name].[hash].js", //the contentHas section
    path: path.resolve(__dirname, "./dist"),
    clean: true, //will delete unused files from dist folder
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "Hangman", "index.html"), //this will prompt webpack to use this as a template when generating the auto html file.
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    fallback: { crypto: false, buffer: false },
  },
};
