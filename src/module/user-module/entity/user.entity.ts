import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column({default:false})
    isActive:boolean;
}