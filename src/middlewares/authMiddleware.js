const jwt = require("jsonwebtoken");
const config = require("../config/env.json");

const errorMessage = {
    authorizationError: { erro: "Erro na autorização" },
    invalidToken: { erro: "Token inválido" },
    malformattedToken: { erro: "Token mal-formatado" },
    unauthorizedAccess: { erro: "Acesso não autorizado" },
}

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).send(errorMessage.unauthorizedAccess)
    
    const [scheme, token] = authHeader.split(" ");

    if (!token) return res.status(401).send(errorMessage.authorizationError)
    
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send(errorMessage.malformattedToken);
    
    jwt.verify(token, config.tokenSecret, (err, decoded) => {
        if (err) return res.status(401).json(errorMessage.invalidToken);

        req.userId = decoded._id;
        req.isAdmin = decoded.isAdmin;
    });
    
    next();
}