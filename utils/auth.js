const jwt = require('jsonwebtoken');
const { sign, verify } = jwt;


const secret = "SECRET";

module.exports = {
    generateToken(userName) {
        const payload = { userName };

        const token = sign(payload, secret, { expiresIn: "1h" });

        return token;
    },

    readToken(token) {
        return new Promise((resolve, reject) => {
            verify(token, secret, (err, decoded) => {
                if (err) reject(err);
                else if (decoded) resolve(decoded);
            });
        });
    }

}
