import { main } from '..';
import { Environment } from './../environment';

describe('index', () => {
    it('should print out an environment variable', () => {
        // keep track of what has been logged
        const logged: any = [];

        // replace it with one that has been tapped
        console.log = (...x: any[] | any) => {
            if (x instanceof Array) {
                // handle arrays
                x.forEach((y) => logged.push(y));
            } else {
                // otherwise just push one thing
                logged.push(x);
            }
        };

        // run the function
        main();

        // assert
        expect(logged[1]).toEqual(Environment.TEST);
    });
});
