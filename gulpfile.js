import pkg from "gulp";
import pump  from "pump";
import beeper  from "beeper";
import browserSync  from "browser-sync";
import concat  from "gulp-concat";
import rename  from "gulp-rename";
import uglify  from "gulp-uglify";
import babel  from "gulp-babel";
import cssnano  from "cssnano";

import postcss  from "gulp-postcss";
import postcssPresetEnv  from "postcss-preset-env";
import postcssNested  from "postcss-nested";
import postcssCustomMedia  from "postcss-custom-media";
import postcssImport  from "postcss-import";
import postcssential  from "postcss-cssential";
import postcssMixins  from "postcss-mixins";
import postcssCustomProperties  from "postcss-custom-properties";
import postcssColor  from "postcss-color-function";
const { series, watch, src, dest, parallel } = pkg;


// Define base folders
const asset_src = 'src/';
const asset_dist = 'src/dist/';
const npm_src   = 'node_modules/';

const serve = done => {
  browserSync.init({
    port: 3001,
    proxy: 'http://localhost:3000/'
  });
  done();
};
// Handle reload
const reload = done => {
  browserSync.reload();
  done();
};
// Handle errors
const handleError = done => (
  (err) => {
    if (err) {
      beeper();
    }
    return done(err);
  }
);

// Handle CSS
const css = done => {
  const processors = [
    postcssImport(),
    postcssMixins(),
    postcssCustomMedia(),
    postcssNested(),
    postcssCustomProperties({preserveCustomProps: false}),
    postcssColor({preserveCustomProps: false}),
    postcssential({
			output: 'public/index.html',
			cssComment: '!cssential',
			htmlComment: 'cssential',
			removeOriginal: true
		}),
    postcssPresetEnv({
      browsers: '> .5% or last 2 versions',
      stage: 2,
      features: {
        'nesting-rules': false
      }
    }),
    cssnano({preset: 'advanced'})
  ];
    pump(
        [
        src('src/App.css', {sourcemaps: true}),
        postcss(processors),
        rename({suffix: '.min'}),
        dest(asset_dist, {sourcemaps: '.'})
        ],
        handleError(done)
    );
};

// Handle Js
const js = done => {
  pump(
    [
      src([
        `${asset_src}**/*.ts`,
        `${asset_src}**/*.js`,
        `${asset_src}**/*.tsx`,
        `${asset_src}components/**/*.tsx`,
        `${asset_src}components/**/*.js`,
        `${asset_src}components/**/*.jsx`,
        `${asset_src}hooks/**/*.js`,
        `${asset_src}router/**/*.jsx`,
        `${asset_src}types/**/*.ts`,
        `${asset_src}utils/**/*.js`,
        `${asset_src}utils/**/*.ts`
      ],
      { sourcemaps: true }),
      babel({
        'presets': [
          [
            '@babel/preset-env', {
              'modules': false
            }
          ]
        ]
      }),
      concat('app.js'),
      rename({suffix: '.min'}),
      uglify(),
      dest(asset_dist, { sourcemaps: '.' })
    ],
    handleError(done)
  );
};

// Handle tasks
const cssWatch = () => watch('src/**', series(css, reload));
const jsWatch = () => watch([
    'src/**',
    'src/conponents/**',
    'src/hooks/**',
    'src/router/**',
    'src/types/**',
    'src/utils/**'
    ], series(js, reload));
const htmlWatch = () => watch('public/**/*.html', series(reload));
const watcher = parallel(cssWatch, jsWatch, htmlWatch);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.css = css;
exports.js = js;
exports.default = dev;