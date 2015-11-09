module.exports = function() {
    var client = './www/';
    var clientApp = './www/app/';
    var temp = client + '.tmp/';
    var img = 'img';
    // var clientApp = client + 'js/';
    var config = {

        // all js to vet
        alljs: [
            clientApp + '*.js',
            clientApp + '**/*.module.js',
            clientApp + '**/*.js'
        ],
        allBuild: [
            './build/js/*.js'
        ],
        build: client + 'build/',
        client: client,
        css: client + 'css/*.css',
        fonts: client + 'lib/ionic/fonts/*.*',
        html: [client + 'templates/**/*.html', clientApp + '/**/*.html'],
        htmltemplates: [client + 'templates/**/*.html', clientApp + '/**/*.html'],
        img: img,
        images: client + img + '/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '*.js',
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + client + '**/*.spec.js'
        ],
        less: client + 'styles/styles.less',
        nodeServer: './www/server/server.js',
        // src: ['./www/lib/braintree-angular/dist/*.js'],


        //the following settings determine the gulp-inject
        //paths for our custom .js files

        addRootSlash: false,
        ignorePath: '/www',
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: client + 'lib/',
        },

        server: '*.*',
        temp: temp,

                /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'templates/'
            }
        },
        defaultPort: 8100
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.getGulpInjectDefaultOptions = function() {
        var options = {
            ignorePath: config.ignorePath,
            addRootSlash: config.addRootSlash,
        };
        return options;
    };

    return config;
};
