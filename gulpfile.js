const { src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    sass = require(`gulp-sass`)(require(`sass`)),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    // In Windows, the value might need to be “microsoft-edge”. Note the dash.
    browserChoice = `microsoft-edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft-edge`, // Note: In Windows, this might need to be microsoft-edge
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let validateHTML = () => {
    return src([`dev/html/index.html`])
        .pipe(htmlValidator(undefined));
};

let compileCSSForDev = () => {
    return src(`dev/css/*.css`)
        .pipe(sass.sync({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/css`));
};

let lintJS = () => {
    return src(`dev/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let compressHTML = () => {
    return src([`dev/html/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = () => {
    return src(`dev/css/*.css`)
        .pipe(sass.sync({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/css`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!./html/*.html`,   // but not the HTML
        `!./**/*.js`,  // ignore JS;
        `!styles/*.*`, // ignore css
        `!./prod/**`,  // ignore prod folders and files
        `!./.git`,     // ignore .git folder
        `!.git/*.*`,
        `!.git/**`,
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev/html`,
            ]
        }
    });

    watch(`dev/js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`dev/css/*.css`, series(lintCSS, compileCSSForDev))
        .on(`change`, reload);

    watch(`dev/html/*.html`, validateHTML)
        .on(`change`, reload);
};

async function listTasks () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ` +
            `nothing but generate this message. The ` +
            `available tasks are:\n\n${stdout}`);
    });
}

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.edge = series(edge, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.vivaldi = series(vivaldi, serve);
exports.allBrowsers = series(allBrowsers, serve);
exports.validateHTML = validateHTML;
exports.compileCSSForDev = compileCSSForDev;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.default = exports.serve = series(
    validateHTML,
    lintCSS,
    compileCSSForDev,
    lintJS,
    transpileJSForDev,
    serve
);
exports.lintCSS = lintCSS;
exports.list = listTasks;
exports.serve = series(
    validateHTML,
    lintCSS,
    compileCSSForDev,
    lintJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
