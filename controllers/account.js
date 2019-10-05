const errorMessages = require('../configuration/error');
const User = require('../models/user');
const College = require('../models/college');

const cookieParser = require('cookie-parser'); // in order to read cookie sent from client
var store = require('store');
const randomstring = require('randomstring');
const mustache = require('mustache');
const bcrypt = require('bcryptjs');
const httpStatusCodes = require('http-status-codes');
const JWT = require(`jsonwebtoken`);
const util = require('util');
const globals = require('../configuration/globals');
const {
    JWT_SECRET,
    JWT_EXPIRY_TIME,
    JWT_ISSUER,
    userBlockageTimeForTooManySignUpRequests,
    maximumSignUpRequestBeforeBlocking,
    RESET_PASSWORD_EXPIRY_TIME,
    NEWS_EXPIRY_TIME,
    NOTIFICATION_EXPIRY_TIME,
    cookiesName,    
} = require('../configuration');

//sign a new token
const signToken = emailId => {
    return JWT.sign({
        iss: JWT_ISSUER,
        sub: emailId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + JWT_EXPIRY_TIME),
    }, JWT_SECRET);
};

module.exports = {
    //Register user
    temp: async (req,res,next) => {
        const {which} = req.body;
        console.log("hell0o");
        if(which == "s")
        {
            res.render('index/student_register');
        }
        else
        {
            res.render('index/college_register');
        }
    },
    signUpS: async (req, res, next) => {

        const {email, password, password2, name, phone, gender, college} = req.body;
        console.log("register function : " + email);

        //Check required fields
        if(!email || !password || !password2) {
            res.status(httpStatusCodes.PRECONDITION_FAILED)
                .send(errorMessages.requiredFieldsEmpty);
        } else {
            console.log('validation passed');
            
            // validation passed
            const userFound = await User.findOne({ email: email })
                .then()
                .catch(err => {
                    console.log(err);
                    res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.userNotExist);
                });    

            if(userFound) {
                res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.userAlreadyExist);
            } else {
                console.log('not found');

                if(name == undefined) name = 'None';
                if(email == undefined) email = 'None';
                if(gender == undefined) gender = 'None';
                if(phone == undefined) phone = 'None'; 
                if(college == undefined) college = 'None';
                let verified = 'true';  
                let userFlag = 'none';
                const newUser = new User({
                    name,
                    email,
                    password,
                    phone,
                    gender,
                    userFlag,
                    college,
                    verified,
                });

                console.log(newUser);

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                newUser.password = hashedPassword;

                console.log(hashedPassword);
                
                await newUser.save()
                .then(user => {
                    console.log('User Registered');
                    // res.status(httpStatusCodes.OK)
                    //     .json({ user: user});
                    res.redirect('/account/logIn');
                })
                .catch(err => {
                    console.log('err');
                    res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.errorSavingUser);
                });
            }
        };
    
        
    },
    signUpC: async (req, res, next) => {

        const {collegeEmail,collegeAddress, password, password2, collegeName, collegePhone,} = req.body;

        //Check required fields
        if(!collegeEmail || !password || !password2) {
            res.status(httpStatusCodes.PRECONDITION_FAILED)
                .send(errorMessages.requiredFieldsEmpty);
        } else {
            console.log('validation passed');
            
            // validation passed
            const CollegeFound = await College.findOne({ collegeEmail: collegeEmail })
                .then()
                .catch(err => {
                    console.log(err);
                    res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.userNotExist);
                });    

            if(CollegeFound) {
                res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.userAlreadyExist);
            } else {
                console.log('not found');

                if(collegeName == undefined) collegeName = 'None';
                if(collegeEmail == undefined) collegeEmail = 'None';
                if(collegePhone == undefined) collegePhone = 'None'; 
                if(collegeAddress == undefined) collegeAddress = 'None';
                const newCollege = new College({
                    collegeName,
                    collegeEmail,
                    password,
                    collegePhone,
                    collegeAddress,
                });

                console.log(newCollege);

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                newCollege.password = hashedPassword;

                console.log(hashedPassword);
                
                await newCollege.save()
                .then(college => {
                    console.log('User Registered');
                    // res.status(httpStatusCodes.OK)
                    //     .json({ user: user});
                    res.redirect('/account/logIn');
                })
                .catch(err => {
                    console.log('err');
                    res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.errorSavingUser);
                });
            }
        };
    
        
    },
    logIn: async (req, res, next) => {
        const { email,password, which } = req.body;
        console.log(req.body.which);
        console.log('email : ' + email);
        if(which == "s"){
        const userFound = await User.findOne({ email });

        if(!userFound) {
            return res.status(httpStatusCodes.FORBIDDEN)
                .send(errorMessages.userNotRegistered);
        } else {
            // console.log(userFound);
            globals.user = userFound;
            res.redirect('/events/public2');
        }
        } else {
            const collegeFound = await College.findOne({ collegeEmail : email });

        if(!collegeFound) {
            return res.status(httpStatusCodes.FORBIDDEN)
                .send(errorMessages.userNotRegistered);
        } else {
            // console.log(userFound);
            console.log("coll");
            globals.user = collegeFound;
            res.redirect('/events/public2');
        }
        }
    },

    logOut: async (req, res, next) => {
        globals.user = "none";
        res.redirect('/events/public');
    },

    getUser: async (req, res, next) => {
        const {userId} = req.body;
        console.log('getUser : ' +userId);

        await User.findById(userId)
            .then(foundUser => {
                if(!foundUser)
                {
                    res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.userNotExist);
                } else {
                    res.status(httpStatusCodes.OK)
                        .json({user : foundUser});
                }
            })
            .catch(err => {
                res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.userNotExist);
            });
    },

};

