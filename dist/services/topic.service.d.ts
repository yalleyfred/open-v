import { CreateTopicDto } from '../dtos/topic.dto';
import { Topic } from '../interfaces/topic.interface';
import Topics from '../models/topics.model';
import Courses from '../models/course.model';
declare class TopicService {
    topic: typeof Topics;
    course: typeof Courses;
    findAllTopics(): Promise<Topic[]>;
    findTopicById(userId: number): Promise<Topic>;
    createTopic(userData: CreateTopicDto): Promise<Topic>;
    updateTopic(userId: number, userData: CreateTopicDto): Promise<Topic[]>;
    deleteTopic(userId: number): Promise<Topic[]>;
}
export default TopicService;
