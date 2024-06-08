const gulp = require("gulp");

gulp.task("bower", () => {
    return gulp
        .src("./src/web/bower_components/**")
        .pipe(gulp.dest("./dist/web/bower_components"));
});

gulp.task("public", () => {
    return gulp
        .src("./src/web/public/**")
        .pipe(gulp.dest("./dist/web/public"));
});

gulp.task("views", () => {
    return gulp
        .src("./src/web/views/**/*.ejs")
        .pipe(gulp.dest("./dist/web/views"));
});

gulp.task("default", gulp.series("bower", "public", "views"), () => {
    console.log("✔ Gulp finished successfully");
});