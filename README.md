# lanttu-react
Lanttu react frontend

# Run

`npm install browserify reactify watchify uglify-js react`   

`watchify -v -d -t [ reactify --es6 ] main.js -o compiled.js`   

# Production

`NODE_ENV=production browserify -t [ reactify --es6 ] main.js | uglifyjs > compiled.min.js`

