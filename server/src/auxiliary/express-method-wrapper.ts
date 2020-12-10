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
) => Promise<unknown>;

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
) => Promise<unknown>;

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

  public getNativeRouter(): Router {
    return this.router;
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
    const h: HandlerGet<ReqBody, ResBody, Params> = (req, res, next) =>
      handler(req, res, next).catch(next);
    return this.router.get(path, h);
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
    const h: Handler<ReqBody, ResBody, Params> = (req, res, next) =>
      handler(req, res, next).catch(next);
    return this.router.post(path, h);
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
    const h: Handler<ReqBody, ResBody, Params> = (req, res, next) =>
      handler(req, res, next).catch(next);
    return this.router.put(path, h);
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
    const h: Handler<ReqBody, ResBody, Params> = (req, res, next) =>
      handler(req, res, next).catch(next);
    return this.router.delete(path, h);
  }
}
