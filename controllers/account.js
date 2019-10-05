const errorMessages = require('../configuration/error');
const User = require('../models/user');


const randomstring = require('randomstring');
const mustache = require('mustache');
const bcrypt = require('bcryptjs');
const httpStatusCodes = require('http-status-codes');
const JWT = require(`jsonwebtoken`);
const util = require('util');

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
    signUp: async (req, res, next) => {
        const {email, password, password2, name, phone, address, gender, about, userFlag, college,verified} = req.body;
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
                if(address == undefined) address = 'None';
                if(userFlag == undefined) userFlag = 'None';
                if(college == undefined) college = 'None';

                const newUser = new User({
                    name,
                    email,
                    password,
                    phone,
                    gender,
                    address, 
                    userFlag,
                    college,
                    verified,
                    about
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
                    res.status(httpStatusCodes.OK)
                        .json({ user: user});
                })
                .catch(err => {
                    console.log('err');
                    res.status(httpStatusCodes.FORBIDDEN)
                        .send(errorMessages.errorSavingUser);
                });
            }
        }
    },
};