# up-down-counter

[![NPM version](https://badge.fury.io/js/up-down-counter.png)](http://badge.fury.io/js/up-down-counter)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/up-down-counter?style=for-the-badge)](https://bundlephobia.com/result?p=up-down-counter)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/up-down-counter?compression=gzip">

This is the famous counter test example for web components.

Note that the "run time" files for this web component are all html based.  There are, however, some JS dependencies, due primarily to lack of love shown by the WHATWG towards end users.

However, to benefit from the tooling that JS provides, a few extra hops are supported, that splits the html file into two (a bundling step could combine them back into one, which would benefit initial load, but could hurt fine-grain caching).

The Typescript-safe definition for the binding is maintained in file xform.mts.  So to benefit from type checking, auto complete, etc, run typescript (ctl+shift+B => watch), and execute 

> npm run watch 

to output to def.html.

## Viewing up-down-counter locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev.html in a modern browser.



