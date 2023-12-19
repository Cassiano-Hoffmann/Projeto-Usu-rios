"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(name, gender, birth, country, email, password, photo, admin) {
    _classCallCheck(this, User);

    this._id;
    this._name = name;
    this._gender = gender;
    this._birth = birth;
    this._country = country;
    this._email = email;
    this._password = password;
    this._photo = photo;
    this._admin = admin;
    this._register = new Date();
  }

  _createClass(User, [{
    key: "loadFromJSON",
    value: function loadFromJSON(json) {
      for (var name in json) {
        switch (name) {
          case '_register':
            this[name] = new Date(json[name]);
            break;

          default:
            this[name] = json[name];
        }
      }
    }
  }, {
    key: "getNewID",
    value: function getNewID() {
      var usersID = parseInt(localStorage.getItem("usersID"));
      if (!usersID > 0) usersID = 0;
      usersID++;
      localStorage.setItem("usersID", usersID);
      return usersID;
    }
  }, {
    key: "save",
    value: function save() {
      var _this = this;

      var users = User.getUsersStorage();

      if (this.id > 0) {
        users.map(function (u) {
          if (u._id == _this.id) {
            Object.assign(u, _this);
          }

          return u;
        });
      } else {
        this._id = this.getNewID();
        users.push(this);
      }

      localStorage.setItem("users", JSON.stringify(users));
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      var users = User.getUsersStorage();
      users.forEach(function (userData, index) {
        if (_this2._id == userData._id) {
          users.splice(index, 1);
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "register",
    get: function get() {
      return this._register;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "gender",
    get: function get() {
      return this._gender;
    }
  }, {
    key: "birth",
    get: function get() {
      return this._birth;
    }
  }, {
    key: "country",
    get: function get() {
      return this._country;
    }
  }, {
    key: "email",
    get: function get() {
      return this._email;
    }
  }, {
    key: "password",
    get: function get() {
      return this._password;
    }
  }, {
    key: "photo",
    get: function get() {
      return this._photo;
    },
    set: function set(value) {
      this._photo = value;
    }
  }, {
    key: "admin",
    get: function get() {
      return this._admin;
    }
  }], [{
    key: "getUsersStorage",
    value: function getUsersStorage() {
      var users = [];

      if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
      }

      return users;
    }
  }]);

  return User;
}();