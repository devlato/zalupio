![zalupio](https://raw.github.com/devlato/zalupio/master/images/zalupio.png)

[![Dependency Status](http://img.shields.io/devlato/zalupio.svg?style=flat)](https://david-dm.org/devlato/zalupio)
[![Build Status](http://img.shields.io/travis/devlato/zalupio/master.svg?style=flat)](https://travis-ci.org/devlato/zalupio)
[![Coverage Status](http://img.shields.io/coveralls/devlato/zalupio.svg?style=flat)](https://coveralls.io/r/devlato/zalupio)
[![NPM version](http://img.shields.io/npm/v/zalupio.svg?style=flat)](https://www.npmjs.org/package/zalupio)
[![License](http://img.shields.io/npm/l/zalupio.svg?style=flat)](https://www.npmjs.org/package/zalupio)
[![Gitter](https://img.shields.io/badge/gitter-chat-orange.svg)](https://gitter.im/devlato/zalupio)

# Introduction

This repo is a fork of [zalupio](https://github.com/danielgtaylor/aglio) project because aglio is not well maintained anymore.

An [API Blueprint](http://apiblueprint.org/) renderer that supports multiple themes and outputs static HTML that can be served by any web host. API Blueprint is a Markdown-based document format that lets you write API descriptions and documentation in a simple and straightforward way. Currently supported is [API Blueprint format 1A](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md).

## Features

 * Fast parsing thanks to [Protagonist](https://github.com/apiaryio/protagonist)
 * Asyncronous processing
 * Multiple templates/themes
 * Support for custom colors, templates, and theme engines
 * Include other documents in your blueprint
 * Commandline executable `zalupio -i service.apib -o api.html`
 * Live-reloading preview server `zalupio -i service.apib --server`
 * Node.js library `require('zalupio')`
 * Excellent test coverage
 * Tested on [BrowserStack](https://www.browserstack.com/)

## Example Output
Example output is generated from the [example API Blueprint](https://raw.github.com/devlato/zalupio/master/example.apib) using the default [Olio theme](https://github.com/devlato/zalupio/tree/olio-theme#readme).

 * Default theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/default.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/default-triple.html)
 * Streak theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/streak.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/streak-triple.html)
 * Flatly theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/flatly.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/flatly-triple.html)
 * Slate theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/slate.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/slate-triple.html)
 * Cyborg theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/cyborg.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/devlato/zalupio/blob/master/examples/cyborg-triple.html)

## Including Files
It is possible to include other files in your blueprint by using a special include directive with a path to the included file relative to the current file's directory. Included files can be written in API Blueprint, Markdown or HTML (or JSON for response examples). Included files can include other files, so be careful of circular references.

```markdown
<!-- include(filename.md) -->
```

For tools that do not support this include directive it will just render out as an HTML comment. API Blueprint may support its own mechanism of including files in the future, and this syntax was chosen to not interfere with the [external documents proposal](https://github.com/apiaryio/api-blueprint/issues/20) while allowing `zalupio` users to include documents today.


# Installation & Usage
There are three ways to use zalupio: as an executable, in a docker container or as a library for Node.js.

## Executable
Install zalupio via NPM. You need Node.js installed and you may need to use `sudo` to install globally:

```bash
npm install -g zalupio
```

Then, start generating HTML.

```bash
# Default theme
zalupio -i input.apib -o output.html

# Use three-column layout
zalupio -i input.apib --theme-template triple -o output.html

# Built-in color scheme
zalupio --theme-variables slate -i input.apib -o output.html

# Customize a built-in style
zalupio --theme-style default --theme-style ./my-style.less -i input.apib -o output.html

# Custom layout template
zalupio --theme-template /path/to/template.jade -i input.apib -o output.html

# Custom theme engine
zalupio -t my-engine -i input.apib -o output.html

# Run a live preview server on http://localhost:3000/
zalupio -i input.apib -s

# Print output to terminal (useful for piping)
zalupio -i input.apib -o -

# Disable condensing navigation links
zalupio --no-theme-condense-nav -i input.apib -o output.html

# Render full-width page instead of fixed max width
zalupio --theme-full-width -i input.apib -o output.html

# Set an explicit file include path and read from stdin
zalupio --include-path /path/to/includes -i - -o output.html

# Output verbose error information with stack traces
zalupio -i input.apib -o output.html --verbose
```

## With Docker
You can choose to use the provided `Dockerfile` to build yourself a repeatable and testable environment:

1. Build the image with `docker build -t zalupio .`
2. Run zalupio inside a container with `docker run -t zalupio`
  You can use the `-v` switch to dynamically mount the folder that holds your API blueprint:

```bash
docker run -v $(pwd):/tmp -t zalupio -i /tmp/input.apib -o /tmp/output.html
```

## Node.js Library
You can also use zalupio as a library. First, install and save it as a dependency:

```bash
npm install --save zalupio
```

Then, convert some API Blueprint to HTML:

```javascript
var zalupio = require('zalupio');

// Render a blueprint with a template by name
var blueprint = '# Some API Blueprint string';
var options = {
  themeVariables: 'default'
};

zalupio.render(blueprint, options, function (err, html, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);

    console.log(html);
});

// Render a blueprint with a custom template file
options = {
  themeTemplate: '/path/to/my-template.jade'
};
zalupio.render(blueprint, options, function (err, html, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);

    console.log(html);
});


// Pass custom locals along to the template, for example
// the following gives templates access to lodash and async
options = {
    themeTemplate: '/path/to/my-template.jade',
    locals: {
        _: require('lodash'),
        async: require('async')
    }
};
zalupio.render(blueprint, options, function (err, html, warnings) {
   if (err) return console.log(err);
   if (warnings) console.log(warnings);

   console.log(html);
});
```

### Reference
The following methods are available from the `zalupio` library:

#### zalupio.collectPathsSync (blueprint, includePath)
Get a list of paths that are included in the blueprint. This list can be watched for changes to do things like live reload. The blueprint's own path is not included.

```javascript
var blueprint = '# GET /foo\n<-- include(example.json -->\n';
var watchPaths = zalupio.collectPathsSync(blueprint, process.cwd())
```

#### zalupio.render (blueprint, options, callback)
Render an API Blueprint string and pass the generated HTML to the callback. The `options` can either be an object of options or a simple layout name or file path string. Available options are:

| Option      | Type   | Default       | Description                           |
| ----------- | ------ | ------------- | ------------------------------------- |
| filterInput | bool   | `true`        | Filter `\r` and `\t` from the input   |
| includePath | string | process.cwd() | Base directory for relative includes  |
| locals      | object | `{}`          | Extra locals to pass to templates     |
| theme       | string | `'default'`   | Theme name to load for rendering      |

In addition, the [default theme](https://github.com/devlato/zalupio/tree/olio-theme) provides the following options:

| Option           | Type   | Default   | Description                                  |
| ---------------- | ------ | --------- | -------------------------------------------- |
| themeVariables   | string | `default` | Built-in color scheme or path to LESS or CSS |
| themeCondenseNav | bool   | `true`    | Condense single-action navigation links      |
| themeFullWidth   | bool   | `false`   | Use the full page width                      |
| themeTemplate    | string |           | Layout name or path to custom layout file    |
| themeStyle       | string | `default` | Built-in style name or path to LESS or CSS   |


```javascript
var blueprint = '...';
var options = {
    themeTemplate: 'default',
    locals: {
        myVariable: 125
    }
};

zalupio.render(blueprint, options, function (err, html, warnings) {
    if (err) return console.log(err);

    console.log(html);
});
```

#### zalupio.renderBlueprint (blueprint, options, callback)
Render a preparsed API Blueprint. Analogous to `render` except for the first argument, which is expected to be a blueprint object.

```javascript
zalupio.renderBlueprint(blueprint, options, function (err, html, warnings) {
    if (err) return console.log(err);

    console.log(html);
});
```

#### zalupio.renderFile (inputFile, outputFile, options, callback)
Render an API Blueprint file and save the HTML to another file. The input/output file arguments are file paths. The options behaves the same as above for `zalupio.render`, except that the `options.includePath` defaults to the basename of the input filename.

```javascript
zalupio.renderFile('/tmp/input.apib', '/tmp/output.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});
```

# Development
Pull requests are encouraged! Feel free to fork and hack away, especially on new themes. The build system in use is Grunt, so make sure you have it installed:

```bash
npm install -g grunt-cli
```

Then you can build the source and run the tests:

```bash
# Lint/compile the Coffeescript
grunt

# Run the test suite
grunt test

# Generate an HTML test coverage report
grunt coverage

# Render examples
grunt examples
```

## Customizing Output
zalupio is split into two components: a base that contains logic for loading API Blueprint, handling commandline arguments, etc and a theme engine that handles turning the API Blueprint AST into HTML. The default theme engine that ships with zalupio is called [olio](https://github.com/devlato/zalupio/tree/olio-theme). Templates are written in Jade, with support for inline Coffeescript, LESS and Stylus via filters. The default stylesheets are written in LESS.

While developing customizations, you may want to disable caching using the `NOCACHE` environment variable.

```bash
NOCACHE=1 zalupio -i input.apib [customization options]
```

### Custom Colors & Style
zalupio's default theme provides a way to easily override colors, fonts, padding, etc to match your company's style. This is done by providing your own LESS or CSS file(s) via the `--theme-variables` and `--theme-style` options. For example:

```bash
# Use my custom colors
zalupio --theme-variables /path/to/my-colors.less -i input.apib -o output.html
```

The `my-variables.less` file might contain a custom HTTP PUT color specification:

```less
/* HTTP PUT */
@put-color: #f0ad4e;
@put-background-color: #fcf8e3;
@put-text-color: contrast(@put-background-color);
@put-border-color: darken(spin(@put-background-color, -10), 5%);
```

See the [default variables](https://github.com/devlato/zalupio/blob/olio-theme/styles/variables-default.less) file for examples of which variables can be set.

The `--theme-style` option lets you override built-in styles with your own LESS or CSS definitions. It is processed **after** the variables have been defined, so the variables are available for your use. If you wish to modify a rule from an existing built-in style then you must copy the style. The order of loading roughly follows:

1. Default variables
2. Built-in **or** user-supplied variables
3. Built-in **or** user-supplied style

Note that these options can be passed more than once, in which case they will be loaded in the order they were passed. This lets you, for example, load a variable preset like `flatly` and modify one of the colors with your own LESS file. Keep in mind that when you want to modify a built-in style you must explicitly list the style, e.g. `--theme-style default --theme-style my-style.less`.

#### Built-in Colors

* `cyborg`
* `default`
* `flatly`
* `slate`

#### Built-in Styles

* `default`

### Customizing Layout Templates
The `--theme-template` option allows you to provide a custom layout template that overrides the default. This is specified in the form of a [Jade](http://jade-lang.com/) template file. See the [default template](https://github.com/devlato/zalupio/blob/olio-theme/templates/index.jade) file for an example.

The locals available to templates look like the following:

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| api         | The API Blueprint AST from Protagonist                   |
| condenseNav | If true, you should condense the nav if possible         |
| date        | Date and time handling from Moment.js                    |
| fullWidth   | If true, you should consume the entire page width        |
| highlight   | A function (`code`, `lang`) to highlight a piece of code |
| markdown    | A function to convert Markdown strings to HTML           |
| slug        | A function to convert a string to a slug usable as an ID |
| hash        | A function to return an hash (currently MD5)             |

#### Built-in Layout Templates

* `default`

### Using Custom Themes
While zalupio ships with a default theme, you have the option of installing and using third-party theme engines. They may use any technology and are not limited to Jade and LESS. Consult the theme's documentation to see which options are available and how to use and customize the theme. Common usage between all themes:

```bash
# Install a custom theme engine globally
npm install -g zalupio-theme-<NAME>

# Render using a custom theme engine
zalupio -t <NAME> -i input.apib -o output.html

# Get a list of all options for a theme
zalupio -t <NAME> --help
```

### Writing a Theme Engine
Theme engines are simply Node.js modules that provide two public functions and follow a specific naming scheme (`zalupio-theme-NAME`). Because they are their own npm package they can use whatever technologies the theme engine author wishes. The only hard requirement is to provide these two public functions:

#### `getConfig()`
Returns configuration information about the theme, such as the API Blueprint format that is supported and any options the theme provides.

#### `render(input, options, done)`
Render the given input API Blueprint AST with the given options. Calls `done(err, html)` when finished, either passing an error or the rendered HTML output as a string.

#### Example Theme
The following is a very simple example theme. **Note**: it only returns a very simple string instead of rending out the API Blueprint AST. Normally you would invoke a template engine and output the resulting HTML that is generated.

```javascript
// Get the theme's configuration options
exports.getConfig = function () {
  return {
    // This is a list of all supported API Blueprint format versions
    formats: ['1A'],
    // This is a list of all options your theme accepts. See
    // here for more: https://github.com/bcoe/yargs#readme
    // Note: These get prefixed with `theme` when you access
    // them in the options object later!
    options: [
      {
        name: 'name',
        description: 'Your name',
        default: 'world'
      }
    ]
  };
}

// Asyncronously render out a string
exports.render = function (input, options, done) {
  // Normally you would use some template engine here.
  // To keep this code really simple, we just print
  // out a string and ignore the API Blueprint.
  done(null, 'Hello, ' + options.themeName + '!');
};

```

Example use:

```bash
# Install the theme globally
npm install -g zalupio-theme-hello

# Render some output!
zalupio -t hello -i example.apib -o -
=> 'Hello, world!'

# Pass in the custom theme option!
zalupio -t hello --theme-name Denis -i example.apib -o -
=> 'Hello, Denis!'
```

You are free to use whatever template system (Jade, EJS, Nunjucks, etc) and any supporting libraries (e.g. for CSS) you like.

License
=======
Copyright (c) 2017 Daniel G. Taylor, Denis Tokarev

http://dgt.mit-license.org/
