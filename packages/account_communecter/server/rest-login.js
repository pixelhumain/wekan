import { JsonRoutes, RestMiddleware } from 'meteor/simple:json-routes';
import { loginGen } from './login.js';

JsonRoutes.Middleware.use(JsonRoutes.Middleware.parseBearerToken);
JsonRoutes.Middleware.use(JsonRoutes.Middleware.authenticateMeteorUserByToken);

// Handle errors specifically for the login routes correctly
JsonRoutes.ErrorMiddleware.use('/users/login', RestMiddleware.handleErrorAsJson);
JsonRoutes.ErrorMiddleware.use('/users/register', RestMiddleware.handleErrorAsJson);

JsonRoutes.add('options', '/users/login', function (req, res) {
  JsonRoutes.sendResult(res);
});

//email,pwd
JsonRoutes.add('post', '/users/login', function (req, res) {
  const options = req.body;

  const retour = loginGen(options);

JsonRoutes.sendResult(res, {
  data: {
    token: retour.token,
    tokenExpires: retour.tokenExpires,
    id: retour.userId,
  },
});

});
