import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Res() response) {
        const userData = await this.userService.getAllUsers();
        if (!userData) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Cant get all users'
            })
        }
        return response.status(HttpStatus.OK).json({
            message: 'The list of all users',
            userData
        })
    }

    @Get(':id')
    async getUser(@Res() response, @Param('id') userId: string) {
        const specifiedUser = await this.userService.getUser(userId);
        if (!specifiedUser) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Could not get the specified user'
            })
        }
        return response.status(HttpStatus.OK).json({
            message: 'Successfully got a user',
            specifiedUser
        })
    }

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.userService.createUser(createUserDto);
        if (!newUser) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'User not created!!!',
                error: 'Bad Request'
            });
        }
        return response.status(HttpStatus.CREATED).json({
            message: 'User has been successfully created',
            newUser
        });
    }

    @Put(':id')
    async updateUser(@Res() response, @Param('id') userId: string, 
        @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = this.userService.updateUser(userId, updateUserDto);
        if (!updatedUser) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Could not update a user'
            });
        }
        return response.status(HttpStatus.OK).json({
            message: 'User has been updated',
            updatedUser
        })
    }

    @Delete(':id')
    async deleteUser(@Res() response, @Param('id') userId: string) {
        const deletedUser = await this.userService.deleteUser(userId);
        console.log(deletedUser);
        if (!deletedUser) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Could not delete a user'
            })
        }
        return response.status(HttpStatus.OK).json({
            message: 'User has been successfully deleted',
            deletedUser
        })
    }

}
