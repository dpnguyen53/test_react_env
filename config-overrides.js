/*
 * Overriding default create-react-app webpack configurations.
 *
 * **TO ONE, WHO'S READING THIS**
 *
 * UNLESS IT IS NECESSARY OR YOU KNOW EXACTLY WHAT YOU'RE DOING, DO NOT MODIFY THIS FILE
 *  THANK YOU.
 * */

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const miniCssExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const staticVersion = process.env.REACT_APP_VERSION;
const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = process.env.NODE_ENV === "development";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolve = (dir) => path.resolve(__dirname, dir);

const REACT_APP = /^REACT_APP_/i;
const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = (appPackageJson) =>
  envPublicUrl || require(appPackageJson).homepage;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith("/");

  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");

  return ensureSlash(servedUrl, true);
}

function getClientEnviroment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || "development",
        PUBLIC_URL: publicUrl,
      }
    );
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

const servedPath = getServedPath(resolveApp("package.json"));
const publicPath = isEnvProduction ? servedPath : isEnvDevelopment && "/";

const publicUrl = isEnvProduction
  ? publicPath.slice(0, -1)
  : isEnvDevelopment && "";

const appEnv = getClientEnviroment(publicUrl);

module.exports = function (config, env) {
  config.optimization.noEmitOnErrors = false;

  // config resolve alias
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "@app/utils": resolve("src/utils"),
    "@app/themes": resolve("src/themes"),
    "@app/config": resolve("src/config"),
    "@app/routes": resolve("src/routes"),
    containers: resolve("src/containers"),
    components: resolve("src/components"),
    variables: resolve("src/variables"),
  });

  // config output filename with chunkhash
  config.output = Object.assign(config.output, {
    filename: isEnvProduction
      ? "static-" + staticVersion.toString() + "/js/[name].[chunkhash:8].js"
      : isEnvDevelopment && "static/js/bundle.js",
    chunkFilename: isEnvProduction
      ? "static-" +
        staticVersion.toString() +
        "/js/[name].[chunkhash:8].chunk.js"
      : isEnvDevelopment && "static/js/[name].chunk.js",
    globalObject: "this",
  });

  // config public files (html, css,... in public folder) output path/name in production
  if (isEnvProduction) {
    config.plugins[0] = new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: resolve("public/index.html"),
          filename: "index.html",
        },
        {
          minify: {
            removeComments: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    );
    config.plugins[1] = new InterpolateHtmlPlugin(
      HtmlWebpackPlugin,
      appEnv.raw
    );

    // config.plugins.push(
    // 	new miniCssExtractPlugin({
    // 		filename:
    // 			"static-" +
    // 			staticVersion.toString() +
    // 			"/css/[name].[contenthash:8].css",
    // 		chunkFilename:
    // 			"static-" +
    // 			staticVersion.toString() +
    // 			"/css/[name].[contenthash:8].chunk.css",
    // 	})
    // );

    config.plugins.map((plugin, i) => {
      if (
        plugin.options &&
        plugin.options.filename &&
        plugin.options.filename.includes("static/css")
      ) {
        config.plugins[i].options = {
          ...config.plugins[i].options,
          filename:
            "static-" +
            staticVersion.toString() +
            "/css/[name].[contenthash:8].css",
          chunkFilename:
            "static-" +
            staticVersion.toString() +
            "/css/[name].[contenthash:8].chunk.css",
        };
      }
    });
  }

  // config worker loader.
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: {
      loader: "worker-loader",
      options: {
        name: "workers/[hash].js",
      },
    },
  });

  return config;
};
