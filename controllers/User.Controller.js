const db = require('../config/sequelize');
const User = db.users;
const passport = require('passport');
const {readPython} = require("./callingPython.Controller");
//const Response = require('./response');  //This module was not available inside codebase. So, I've commented out this line. Hence, I had to make change forcefully inside the response section.

exports.signup = async (req, res) => {

    if (req.body.code != '80085') {
        return res.status(200).send({
            "status" : "failed",
            "message" : "Worng code"
        });
    }

    User.findOne({ where: { email: req.body.email } })
        .then((userExists) => {
            if (userExists) {
                return res.status(200).send({
                    "status" : "failed",
                    "message" : "Email already use"
                });
            }

            let pwd = User.setPassword(req.body.password);
            return User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    hash: pwd.hash,
                    salt: pwd.salt
                })
                .then(() => {
                    return res.status(200).send({
                        "status" : "success",
                        "message" : "User Created"
                    });
                });
        })
        .catch((err) => {
            return res.status(500).send({
                "status" : "failed",
                "message" : "database Error"
            });
        });
};

exports.signin = (req, res) => {
    if (!req.body.username || !req.body.hash) {
        return res.status(400).json(req.body.username);
    }

    passport.authenticate("local", (err, user, info) => {
        let token;
        if (err) {
            return res.status(500).send({
                "status" : "failed",
                "message" : "Authentication error"
            });
        }

        if (!user) {
            return res.status(200).send({
                "status" : "failed",
                "message" : "Authentication error"
            });
        } else {
            console.log(user)
            token = User.generateJwt(user);

            return res.status(200).send({
                "status" : "success",
                "message" : 'Connected.',
                "token" : token 
            });
        }
    })(req, res);
};

exports.signout = (req, res) => {
    console.log("Destroying local passport session..")
    req.logout();
    return res.status(200).send({
        "status" : "success",
        "message" : "Logout success"
    });
};

exports.get = (req, res) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(200).send({
                    "status" : "failed",
                    "message" : "no user found by this id"
                });
            }

            var userData = {
                firstname: user.firstname,
                lastname: user.lastname,
                nickname: user.nickname,
                email: user.email,
                phoneNumber: user.phoneNumber
            }

            return res.status(200).json({
                "status" : "success",
                "message" : "User data fuond",
                "result" : userData
            });
        })
        .catch((err) => {
            return res.status(500).json({
                "status" : "failed",
                "message" : "Database user"
            });
        });
}

exports.updatePassword = (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({
                "status" : "failed",
                "message" : "Authentication error"
            });
        }

        if (!user) {
            return res.status(200).json({
                "status" : "failed",
                "message" : "Authentication error"
            });
        }

        let pwd = User.setPassword(req.body.newPassword);
        user.hash = pwd.hash;
        user.salt = pwd.salt;
        user.save()
            .then(() => {
                return res.status(200).json({
                    "status" : "success",
                    "message" : "Password updated"
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    "status" : "failed",
                    "message" : "Dataase error"
                });
            });
    })(req, res);
};

exports.updateNickname = (req, res) => {
    User.findOne({ where : { "email" : req.body.email }}) //Found query error here
        .then(user => {
            if (!user) {
                return res.status(200).send({
                    "status" : "failed",
                    "message" : "Did not find any user"
                });
            }
            
            return User.findOne({ where : { "nickname" : req.body.nickname } }) //found query error here
                .then(nicknameUser => {
                    if (nicknameUser) {
                        return res.status(200).send({
                            "status" : "failed",
                            "message" : "Nickname is already in use "
                        });
                    }

                    user.nickname = req.body.nickname;
                    return user.save()
                        .then(() => {
                            return res.status(200).send({
                                "status" : "success",
                                "message" : "Nickname updated"
                            });
                        })
                });
        })
        .catch((err) => {
            return res.status(500).send({
            "status" : "failed",
            "message" : "Database error"
        });
    });
};