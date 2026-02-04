const prisma = require('./prisma');

async function createUser(username, password) {
    //mock create user
    console.log(username, password);
    return;
} 

module.exports = {
    createUser,
}