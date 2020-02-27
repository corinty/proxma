const gulp = require("gulp");

const clean = require("gulp-clean");

const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const flatten = require("gulp-flatten");
const postcss = require("gulp-postcss");
const babel = require("gulp-babel");
const path = require("path");
const chagned = require("gulp-changed");
const cache = require("gulp-cached");
const proxmaServer = require("./src/proxmaServer");

sass.compiler = require("node-sass");

gulp.task("clean", () => gulp.src("./dist", { allowEmpty: true }).pipe(clean()));

gulp.task("scss", () => processScss());
gulp.task("js", () =>
    gulp
        .src("./src/**/*.js", { allowEmpty: true })
        .pipe(
            babel({
                presets: ["@babel/preset-env"].map(require.resolve),
            })
        )
        .pipe(gulp.dest("./dist"))
);

gulp.task("watch:scss", () => gulp.watch(["./src/**/*.{scss,css}"], gulp.series("scss")));
gulp.task("watch:js", () => gulp.watch(["./src/**/*.js"], gulp.series("js")));

gulp.task(
    "default",
    gulp.series(
        "clean",
        gulp.parallel("js", "scss"),
        gulp.parallel("watch:scss", "watch:js", proxmaServer)
    )
);

function processScss(filePath) {
    const srcGlob = filePath || ["./src/**/*.{scss,css}", "!./node_modules/**/*"];
    const fileDest = filePath ? path.dirname(filePath).replace("src", "./dist") : "dist";

    return (
        gulp
            .src(srcGlob, { allowEmpty: true })
            // .pipe(chagned(fileDest))
            .pipe(cache("scss"))
            .pipe(sass().on("error", sass.logError))
            .pipe(postcss([autoprefixer()]))
            .pipe(gulp.dest(fileDest))
    );
}
