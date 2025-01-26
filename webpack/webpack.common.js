'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: {
    CreationPage: './src/js/CreationPage.js',
    EventPage: './src/js/EventPage.js',
    ContactPage: './src/js/ContactPage.js',
    DropDiePage: './src/js/artistpages/DropDiePage.js',
    DVPEPage: './src/js/artistpages/DVPEPage.js',
    FiveOClockPage: './src/js/artistpages/FiveOClockPage.js',
    GuillaumeBeaulieuPage: './src/js/artistpages/GuillaumeBeaulieuPage.js',
    InterfluvPage: './src/js/artistpages/InterfluvPage.js',
    LaBaroqueriePage: './src/js/artistpages/LaBaroqueriePage.js',
    LionelBaudetPage: './src/js/artistpages/LionelBaudetPage.js',
    NACPage: './src/js/artistpages/NACPage.js',
    SireCamaraPage: './src/js/artistpages/SireCamaraPage.js',
    TheForgePage: './src/js/artistpages/TheForgePage.js',
    CatalogPage: './src/js/subpages/CatalogPage.js',
    MerchPage: './src/js/subpages/MerchPage.js',
    MusicPage: './src/js/subpages/MusicPage.js',
    PhotoPage: './src/js/subpages/PhotoPage.js',
    PodcastPage: './src/js/subpages/PodcastPage.js',
    SoftwarePage: './src/js/subpages/SoftwarePage.js',
    VideoPage: './src/js/subpages/VideoPage.js'
  },
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../assets/dist'),
    library: '[name]', // We set a library name to bundle the export default of the class
    libraryTarget: 'window', // Make it globally available
    libraryExport: 'default' // Make mbp.default become mbp
  },
  plugins: [
    new webpack.ProgressPlugin(),
    plugins.CleanWebpackPlugin,
    plugins.ESLintPlugin,
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin
  ]
};
