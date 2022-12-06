import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    sex:string

}