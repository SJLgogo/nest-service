import { EntitySchema } from "typeorm";
import { User } from "../entity/user.entity";


// 分离实体定义 
export const UserSchema = new EntitySchema<User>({
    name:'User',
    target:User,
    columns: {
        id: {
          type: Number,
          primary: true,
          generated: true,
        },
        userName: {
            type: String,
          },
        age: {
          type: Number,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    })