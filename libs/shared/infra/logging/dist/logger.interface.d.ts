import { ObjectLike } from '@codelab/shared-abstract-types';
import { LoggerService } from '@nestjs/common';
export interface LogOptions {
    /**
     * [Nest] 19096   - 12/08/2019, 7:12:59 AM   [NestFactory] Starting Nest application...
     *
     * The `NestFactory` is the context
     */
    context?: string;
    /**
     * Place to put additional data
     */
    data?: ObjectLike | null;
    [key: string]: unknown;
}
/**
 * Considered using overloading instead of putting data in options, but would be hard to distinguish between objects without a discriminated key, something like `__context`.
 */
export interface ILoggerService extends LoggerService {
    log(message: string, options?: LogOptions): void;
    debug(message: string, options?: LogOptions): void;
    error(message: string, options?: LogOptions): void;
    warn(message: string, options?: LogOptions): void;
    verbose(message: string, options?: LogOptions): void;
}
