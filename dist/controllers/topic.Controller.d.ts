import { NextFunction, Request, Response } from 'express';
import TopicService from '../services/topic.service';
declare class TopicController {
    topicService: TopicService;
    getTopics: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTopicById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default TopicController;
