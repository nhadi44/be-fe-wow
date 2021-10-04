const { users } = require('../../models/')

const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const data = req.body

        const salt = await bcrypt.genSalt(10);

        const schema = Joi.object({
            email: Joi.string().email().min(3).required(),
            password: Joi.string().min(6).required(),
            fullName: Joi.string().min(6).required(),
            role: Joi.string().required()
        })
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const { error } = schema.validate(data)

        if (error) {
            return res.status(400).send({
                status: 'error',
                message: error.details[0].message
            })
        }

        const userExist = await users.findOne({
            where: {
                email: data.email
            }
        })


        if (userExist) {
            return res.status(403).send({
                status: 'error',
                message: 'Email already exist'
            })
        } else {

            const dataToken = {
                id: req.body.id
            }

            const token = jwt.sign(dataToken, process.env.SECRET_KEY)

            const newUser = await users.create({
                email: req.body.email,
                password: hashedPassword,
                fullName: req.body.fullName,
                role: req.body.role
            })

            res.status(200).send({
                status: 'success',
                data: {
                    name: newUser.fullName,
                    email: newUser.email,
                    token

                }
            })
        }

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const data = req.body

        const schema = Joi.object({
            email: Joi.string().email().min(3).required(),
            password: Joi.string().min(6).required()
        })

        const { error } = schema.validate(data)

        if (error) {
            return res.status(400).send({
                status: 'error',
                message: error.details[0].message
            })
        }

        const userExist = await users.findOne({
            where: {
                email: data.email
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        if (!userExist) {
            return res.status(404).send({
                status: 'failed',
                message: 'Email and Password dont match'
            })
        }

        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isValid) {
            return res.status(403).send({
                status: 'failed',
                message: 'Email and Password dont match'
            })
        }

        const dataToken = {
            id: userExist.id
        }

        const token = jwt.sign(dataToken, process.env.SECRET_KEY)

        res.status(200).send({
            status: 'success',
            data: {
                name: userExist.fullName,
                email: userExist.email,
                token
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}