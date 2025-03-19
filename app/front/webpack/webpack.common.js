'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: {
    CreationPage: './app/front/js/CreationPage.js',
    EventPage: './app/front/js/EventPage.js',
    ContactPage: './app/front/js/ContactPage.js',
    ArtistPage: './app/front/js/subpages/ArtistPage.js',
    CatalogPage: './app/front/js/subpages/CatalogPage.js',
    MerchPage: './app/front/js/subpages/MerchPage.js',
    MusicPage: './app/front/js/subpages/MusicPage.js',
    PhotoPage: './app/front/js/subpages/PhotoPage.js',
    PodcastPage: './app/front/js/subpages/PodcastPage.js',
    ReleasePage: './app/front/js/subpages/ReleasePage.js',
    SoftwarePage: './app/front/js/subpages/SoftwarePage.js',
    VideoPage: './app/front/js/subpages/VideoPage.js'
  },
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../../assets/dist'),
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
