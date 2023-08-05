import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { ApiResponse, User } from "@virtual-library/models";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  public async listAllUsers(): Promise<ApiResponse<User[]>> {
    const users =  await this.usersRepository.find();

    return { sucess:true, message: "Succesfully listed users ",result: users } as ApiResponse<User[]>
  }

  public async createUser(user: User): Promise<ApiResponse<any>>  {
    try {
      const entity = new UserEntity();
      entity.email = user.email;
      entity.password = user.password;
      entity.name = user.name;

     const found =  await this.usersRepository.findOneBy({ email: entity.email });

     if(!found && !found.id) {
      const result =  await this.usersRepository.insert(entity);

      return { sucess:true, message: "Succesfully created user ",result: result.raw.email } as ApiResponse<any>


     } else {
      return { statusCode:500, sucess:false, message: "User Already Exists!" } as ApiResponse<any>
     }


    } catch (error:any) {
      return { sucess:false, message: "There was a problem creating a new user", error: error.message } as ApiResponse<any>
    }
  }
}
