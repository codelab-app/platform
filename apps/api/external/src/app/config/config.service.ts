import * as dotenv from "dotenv";
import * as fs from "fs";
// import { IRedisConfig, IRedisEndpoints } from "../interfaces/common/redis.interface";
// import { IRateLimitConfig } from "../interfaces/common/ratelimit.interface";
import { Logger } from "@nestjs/common";
import {IGQLConfig} from "../interfaces/gql.interface"

export class ConfigService {
    private readonly envConfig: Record<string, string>;
    private readonly logger = new Logger(this.constructor.name);

    constructor(filePath: string) {
        this.logger.log('cwd: ', process.cwd());
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        this.logger.log("Config " + JSON.stringify(this.envConfig));
    }

    get GQLConfig(): IGQLConfig {
        return {
            debug: parseInt(this.envConfig.GQL_DEBUG, 10) ? true : false,
            tracing: parseInt(this.envConfig.GQL_TRACING, 10) ? true : false,
            playground: parseInt(this.envConfig.GQL_PLAYGROUND, 10) ? true : false,
            cache : parseInt(this.envConfig.GQL_CACHE,10) ? true : false,
            cacheTTL : parseInt(this.envConfig.GQL_CACHE_TTL),
        };
    }

    get graphQLEngineAccessKey(): string {
        return this.envConfig.GQL_ENGINE_ACCESS_KEY;
    }

    get graphQLEngineURI(): string {
        return this.envConfig.GQL_ENGINE_URI;
    }

    get jwtSecret() : string {
        return this.envConfig.JWT_SECRET;
    }

    get dbHost(): string {
        return this.envConfig.DB_HOST;
    }

    get dbType(): string {
        return this.envConfig.DB_TYPE;
    }

    get dbPort(): number {
        return parseInt(this.envConfig.DB_PORT);
    }
    
    get dbUsername(): string {
        return this.envConfig.DB_USERNAME;
    }

    get dbPassword(): string {
        return this.envConfig.DB_PASSWORD;
    }

    get db(): string {
        return this.envConfig.DB;
    }
}
