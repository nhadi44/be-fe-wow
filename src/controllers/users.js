const { users } = require("../../models");

// Find All
exports.getUsers = async (req, res) => {
    try {
        const channel = await users.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'role'],
            },
        })

        res.send({
            status: 'success',
            data: channel
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Find One
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await users.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            }
        })

        res.send({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error) {

    }
}

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const updateData = req.body

        await users.update(updateData, {
            where: {
                id: id
            }
        })
        res.send({
            status: 'success',
            message: `Update user id ${id} finished`,
            data: updateData
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await users.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Data user id: ${id} deleted`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server error'
        })
    }
}