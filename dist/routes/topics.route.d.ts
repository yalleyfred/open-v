import TopicController from '../controllers/topic.Controller';
import { Routes } from '../interfaces/routes.interface';
declare class TopicRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    TopicController: TopicController;
    constructor();
    private initializeRoutes;
}
export default TopicRoute;
