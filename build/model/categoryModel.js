"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categorySchema = new _mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please Enter Category Name"],
    unique: true
  },
  categoryIcon: {
    type: String,
    required: [true, "Please Enter Category Icon"]
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  versionKey: false
});
categorySchema.plugin(_mongooseUniqueValidator["default"]);

var _default = (0, _mongoose.model)("Category", categorySchema);

exports["default"] = _default;