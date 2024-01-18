const gulp = require("gulp");

gulp.task("views", () => {
    return gulp
        .src("./src/web/views/**/*.ejs")
        .pipe(gulp.dest("./dist/web/views"));
});

gulp.task("default", gulp.series("views"), () => {
    console.log("✔ Gulp finished successfully")
});