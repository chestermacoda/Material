const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

function authMiddleware(req, res, next) {
    
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    const tokenWithoutBearer = token.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(tokenWithoutBearer, jwtConfig.secret);

        req.user = decoded; // anexamos o usuário ao request

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}

module.exports = authMiddleware;
