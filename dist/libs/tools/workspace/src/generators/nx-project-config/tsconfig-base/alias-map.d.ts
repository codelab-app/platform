/**
 * Does not work with multiple wildcards `/*\/*`
 */
export declare const aliasMap: {
    '^frontend-application-(?!shared)[a-z]+$': string[];
    '^frontend-application-atom$': string[];
    '^frontend-presentation-view': string[];
    '^frontend-application-builder$': string[];
    '^frontend-application-dnd$': string[];
    '^frontend-application-renderer$': string[];
    '^frontend-application-resource$': string[];
    '^frontend-application-type$': string[];
    '^frontend-domain-[a-z]+$': string[];
    '^frontend-domain-domain$': string[];
    '^frontend-domain-prop$': string[];
    '^shared-infra-auth0$': string[];
};
