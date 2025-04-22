import { ObjectLike } from '@codelab/shared-abstract-types';
/**
 * To show the correct source file in browser console, enable ignore list
 *
 * https://developer.chrome.com/docs/devtools/settings/ignore-list
 *
 * Add `/c-log\.ts$` pattern
 *
 */
declare class Logger {
    info(...objects: Array<boolean | number | string | ObjectLike | null | undefined>): void;
    error(...objects: Array<boolean | number | string | ObjectLike | null | undefined>): void;
    warn(...objects: Array<boolean | number | string | ObjectLike | null | undefined>): void;
    debug(...objects: Array<boolean | number | string | ObjectLike | null | undefined>): void;
    /**
     * Format messages without stringifying complex objects to avoid circular reference errors
     */
    private formatMessage;
}
export declare const logger: Logger;
export {};
