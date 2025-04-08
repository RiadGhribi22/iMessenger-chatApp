const formidable = require('formidable');
const validator = require('validator')
const userModel = require('../models/users');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path')
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {

    const form = formidable();
    form.parse(req, async (err, fields, files) => {

        const { userName, email, password, confirmPassword } = fields;
        const { image } = files;
        const error = [];

        if (!userName) {
            error.push('please provide your user name')
        }
        if (!email) {
            error.push('please provide your email')
        }
        if (email && !validator.isEmail(email)) {
            error.push('please provide your valid email')

        }
        if (!password) {
            error.push('please provide your  password')

        }
        if (!confirmPassword) {
            error.push('please provide your confirm password')

        }
        if (password && confirmPassword && password !== confirmPassword) {
            error.push('your password and confirm password art not the same')

        }
        if (password && password.length < 6) {
            error.push('please provide password with caracteres')
        }
        if (Object.keys(files).length === 0) {
            error.push('please choose image')
        }
        if (error.length > 0) {
            return res.status(400).json({
                error: {
                    errMessage: error
                }
            })
        }
        else {

            const getNameImage = files.image.originalFilename;
            const randomNumber = Math.floor(Math.random() * 999999);
            const newImageName = randomNumber + getNameImage;

            files.image.originalFilename = newImageName;

            const newPath = path.join(__dirname, `../../client/public/images/`, files.image.originalFilename);

            try {

                const checkUser = await userModel.findOne({
                    email: email
                });
                if (checkUser) {
                    return res.status('403').json({
                        error: {
                            errMessage: ['your email is already exist !']
                        }
                    })
                }
                else {

                    const hashPassword = await bcrypt.hash(password, 10)


                    fs.copyFile(files.image.filepath, newPath, async (err) => {
                        if (!err) {
                            const userCreated = await userModel.create({
                                userName,
                                email,
                                password: hashPassword,
                                image: files.image.originalFilename
                            })

                            const access_Token = jwt.sign({
                                id: userCreated._id,
                                email: userCreated.email,
                                userName: userCreated.userName,
                                image: userCreated.image,
                                registerTime: userCreated.createdAt,
                            }, process.env.SECRET, {
                                expiresIn: process.env.TOKEN_EXP
                            })
                            const option = {
                                expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000),
                                httpOnly: true, // Secure against XSS

                            };
                            res.status(201).cookie('access_Token', access_Token, option).json({
                                successMessage: 'Your Signup Is Successfully ', access_Token
                            })
                        }
                        else {

                            res.status(500).json({
                                error: {
                                    errMessage: ['Interanl Server Error']
                                }
                            })
                        }




                    })



                }
            }

            catch (error) {
                res.status(500).json({
                    error: {
                        errMessage: ['Internal Server Error ']
                    }
                })
            }


        }

    })


}

const signin = async (req, res) => {

    const error = [];
    const { email, password } = req.body;

    if (!email) {
        error.push('Please provide your email')
    }
    if (!password) {
        error.push('Please provide your password')
    }
    if (email && !validator.isEmail(email)) {
        error.push('please provide your valid email')

    }
    if (error.length > 0) {
        return res.status(400).json({
            error: {
                errMessage: error,
            },
        })
    }
    else {

        try {
            const userCheck = await userModel.findOne({ email }).select('+password')

            if (userCheck) {
                const correctPassword = await bcrypt.compare(password, userCheck.password)

                if (correctPassword) {

                    const access_Token = jwt.sign({
                        id: userCheck._id,
                        email: userCheck.email,
                        userName: userCheck.userName,
                        image: userCheck.image,
                        registerTime: userCheck.createdAt,
                    }, process.env.SECRET, {
                        expiresIn: process.env.TOKEN_EXP
                    })
                    const option = {
                        expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000),
                        httpOnly: true, 

                    };
                    res.status(200).cookie('access_Token', access_Token, option).json({
                        successMessage: 'Your Signin Is Successfully ', access_Token
                    })

                }
                else {
                    return res.status(400).json(
                        {
                            error: {
                                errMessage: ['Incorrect Password '],
                            }
                        }
                    )
                }
            }
            else {
                return res.status(404).json({
                    error: {
                        errMessage: ['Email Does not exist !!!']
                    }
                })
            }

        }
        catch (error) {
            console.log(error)
        }
    }
}
const signout = async (req, res) => {



        console.log('hello') 
        res.status(200).cookie('access_Token','').json({
            successMessage: 'Your Signout Is Successfully ',success : true
        })

}
module.exports = {
    signup,
    signin,
    signout
}