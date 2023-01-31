import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Post } from "@nestjs/common";
import { Queue } from "bull";


@Controller('audio')
export class AudioController{
    constructor(@InjectQueue('audio') private audioQueue:Queue){}

    @Post('transcode')
    async transcode(@Body() post:any){
        await this.audioQueue.add('transcode',{
            file:'audio.mp3'
        })
        return 'queue'
    }
}