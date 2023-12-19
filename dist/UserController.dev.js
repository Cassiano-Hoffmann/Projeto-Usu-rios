"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController(formId, tableId) {
    _classCallCheck(this, UserController);

    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);
    this.onSubmit();
  }

  _createClass(UserController, [{
    key: "onSubmit",
    value: function onSubmit() {
      var _this = this;

      this.formEl.addEventListener("submit", function (event) {
        event.preventDefault();

        var values = _this.getValues();

        _this.getPhoto().then(function (content) {
          values.photo = content;

          _this.addLine(values);
        }, function (e) {
          console.error(e);
        });
      });
    }
  }, {
    key: "getPhoto",
    value: function getPhoto() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var fileReader = new FileReader();

        var elements = _toConsumableArray(_this2.formEl.elements).filter(function (item) {
          if (item.name === 'photo') {
            return item;
          }
        });

        var file = elements[0].files[0];

        fileReader.onload = function () {
          resolve(fileReader.result);
        };

        fileReader.onerror = function (e) {
          reject(e);
        };

        if (file) {
          fileReader.readAsDataURL(file);
        } else {
          resolve('dist/img/boxed-bg.jpg');
        }
      });
    }
  }, {
    key: "getValues",
    value: function getValues() {
      var user = {};

      _toConsumableArray(this.formEl.elements).forEach(function (field, index) {
        if (field.name == "gender") {
          if (field.checked) {
            user[field.name] = field.value;
          }
        } else if (field.name == "admin") {
          user[field.name] = field.checked;
        } else {
          user[field.name] = field.value;
        }
      });

      return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    }
  }, {
    key: "addLine",
    value: function addLine(dataUser) {
      var tr = document.createElement('tr');
      tr.innerHTML = "\n            <td><img src=\"dist/img/user1-128x128.jpg\" alt=\"User Image\" class=\"img-circle img-sm\"></td>\n            <td>".concat(dataUser.name, "</td>\n            <td>").concat(dataUser.email, "</td>\n            <td>").concat(dataUser.admin, "</td>\n            <td>").concat(dataUser.birth, "</td>\n            <td>\n              <button type=\"button\" class=\"btn btn-primary btn-xs btn-flat\">Editar</button>\n              <button type=\"button\" class=\"btn btn-danger btn-xs btn-flat\">Excluir</button>\n            </td>\n        ");
      this.tableEl.appendChild(tr);
    }
  }]);

  return UserController;
}();