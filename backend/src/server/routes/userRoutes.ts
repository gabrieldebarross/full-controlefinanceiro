import { Router } from 'express';
import UserController from '../../controller/UserController';
import { check } from 'express-validator';

const userRoutes = Router();

userRoutes.post('/user/login', UserController.Login);
userRoutes.post('/user', [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    check('name').not().isEmpty().withMessage('O nome é obrigatório')
], UserController.CreateUser);

export default userRoutes;