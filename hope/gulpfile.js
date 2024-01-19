const gulp = require("gulp");

gulp.task("bower", () => {
    return gulp
        .src("./src/web/bower_components/**")
        .pipe(gulp.dest("./dist/web/bower_components"));
});

gulp.task("views", () => {
    return gulp
        .src("./src/web/views/**/*.ejs")
        .pipe(gulp.dest("./dist/web/views"));
});

gulp.task("default", gulp.series("bower", "views"), () => {
    console.log("✔ Gulp finished successfully");
});