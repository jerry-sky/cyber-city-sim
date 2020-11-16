import { MapResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { Map, Cell } from '../../../model/map';

const Router = new RouterWrapper();

Router.get<never, MapResponse, never>('/', (request, response, next) => {
    const cells: Cell[] = [];
    for (let i = 0; i < 400; i++) {
        const c: Cell = {
            terrain: Math.floor(Math.random() * Math.floor(3)),
            owner: -1,
        };
        cells.push(c);
    }
    // city 1
    cells[30].owner = 1;
    cells[31].owner = 1;
    cells[32].owner = 1;
    cells[50].owner = 1;
    cells[51].owner = 1;
    cells[52].owner = 1;
    // city 2
    cells[120].owner = 2;
    cells[121].owner = 2;
    cells[140].owner = 2;
    cells[141].owner = 2;
    // city 3
    cells[325].owner = 3;
    cells[326].owner = 3;
    cells[345].owner = 3;
    cells[346].owner = 3;
    cells[365].owner = 3;
    cells[366].owner = 3;

    const map: Map = {
        cells: cells,
    } as Map;
    response.json({ map });

    next();
});

export default Router;
