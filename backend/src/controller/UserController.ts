import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserModel from "../database/model/UserModel";
import brcrypt from 'bcryptjs';
import authUtil from "../utils/authUtil";

interface User {
    name: string;
    email: string;
    password: string
}

class UserController {
    static async Login(req: Request, res: Response): Promise<void>{
        try {
            const { email, password }: User = req.body;
            const user = await UserModel.findOne({ where: { email } });

            if(!user){
                res.status(400).json({
                    message: 'Email ou senha incorretos',
                });
                return;
            }

            const passwordValidate = await brcrypt.compare(password, user.password);

            if(!passwordValidate){
                res.json({
                    message: 'Email ou senha incorretos',
                });
                return;
            }

            const token = await authUtil.generateToken(user);

            res.status(200).json({
                message: 'Usuário logado com sucesso',
                token: token
            })
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao realizar o login',
                error: error
            })
        }
    } 

    static async CreateUser(req: Request, res: Response): Promise<void>{
        const errorRequest = validationResult(req);

        if(!errorRequest.isEmpty()){
            res.status(400).json({
                error: errorRequest.array()
            });
            return;
        }

        const { name, email, password }: User = req.body;

        try {
            const userExist = await UserModel.emailIsUnique(email);

            if(userExist){
                res.status(400).json({
                    message: 'Já possui um usuário com esse email'
                });
                return;
            }

            const user = await UserModel.createUser(name, email, password);
            res.status(200).json({
                message: 'Usuário criado com sucesso',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error: any) {
            console.log(error);

            if (error instanceof Error){
                if(error.name === 'SequelizeUniqueConstraintError'){
                    res.status(400).json({
                        message: 'Já possui um usuário com esse email'
                    })
                } else {
                    res.status(500).json({
                        message: 'Erro ao criar usuário',
                        error: error.message
                    })
                }
            }
        }
            
    }
}


export default UserController;