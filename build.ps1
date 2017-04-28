# Clean up previous distributions if folders exist
if (Test-Path dist) {
	Remove-Item dist -Recurse -Force
}

if (Test-Path build) {
	Remove-Item build -Recurse -Force
}

if (Test-Path .tmp) {
	Remove-Item .tmp -Recurse -Force
}

& gulp js:build

Copy-Item -Path src/tsconfig-build.json -Destination .tmp/tsconfig-build.json
Copy-Item -Path src/tsconfig-es5.json -Destination .tmp/tsconfig-es5.json

# Variables
$NGC="node_modules/.bin/ngc.cmd"
$ROLLUP="node_modules/.bin/rollup.cmd"

# Run Angular Compiler
& "$NGC" -p .tmp/tsconfig-build.json

# Rollup angular-datepickr.js
& "$ROLLUP" build/angular-datepickr.js -o dist/angular-datepickr.js

# Run Angular Compiler to ES5
& "$NGC" -p .tmp/tsconfig-es5.json

# Rollup angular-datepickr.js
& "$ROLLUP" build/angular-datepickr.js -o dist/angular-datepickr.es5.js

# Copy non-js files from build
Copy-Item -Exclude *.js -Recurse -Path build/* -Destination dist

# Copy library package.json
Copy-Item -Path src/package.json -Destination dist/package.json
Copy-Item -Path README.md -Destination dist/README.md