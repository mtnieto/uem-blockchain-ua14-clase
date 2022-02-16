var createError = require('http-errors');
var express = require('express');
const YAML = require('yamljs');
var path = require('path');
const hfHelper = require('./helpers/hfconnection');
const caconnection = require('./helpers/caconnection')
var routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

var app = express();

async function main() { 
  try {
    await caconnection.enrollAdmin()
    await hfHelper.connectNetwork();
    const swagger = YAML.load('./swagger/swagger.yaml');        
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
    app.listen(9090);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(routes);
    app.use(cors())

    console.log('The app is running');
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });
    
    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
          res.status(err.status || 500);
    });
  } catch (err) { 
    console.log(err);
  }
 
}


main()

module.exports = app;
