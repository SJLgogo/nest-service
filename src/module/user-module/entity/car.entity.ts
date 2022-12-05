import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car{
    @PrimaryGeneratedColumn()   //  标记为主列 ，值自动生成
    id:number

    @Column()
    carName:string;

}