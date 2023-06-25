"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use('/api/users', _userRoutes["default"]);
app.get('/api/products/:id', function (req, res) {
  var productId = req.params.id;

  var product = _data["default"].products.find(function (x) {
    return x._id === productId;
  });

  if (product) res.send(product);else res.status(404).send({
    msg: 'Product Not Found.'
  });
});
app.get('/api/products', function (req, res) {
  res.send(_data["default"].products);
});
app.listen(5000, function () {
  console.log('Server started at http://localhost:5000');
});