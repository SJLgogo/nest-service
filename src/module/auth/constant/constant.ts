import { SetMetadata } from "@nestjs/common";

// 将使用它在JWT签名和验证步骤之间共享密钥 
export const jwtConstants={
    secret: 'secretKey', // 不应该暴露出来
    expiresIn: 1, // 3 分钟内过期
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);