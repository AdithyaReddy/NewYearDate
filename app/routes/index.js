const routes = require('./routes');
module.exports = function(app, db, PythonShell) {
  routes(app, db, PythonShell);
};