import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class AlbumsService{
    constructor(
        @InjectDataSource('albumsConnection')    /** albumsConnection:TypeOrm集成数据库，数据库的自定义名称 ， 适用于多数据库情况*/ 
        private dataSource: DataSource,
      ) {}
}


/**
 * 在模块中也可以这样引入
 * @Module({
 *  providers:[
 *      {
            provide:AlbumsService,
            useFactory: (albumsConnection: DataSource) => {
            return new AlbumsService(albumsConnection);
            },
            inject: [getDataSourceToken('albumsConnection')],
 *      }
 *  ]
 * })
 * export class UserModule{}
 * 
 */