-   [Proxma](#proxma)
-   [Install/Usage](#installusage)
    -   [Adding Files](#adding-files)
    -   [.proxmarc Options](#proxmarc-options)

# Proxma

A tool that helps making tying new things on a page easier. This CLI uses gulp to process scss, css,
and js files. At the moment there is no way to customize the gulpfile (should be coming later). Once
the files are processed and put into a dist folder the CLI starts up an instance of BrowserSync and
uses that to proxy the site you want to make local non permanent adjustments.

**Note:** While this tool makes use of the words proxy and inject. Nothing is actually sent back to
the sites server. Everything is done localy. Think overrides in chrome or making adjustments to the
css in inspector.

# Install/Usage

```
npm i -g proxma
```

1. Once the package has been installed locally or globally you can run it
```
proxma
```
2. On first run it will look for the `.proxmarc` settings file. If it doesn't find one it will set
   one up for you as well as some starting folders.
3. If the settings file is in place just run the same `proxma` command and it will run gulp and then
   start the local server.
4. Everytime you add new files to src the proxma will restart and load your new files. There is no
   need to refresh the browser becuase BrowserSync will reconnect.

**Note:** In order for things to work you must stay on the localhost proxy sometimes when you click
a link that is not relative it will take you to the real domain and not the proxied one. The none
proxied page will not have the files added.

## Adding Files

Proxma looks for CSS, SCSS, and JS files in the src folder. It will run gulp on those files and put
them in the `dist` folder.

## .proxmarc Options

-   proxy: The url string of the page you want to proxy
-   replaceFiles: An array of strings of files that you want to replace. They must be relative to
    the domain that you are proxing and they can't include the domain itself.
    -   Example: "/YouTubeSlider/CSS/thumb-carousel.css"
-   externalFiles: WIP - Ability to files from a CDN or from another local server
-   injectAtBottom: A boolean that controls where the browsersync scripts get added and where the
    files get added. Default: true
