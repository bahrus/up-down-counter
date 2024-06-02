# up-down-counter

This is the famous counter test example for web components.

Note that the "run time" files for this web component are all html based.  There are, however, some JS dependencies, due primarily to lack of love shown by the WHATWG towards end users.

However, to benefit from the tooling that JS provides, a few extra hops are supported, that splits the html file into two (a bundling step could combine them back into one, which would benefit initial load, but could hurt fine-grain caching).

The Typescript-safe definition for the binding is maintained in file xform.mts.  So to benefit from type checking, auto complete, etc, run typescript (ctl+shift+B => watch), and execute npm run build to output to def.html.

