import { registerAs } from "@nestjs/config";

/**
 * 在registerAs（）工厂函数中。env对象将包含完全解析的环境变量键/值对（如上所述解析和合并了.env文件和外部定义的变量）。
 */
export default registerAs('database',()=>({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 3306
}))

/**
 * 使用 :
 * imports:[
 *     ConfigModule.forRoot({
 *          load:[databaseConfig]
 *      })
 * ]
 * 
 * const dbHost = this.configService.get<string>('database.host')
 */

