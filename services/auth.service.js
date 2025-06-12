import jwt from 'jsonwebtoken'

export default class AuthService {
    constructor(){}

    verifyToken(req, res) {
        const { token } = req.cookies;
        if (token != null) {
            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if (err) return null;
                return data;
            });
        }
        return null;
    }

    checkRole(data, role) {
        return data.role && data.role === role
    }
}