## SETTING UP WEBPACK FOR DEVELOPMENT

### Basic Setup

Navigate to project folder

Initialize ```package.json```:

	npm init -y
	
Install webpack and webpack-cli:

	npm i webpack webpack-cli --save-dev
	
Add these scripts inside ```package.json```:

```javascript
"scripts": {
  "build": "webpack --mode production",
  "watch": "webpack --watch --mode development"
}
```

####Generate HTML and minimize it

Intall **html-webpack-plugin** and **html-loader**

	npm i html-webpack-plugin html-loader --save-dev
	
Create ```webpack.config.js``` file and add configuration below:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ]
};
```

To use the default entry point create a file as:

```./scr/index.html``` and ```./scr/index.js```

####To optimize images
Install ***img-loader*** and **url-loader**

	npm i img-loader url-loader file-loader --save-dev
	
Create a folder for the images:

```./src/img/```

Add the loaders to  ```webpack.config.js```

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ]
};
```

####To compile SASS to CSS and add vendor prefixes to CSS
Install these loaders and plugin:

	npm i css-loader sass-loader postcss-loader node-sass mini-css-extract-plugin autoprefixer --save-dev
	
Then configure ```webpack.config.js``` as:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
```

Create a SASS file inside ```./src/_scss/main.scss```

Import the style in ```./src/index.js```:

```javascript
import style from "./_scss/main.scss";
```

Create a file named ```postcss.config.js``` inside ```./src/_scss/```:

In ```postcss.config.js``` add:

```javascript
module.exports = {
  plugins: [require("autoprefixer")]
};
```

Open up ```package.json``` and configure the browsers list:

```javascript
"browserslist": ["last 2 versions"]
```

To optimize/minimize css install:

	npm install --save-dev optimize-css-assets-webpack-plugin
	
Optimize js:
	
	npm i uglifyjs-webpack-plugin --save-dev
	
Then configure ```webpack.config.js``` as:

```javascript
Optimize CSS Assets Webpack Plugin - minimize css
npm install --save-dev optimize-css-assets-webpack-plugin
npm i uglifyjs-webpack-plugin --save-dev

webpack.config.js

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
```

####To transpile javascript with Babel
Install:

	npm i @babel/core babel-loader @babel/preset-env --save-dev
	
Configure Babel by creating a new file named ```.babelrc``` inside the project folder, and add:

```javascript
{
 "presets":	 [
	"@babel/preset-env"
 ]
}
```

To use new js features like async/await install:

	npm install --save @babel/polyfill
	
In ```.babelrc``` add ```useBuiltIns: ‘usage’```

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

To watch files and re-compile on save with webpack dev server install:

	npm i webpack-dev-server --save-dev
	
Open ```package.json``` , add the start script  and delete the watch script:

```javascript
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack --mode production"
}
```

Run ```npm start``` to lauch your application inside a browser.

Full tutorial by [
Valentino Gagliardi] (https://www.valentinog.com/blog/from-gulp-to-webpack-4-tutorial/)
			



## NOTE:
With Webpack there’s no need to include your Javascript inside the HTML file: the bundle will be automatically injected inside ```<script><script>```

To test while setting up run: 
	
	npm run build
	
