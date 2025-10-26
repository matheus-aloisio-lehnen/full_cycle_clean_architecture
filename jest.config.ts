import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', {
            jsc: {
                parser: { syntax: 'typescript', decorators: true },
                transform: { legacyDecorator: true, decoratorMetadata: true },
                target: 'es2020'
            },
            module: { type: 'commonjs' }
        }]
    },
    setupFiles: ['reflect-metadata'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json']
};

export default config;