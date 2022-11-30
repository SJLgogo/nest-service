import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


/** handle()返回一个Rxjs流 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // console.log('Before');
        const now = Date.now()
        return next.handle().pipe(
            tap(()=>{}
            // console.log(`After ... ${Date.now() - now}ms`)
            )
        )
    }
}