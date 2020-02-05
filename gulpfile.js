"use strict";

const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const fileinclude = require("gulp-file-include");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");

gulp.task("css", function() {
    return gulp
        .src("./src/styles/**/*.css")
        .pipe(autoprefixer({ browsers: "last 2 version" }))
        .pipe(csso())
        .pipe(gulp.dest("./dist/styles/"));
});

gulp.task("scripts", function() {
    return gulp
        .src("./src/scripts/*.js")
        .pipe(
            babel({
                presets: ["@babel/env"]
            })
        )
        .pipe(gulp.dest("dist/scripts/"));
});

gulp.task("html", function() {
    return gulp
        .src(["./src/index.html"])
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true
            })
        )
        .pipe(gulp.dest("./dist/"));
});

gulp.task("assets", function() {
    return gulp.src(["./src/assets/**/*"]).pipe(gulp.dest("./dist/assets"));
});

gulp.task("copy-root", function() {
    return gulp
        .src(["./src/*.*", "!./src/index.html"])
        .pipe(gulp.dest("./dist/"));
});

gulp.task("clean", function() {
    return del(["dist"]);
});

gulp.task("fileinclude", async function() {
    gulp
        .src(["./src/*.html"])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file"
            })
        )
        .pipe(gulp.dest("./dist/"));
});

gulp.task(
    "default",
    gulp.series(
        "clean",
        gulp.parallel(
            "html",
            "scripts",
            "css",
            "assets",
            "copy-root",
            "fileinclude"
        )
    )
);
