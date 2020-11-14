import { NextFunction, Request, Response, Router } from 'express';
import { SessionWrapper } from './session-wrapper';

/**
 * Dictionary of strings that get transferred as set of route parameters.
 */
type Dictionary = { [s: string]: string };

interface RequestWrapper<Params, ResBody, ReqBody, ReqQuery>
    extends Request<Params, ResBody, ReqBody, ReqQuery> {
    session: SessionWrapper;
}

/**
 * The callback function that executes when the route is visited.
 *
 * GET method–type handler doesn’t allow for `body` parameter because GET method doesn’t have a payload.
 * Instead GET request can have some query parameters that are string based.
 */
type HandlerGet<
    ReqBody extends Dictionary = never,
    ResBody = never,
    Params extends Dictionary = never
> = (
    request: RequestWrapper<Params, ResBody, never, ReqBody>,
    response?: Response<ResBody>,
    next?: NextFunction
) => unknown;

/**
 * The callback function that executes when the route is visited.
 */
type Handler<
    ReqBody = never,
    ResBody = never,
    Params extends Dictionary = never
> = (
    request: RequestWrapper<Params, ResBody, ReqBody, never>,
    response?: Response<ResBody>,
    next?: NextFunction
) => unknown;

/**
 * Wrapper class that implements all four basic CRUD methods used in APIs.
 */
export class RouterWrapper {
    /**
     * The actual Express router.
     */
    private router: Router;

    constructor() {
        this.router = Router();
    }

    /**
     * GET method request handler.
     * @param path API path
     * @param handler the callback function to execute every time a request will come
     * @template ReqBody the request body shape
     * @template ResBody the response body shape
     * @template Params the route parameter dictionary shape
     */
    public get<
        ReqBody extends Dictionary = never,
        ResBody = never,
        Params extends Dictionary = never
    >(path: string, handler: HandlerGet<ReqBody, ResBody, Params>): Router {
        return this.router.get(path, handler);
    }

    /**
     * POST method request handler.
     * @param path API path
     * @param handler the callback function to execute every time a request will come
     * @template ReqBody the request body shape
     * @template ResBody the response body shape
     * @template Params the route parameter dictionary shape
     */
    public post<
        ReqBody = never,
        ResBody = never,
        Params extends Dictionary = never
    >(path: string, handler: Handler<ReqBody, ResBody, Params>): Router {
        return this.router.post(path, handler);
    }

    /**
     * PUT method request handler.
     * @param path API path
     * @param handler the callback function to execute every time a request will come
     * @template ReqBody the request body shape
     * @template ResBody the response body shape
     * @template Params the route parameter dictionary shape
     */
    public put<
        ReqBody = never,
        ResBody = never,
        Params extends Dictionary = never
    >(path: string, handler: Handler<ReqBody, ResBody, Params>): Router {
        return this.router.put(path, handler);
    }

    /**
     * GET method request handler.
     * @param path API path
     * @param handler the callback function to execute every time a request will come
     * @template ReqBody the request body shape
     * @template ResBody the response body shape
     * @template Params the route parameter dictionary shape
     */
    public delete<
        ReqBody = never,
        ResBody = never,
        Params extends Dictionary = never
    >(path: string, handler: Handler<ReqBody, ResBody, Params>): Router {
        return this.router.delete(path, handler);
    }
}
