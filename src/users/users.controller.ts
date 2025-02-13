import { 
    Controller,
    Post, 
    Get, 
    Delete, 
    Param, 
    Body, 
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from "./users.service"
import { CreateUserRequest } from 'src/request/createUserRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';


@Controller('/users')
export class UsersController {

    constructor(private readonly usersService: UsersService ) {}

    @Post("create-user")
    @UseInterceptors(FileInterceptor('file'))
    async createUser(
        @UploadedFile() file: Multer.File, 
        @Body() request: CreateUserRequest) {

        return this.usersService.createUser(file, request);
    }

    @Get()
    async findAllUsers() {
        return this.usersService.getAllUsers()
    }

    @Get('user/:id')
    async findUserById(@Param('id') id: string) {
        return this.usersService.getUserById(Number(id));
    }

    @Delete('delete/user/:id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }

    @Post('user/update/:id')
    @UseInterceptors(FileInterceptor('file'))
    async updateUser(@Param('id') id: string, @UploadedFile() file: Multer.File,  @Body() request: CreateUserRequest) {
        return this.usersService.updateUser(Number(id), file, request);
    }

    @Get("file/:filename")
    async getImageByFilename(@Param("filename") filename: string, @Res() res: Response) {
        const image = await this.usersService.getImageByFilename(filename) as { mimetype: string, data: Buffer };

        res.setHeader('Content-Type', image.mimetype);
        res.send(image.data);
    }    
}
