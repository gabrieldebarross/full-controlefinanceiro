import jwt from 'jsonwebtoken';
import UserModel from '../database/model/UserModel';

const JWT_SECRET = process.env.SECRET_KEY;
const JWT_EXPIRES_IN = '7d';

class authUtil {
    static async generateToken(user: UserModel): Promise<string> {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };
    
        return jwt.sign(payload, String(JWT_SECRET), { expiresIn: JWT_EXPIRES_IN });
    }

    static async verifyToken(token: string): Promise<{ id: number; name: string; email: string }> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, String(JWT_SECRET), (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded as { id: number; name: string; email: string });
                }
            });
        })
    }
}

export default authUtil;