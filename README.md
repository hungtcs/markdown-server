Markdown Server
====

### 说明
在当前目录启动一个http服务器，可以自动解析 Markdown 文档

### 使用方法
```
// 安装
npm install -g markdown-http-server
// 启动
markdown-server
```

### 配置
```
usage: markdown-server [options] [path]

options:
  -p --port    Specify the port to use, default is 8080
  -h --help    Print the help
  --theme      Choose a theme from the list [github-markdown,air,modest,retro,splendor], default is github-markdown
  --highlight  Select the source code highlight mode in markdown, default is tomorrow, full list see https://highlightjs.org/
  -v --version Print version number
```

[MarkdownCSS]: https://github.com/markdowncss
[github-markdown-css]: https://github.com/sindresorhus/github-markdown-css
