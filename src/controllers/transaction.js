const { transactions, users } = require('../../models')


// Add transaction
exports.addTransaction = async (req, res) => {
    try {
        const data = req.body

        const createData = await transactions.create(data)

        res.status(200).send({
            status: 'success',
            data: createData,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const data = await transactions.findAll({
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'role']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            }
        })

        res.status(200).send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                status: 'failed',
                message: 'Server Error'
            })
    }
}

// Find One
exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const data = await transactions.findOne({
            where: {
                id: id
            },
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            }
        })

        res.status(200).send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                status: 'failed',
                message: 'Server Error'
            })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        const transaction = await transactions.findOne({
            where: {
                id: id
            },
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser', 'paymentStatus']
            }
        })

        const data = await transactions.update(updateData, {
            where: {
                id: id
            },
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            }
        })

        res.status(200).send({
            status: 'success',
            data: {
                transaction,
                paymentStatus: updateData
            }
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                status: 'failed',
                message: 'Server Error'
            })
    }
}