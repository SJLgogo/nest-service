import { Injectable, Logger } from "@nestjs/common";
import { Cron , CronExpression, Interval, SchedulerRegistry, Timeout } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class TaskService{

    constructor(private schedulerRegistry:SchedulerRegistry){

    }

    private readonly logger = new Logger(TaskService.name)

    // 也可以向装饰器提供Date , 这样做会导致作业在指定日期执行一次
    @Cron('45*****', {
        name: 'notifications',
        timeZone: 'Europe/Paris',
      })  
    handleCron(){
        this.logger.debug('每当秒数为45秒时执行一次')   // 每当秒数为45秒时执行一次
    }


    // 声明一个方法以指定的间隔运行 ， 在方法定义面前加上 @interval() 修饰符
    @Interval('inertval',10000)
    handleInterval(){
        this.logger.debug('10秒执行一次')
    }


    // 声明一个方法在指定的超时运行一次 。 将应用程序启动后的相对时间便宜传递给装饰器
    @Timeout('timeout',5000)
    handleTimeOut(){
        this.logger.debug('程序运行5秒后执行')
    }


    /** 增加一个任务 */
    addCornJob(name:string,seconds:string){
        const job = new CronJob(`${seconds}*****`,()=>{
            this.logger.warn(`time (${seconds}) for job ${name} to run!`);
        })
        this.schedulerRegistry.addCronJob(name,job)
        job.start()

        this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`)
    }

    /** 删除一个任务 */
    deleteCron(name:string){
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
    }

    /** 列出所有任务 */
    getCrons(){
        const jobs = this.schedulerRegistry.getCronJobs();
        jobs.forEach((value,key,map)=>{
            let next;
            try {
                next = value.nextDates().toJSDate();
              } catch (e) {
                next = 'error: next fire date is in the past!';
              }
              this.logger.log(`job: ${key} -> next: ${next}`);
        })
    }

    /** 获取动态间隔 */
    clearInterval(){
        const interval = this.schedulerRegistry.getInterval('inertval');
        clearInterval(interval);
    }

    /** 创建动态间隔 */
    addIntercal(name:string,milliseconds:number){
        const callback = () => {
            this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
        };
        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
    }

    /** 删除命名间隔 */
    deleteInterval(name: string) {
        this.schedulerRegistry.deleteInterval(name);
        this.logger.warn(`Interval ${name} deleted!`);
    }

    /** 获取所有命名间隔 */
    getIntervals() {
        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach(key => this.logger.log(`Interval: ${key}`));
    }
      

}

/**
 * 
    * * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | months
    | | | day of month
    | | hours
    | minutes
    seconds (optional)
 */