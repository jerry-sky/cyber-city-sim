import { Environment } from './environment';

export const main: VoidFunction = () =>
    console.log('this is a test', Environment.TEST);

main();
