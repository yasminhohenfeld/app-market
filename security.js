const securePassword = require('secure-password');
const pwd = securePassword();

const jwt = require('jsonwebtoken');


const verify_okay = async (word, encrypted_word) => {
    const result = await pwd.verify(Buffer.from(word), Buffer.from(encrypted_word, 'hex'))
    if (result === securePassword.VALID || result === securePassword.VALID_NEEDS_REHASH) {
        return true
    }
    if (result === securePassword.INVALID || result === securePassword.INVALID_UNRECOGNIZED_HASH) {
        return false
    }
}


const encrypt = async (word) => {
    const encrypted_buffer = await pwd.hash(Buffer.from(word))
    return encrypted_buffer.toString('hex')
}


//token

const decode = (authorization) =>{
    const token = authorization.substring(7)
    
    try {
        return jwt.verify(token, 'yamin')
    } catch(error){
        return null
    }
}

const encode = (user) =>{
    return jwt.sign(user, 'yamin')
}



module.exports = {
    encrypt,
    verify_okay,
    decode, 
    encode
}