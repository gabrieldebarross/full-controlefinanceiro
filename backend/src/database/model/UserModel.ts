import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import brcrypt from 'bcryptjs';

interface AtributesUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface AtributesCreateUser extends Optional<AtributesUser, 'id'> {};

export default class UserModel extends Model<AtributesUser, AtributesCreateUser> implements AtributesUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    static async createUser(name: string, email: string, password: string): Promise<UserModel> {
        const passwordHash = await brcrypt.hash(password, 8);

        return UserModel.create({
            name,
            email,
            password: passwordHash
        });
    };

    static async emailIsUnique(email: string): Promise<UserModel | null>{
        return await UserModel.findOne({
            where: {
                email
            }
        })
    }
};

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
