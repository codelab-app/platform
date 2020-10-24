import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`${process.cwd()}/.env`),
        }],
    exports: [ConfigService]
})
export class ConfigModule { }
