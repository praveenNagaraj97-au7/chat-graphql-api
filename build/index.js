"use strict";

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _apolloServer = require("apollo-server");

var _mongoose = require("mongoose");

var _dotenvConfig = _interopRequireDefault(require("./config/dotenvConfig"));

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _model = require("./model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenvConfig["default"])();
var pubsub = new _apolloServer.PubSub();
var apolloServer = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"],
  playground: true,
  introspection: true,
  subscriptions: {
    path: "/",
    onConnect: function onConnect() {
      return console.log("websocket connected");
    },
    onDisconnect: function onDisconnect() {
      return console.log("websocket disconnected");
    }
  },
  context: function context(_ref) {
    var req = _ref.req,
        res = _ref.res;
    return {
      req: req,
      res: res,
      pubsub: pubsub,
      Category: _model.Category,
      User: _model.User,
      Product: _model.Product,
      Chat: _model.Chat
    };
  },
  tracing: true
});
var PORT = process.env.PORT || 4000;
(0, _mongoose.connect)(process.env.URIS, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Database connection established");
})["catch"](function (err) {
  console.log("Something went wrong!");
});
apolloServer.listen().then(function (_ref2) {
  var url = _ref2.url,
      subscriptionsUrl = _ref2.subscriptionsUrl;
  console.log("Server on ".concat(url));
  console.log("ws on ".concat(subscriptionsUrl));
});