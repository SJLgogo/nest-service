import { Exclude, Expose, Transform } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

// entity 映射到数据库表的类 ， 可以通过一个新类来创建一个实体 ，并用 @Entity来标记
@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')   //  标记为主列 ，值自动生成
    id:number
    
    @Column()
    userName:string
    
    @Column()
    age:number

    @Column()
    @Exclude()
    sex:string

    @Expose()
    get fullMsg(): string {
      return `${this.userName} ${this.age}`;
    }
  
    @Transform(({ value }) => value.carName) role: Car;

    constructor(partial:Partial<User>){
        Object.assign(this,partial)
    }

}