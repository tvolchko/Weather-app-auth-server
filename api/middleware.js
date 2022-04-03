const Users = require('./model')



const checkUsernameExists = async (req, res, next) => {
    let username = req.body.username
    const query = await Users.findBy({ username })
    if(!query){
        next({message: "invalid credentials", status: 401})
    } else {
        next()
    }
}

const validatateRegister = async (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        next({message: "username and password required", status: 401})
    } else {
        const query = await Users.findBy({ username })
        if(query){
            next({message: "username taken", status: 401})
        } else {
            next()
        }
    }
}

const validatateLogin = async (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        next({message: "username and password required", status: 401})
    } else {
            next()
    }
}

module.exports = {
    checkUsernameExists,
    validatateLogin,
    validatateRegister
}