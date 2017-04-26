import babelify from 'babelify'
import gulp from 'gulp'
import header from 'gulp-header'
import buffer from 'vinyl-buffer'
import pkg from './package.json'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import rubySass from 'gulp-ruby-sass'
import maps from 'gulp-sourcemaps'

const banner = `/**
 * <%= pkg.name %> v<%= pkg.version %>
 * Copyright <%= pkg.author %>
 * @link <%= pkg.homepage %>
 * @license <%= pkg.license %>
 */\n`

gulp.task('script', () => {
	return browserify({
		entries: ['./src/index.js'],
		debug: true
	})
		.transform('babelify', {
			presets: ['es2016'],
			plugins: ['babel-plugin-transform-decorators-legacy']
		})
		.bundle()
		.pipe(source(`./dist/${pkg.name}.js`))
		.pipe(buffer())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(maps.init({loadMaps: true}))
		.pipe(maps.write('.'))
		.pipe(gulp.dest('.'))
})


gulp.task('watch-script', () => {
	gulp.run('script')
	gulp.watch(['./src/**/*.js', './src/*.js'], () => gulp.run('script'))
})

gulp.task('default', ['script'])