import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserInfo } from './entities/userInfo';
import { UserContact } from './entities/userContact';
import { UserAddress } from './entities/userAddress';
import { UserAcademicBackground } from './entities/userAcademicBackground';
import { UserDto } from "./dto/userDto"
import { ResponseDto } from "../apiResponse/responseDto"
import { CreateUserRequest } from 'src/request/createUserRequest';
import { Multer } from 'multer';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserInfo) private userInfoRepo: Repository<UserInfo>,
    @InjectRepository(UserContact) private userContactRepo: Repository<UserContact>,
    @InjectRepository(UserAddress) private userAddressRepo: Repository<UserAddress>,
    @InjectRepository(UserAcademicBackground) private userAcademicsRepo: Repository<UserAcademicBackground>,
  ) { }


  async createUser(file: Multer.File, request: CreateUserRequest): Promise<Object> {

    return await this.dataSource.transaction(async (manager) => {
      const userInfo = manager.create(UserInfo, {
        dob: request.dob,
        gender: request.gender,
        lastName: request.lastName,
        firstName: request.firstName,
        occupation: request.occupation,

        data: file.buffer,
        mimetype: file.mimetype,
        profilePhoto: file.originalname,
      });
      await manager.save(userInfo);

      const userContact = manager.create(UserContact, {
        fax: request.fax,
        email: request.email,
        phoneNumber: request.phoneNumber,
        linkedInUrl: request.linkedInUrl,
        userInfo
      })
      await manager.save(userContact);

      const userAddress = manager.create(UserAddress, {
        address: request.address,
        city: request.city,
        state: request.state,
        country: request.country,
        zipCode: request.zipCode,
        userInfo
      })
      await manager.save(userAddress);

      const academics = manager.create(UserAcademicBackground, {
        grade: request.grade,
        degree: request.degree,
        endDate: request.endDate,
        startDate: request.startDate,
        activities: request.activities,
        schoolName: request.schoolName,
        description: request.description,
        fieldOfStudy: request.fieldOfStudy,
        userInfo
      });
      await manager.save(academics);
      return new ResponseDto(false, "User created successfully", null);
    })
  }

  // Get all users
  async getAllUsers(): Promise<ResponseDto<UserInfo[]>> {
    try {
      const users = await this.userInfoRepo.find();

      return new ResponseDto(false, 'Users retrieved successfully', users);
    } catch (error) {
      return new ResponseDto(true, "Something went wrong. Please try again", []);
    }
  }


  // Get user by id
  async getUserById(id: number): Promise<ResponseDto<UserDto>> {
    try {
      const user =  await this.userInfoRepo.findOne({
        where: { id },
        relations: ['contact', 'address', 'academicBackgrounds'],
      });
      const userDto = plainToInstance(UserDto, user);
      
      return new ResponseDto(false, 'User retrieved successfully', userDto);
    } catch (error) {
      return new ResponseDto(true, "Something went wrong. Please try again", {} as UserDto);
    }
  }


  // Delete user
  async deleteUser(id: number): Promise<ResponseDto<string>> {
    try {
      const userInfo = await this.userInfoRepo.findOne({ where: { id } });

      if (!userInfo) {
        return new ResponseDto(true, 'User not found', '');
      }
      await this.userInfoRepo.remove(userInfo); // Cascades handle related deletions

      return new ResponseDto(false, 'User deleted successfully', '');
    } catch (error) {
      return new ResponseDto(true, 'Something went wrong. Please try again', '');
    }
  }


  // Update user
  async updateUser(id: number, file: Multer.File, request: CreateUserRequest): Promise<ResponseDto<UserDto>> {
    try {
      const userInfo = await this.userInfoRepo.findOne({ where: { id } });
      if (!userInfo) {
        return new ResponseDto<UserDto>(true, 'User not found', {} as UserDto);
      }

      const buffer =  file == undefined ? userInfo.data : file.buffer
      const mimetype = file == undefined ? userInfo.mimetype : file.mimetype
      const originalname = file == undefined ? userInfo.profilePhoto : file.originalname

      await this.dataSource.transaction(async (manager) => {
        manager.merge(UserInfo, userInfo, {
          dob: request.dob,
          gender: request.gender,
          lastName: request.lastName,
          firstName: request.firstName,
          occupation: request.occupation,
          data: buffer,
          mimetype: mimetype,
          profilePhoto: originalname
        });
        await manager.save(userInfo);

        const userContact = await this.userContactRepo.findOne({ where: { userInfo } });
        if (userContact) {
          manager.merge(UserContact, userContact, {
            fax: request.fax,
            email: request.email,
            phoneNumber: request.phoneNumber,
            linkedInUrl: request.linkedInUrl
          });
          await manager.save(userContact);
        }

        const userAddress = await this.userAddressRepo.findOne({ where: { userInfo } });
        if (userAddress) {
          manager.merge(UserAddress, userAddress, {
            address: request.address,
            city: request.city,
            state: request.state,
            country: request.country,
            zipCode: request.zipCode
          });
          await manager.save(userAddress);
        }

        const userAcademicBackground = await this.userAcademicsRepo.findOne({ where: { userInfo } });
        if (userAcademicBackground) {
          manager.merge(UserAcademicBackground, userAcademicBackground, {
            grade: request.grade,
            degree: request.degree,
            endDate: request.endDate,
            startDate: request.startDate,
            activities: request.activities,
            schoolName: request.schoolName,
            description: request.description,
            fieldOfStudy: request.fieldOfStudy
          });
          await manager.save(userAcademicBackground);
        }
      });

      const updatedUser = await this.getUserById(id);
      return new ResponseDto(false, 'User updated successfully', updatedUser.data);
    } catch (error) {
      console.log(error)
      return new ResponseDto(true, "Something went wrong. Please try again", {} as UserDto);
    }
  }

  async getImageByFilename(filename: string): Promise<Object> {
    const image = await this.userInfoRepo.findOne({ where: { profilePhoto: filename } })
    return image ? image : new ResponseDto(true, 'Image not found', null)
  }
}
