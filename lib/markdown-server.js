const fs = require('fs');
const morgan = require('morgan');
const colors = require('colors');
const marked = require('marked');
const express = require('express');
const ecstatic = require('ecstatic');
const nunjucks = require('nunjucks');

class MarkdownServer {

  constructor(options) {
    this.options = options;
    this.app = express();
    this.setupServer();
  }

  setupServer() {
    nunjucks.configure(`${__dirname}/../views`, {
      autoescape: true,
      express: this.app
    });
    this.app.set('view engine', 'njk');
    this.app.set('views', `${__dirname}/../views`);
    this.app.use(morgan('short'));
    this.app.use('/static', express.static(`${__dirname}/../public`));
    this.app.get('/*\.md$', (req, res) => {
      res.render('index', {
        content: marked(fs.readFileSync(decodeURIComponent(`${process.cwd()}${req.url}`), { encoding: 'utf-8' }))
      });
    });
    this.app.use(ecstatic({
      root: './'
    }));
    this.app.use((req, res, next) => {
      res.render('404');
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
