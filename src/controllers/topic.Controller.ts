import { NextFunction, Request, Response } from 'express';
import { CreateTopicDto } from '../dtos/topic.dto';
import { Topic } from '../interfaces/topic.interface';
import TopicService from '../services/topic.service';

class TopicController {
  public topicService = new TopicService();

  public getTopics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllTopicsData: Topic[] = await this.topicService.findAllTopics();
      res.status(200).json({ data: findAllTopicsData, message: 'Topics retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getTopicById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const topicId = Number(req.params.id);
      const findOneTopicData: Topic = await this.topicService.findTopicById(topicId);
      res.status(200).json({ data: findOneTopicData, message: 'Topic retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getTopicsByCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseId = Number(req.params.courseId);
      const findTopicsData: Topic[] = await this.topicService.findTopicsByCourse(courseId);
      res.status(200).json({ data: findTopicsData, message: 'Course topics retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const topicData: CreateTopicDto = req.body;
      const createTopicData: Topic = await this.topicService.createTopic(topicData);
      res.status(201).json({ data: createTopicData, message: 'Topic created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const topicId = Number(req.params.id);
      const topicData: Partial<CreateTopicDto> = req.body;
      const updateTopicData: Topic = await this.topicService.updateTopic(topicId, topicData);
      res.status(200).json({ data: updateTopicData, message: 'Topic updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const topicId = Number(req.params.id);
      const deleteTopicData = await this.topicService.deleteTopic(topicId);
      res.status(200).json({ data: deleteTopicData, message: 'Topic deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default TopicController;
