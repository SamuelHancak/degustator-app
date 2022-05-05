const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userGetTemplate = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  heslo: {
    type: String,
    required: true,
  },
  meno: {
    type: String,
  },
  priezvisko: {
    type: String,
  },
  prava: {
    type: String,
    required: true,
  },
});

// userGetTemplate.pre("save", function (next) {
//   let user = this;

//   if (user.isModified("heslo")) {
//     bcrypt.genSalt(10, function (err, salt) {
//       if (err) return next(err);

//       bcrypt.hash(user.heslo, salt, function (err, hash) {
//         if (err) return next(err);

//         user.heslo = hash;
//       });
//     });
//   } else {
//     next();
//   }
// });

// userGetTemplate.methods.comparePassword = function (plainPassword, cd) {
//   bcrypt.compare(plainPassword, this.heslo, function (err, isMatch) {
//     if (err) return cb(err);

//     cb(null, isMatch);
//   });
// };

module.exports = mongoose.model("user", userGetTemplate);
