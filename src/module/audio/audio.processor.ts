import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('audio')     // 对名字为 audio 队列的消费者
export class AudioProcessor{
    private logger = new Logger()
    
    @Process('transcode')
    handleTranscode(job: Job) {
      this.logger.debug('Start transcoding...');
      this.logger.debug(job.data);
      this.logger.debug('Transcoding completed');
    }
}