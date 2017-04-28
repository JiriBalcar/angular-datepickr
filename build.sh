# Clean up previous distributions
rm -rf dist
rm -rf build
rm -rf .tmp

gulp js:build

cp src/tsconfig-build.json .tmp/tsconfig-build.json
cp src/tsconfig-es5.json .tmp/tsconfig-es5.json

# Variables
NGC="node node_modules/.bin/ngc"
ROLLUP="node node_modules/.bin/rollup"

# Run Angular Compiler
$NGC -p src/tsconfig-build.json
# Rollup angular-datepickr.js
$ROLLUP build/angular-datepickr.js -o dist/angular-datepickr.js

# Repeat the process for es5 version
$NGC -p src/tsconfig-es5.json
$ROLLUP build/angular-datepickr.js -o dist/angular-datepickr.es5.js

# Copy non-js files from build
rsync -a --exclude=*.js build/ dist

# Copy library package.json and README.md
cp src/package.json dist/package.json
cp README.md dist/README.md