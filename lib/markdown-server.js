const fs = require('fs');
const uuid = require('uuid/v4');
const morgan = require('morgan');
const colors = require('colors');
const marked = require('marked');
const express = require('express');
const ecstatic = require('ecstatic');
const nunjucks = require('nunjucks');

class MarkdownServer {

  constructor(options) {
    this.options = options;
    this._STATIC_FOLDER_UUID = uuid();
    this.app = express();
    this.setupServer();
  }

  setupServer() {
    marked.setOptions({
      highlight: (code) => {
        return require('highlight.js').highlightAuto(code).value;
      }
    });
    nunjucks.configure(`${__dirname}/../views`, {
      autoescape: true,
      express: this.app
    });
    this.app.set('view engine', 'njk');
    this.app.set('views', `${__dirname}/../views`);
    this.app.use(morgan('short'));
    this.app.use(`/${this._STATIC_FOLDER_UUID}`, express.static(`${__dirname}/../public`));
    this.app.get('/*\.md$', (req, res) => {
      res.render('index', {
        staticPath: `/${this._STATIC_FOLDER_UUID}`,
        theme: this.options.theme,
        highlight: this.options.highlight,
        content: marked(fs.readFileSync(decodeURIComponent(`${this.options.path}${req.url}`), { encoding: 'utf-8' }))
      });
    });
    this.app.use(ecstatic({
      root: this.options.path
    }));
    this.app.use((req, res, next) => {
      res.render('404', {
        staticPath: `/${this._STATIC_FOLDER_UUID}`
      });
    });
  }

  start() {
    this.app.listen(this.options.port, () => {
      console.log(`Server startup at ` + `http://127.0.0.1:${this.options.port}`.blue);
    });
  }

  static createServer(options) {
    new MarkdownServer(options).start();
  }

}

module.exports = MarkdownServer;
