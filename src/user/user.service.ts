import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { UserInterface } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {  
        const newUser = await new this.userModel(createUserDto);
        return newUser.save();
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserInterface> {
        const currentUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
            new: true
        });
        if (!currentUser) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return currentUser;
    }

    async getAllUsers(): Promise<UserInterface[]> {
        const userData = await this.userModel.find();
        if (!userData || userData.length == 0) {
            throw new NotFoundException('No User was found');
        }
        return userData;
    }

    async getUser(userId: string): Promise<UserInterface> {
        const currentUser = await this.userModel.findById(userId).exec();
        if (!currentUser) {
            throw new NotFoundException(`User with id ${userId} was not found`);
        }
        return currentUser;
    }
    
    async deleteUser(userId: string): Promise<UserInterface> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new NotFoundException(`User with id ${userId} was not found`);
        }
        return deletedUser;
    }

}
