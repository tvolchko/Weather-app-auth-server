const db = require('./data/db-config')

module.exports = {
    add,
    find,
    findBy,
  }
  
  function find() {
    return db("users as u")
      .select("u.user_id", "u.username")
  }
  
  function findBy(filter) {
    return db("users as u")
      .select("u.user_id", "u.username", "u.password")
      .where(filter)
      .first()
  }
  
  async function add(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }