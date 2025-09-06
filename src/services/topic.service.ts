import { CreateTopicDto } from '../dtos/topic.dto';
import { HttpException } from '../exceptions/HttpException';
import { Topic } from '../interfaces/topic.interface';
import { Course } from '../interfaces/course.interface';
import Topics from '../models/topics.model';
import Courses from '../models/course.model';
import { isEmpty } from '../utils/util';

class TopicService {
  private topic = Topics;
  private course = Courses;

  public async findAllTopics(): Promise<Topic[]> {
    try {
      const topics = await this.topic.findAll({
        include: [{
          model: this.course,
          as: 'course',
          attributes: ['id', 'title', 'description']
        }]
      });
      return topics;
    } catch (error) {
      throw new HttpException(500, 'Error retrieving topics');
    }
  }

  public async findTopicById(topicId: number): Promise<Topic> {
    try {
      if (!topicId || isNaN(topicId) || topicId <= 0) {
        throw new HttpException(400, 'Invalid topic ID');
      }

      const findTopic: Topic = await this.topic.findByPk(topicId, {
        include: [{
          model: this.course,
          as: 'course',
          attributes: ['id', 'title', 'description']
        }]
      });
      
      if (!findTopic) {
        throw new HttpException(404, "Topic doesn't exist");
      }
      
      return findTopic;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error retrieving topic');
    }
  }

  public async createTopic(topicData: CreateTopicDto): Promise<Topic> {
    try {
      if (isEmpty(topicData)) {
        throw new HttpException(400, "Topic data is empty");
      }

      // Validate course exists
      const findCourse: Course = await this.course.findByPk(topicData.course_id);
      if (!findCourse) {
        throw new HttpException(404, `Course with ID ${topicData.course_id} does not exist`);
      }

      // Check if topic with same heading already exists for this course
      const existingTopic: Topic = await this.topic.findOne({
        where: {
          heading: topicData.heading,
          course_id: topicData.course_id
        }
      });
      
      if (existingTopic) {
        throw new HttpException(409, `Topic "${topicData.heading}" already exists for this course`);
      }

      const createTopicData = {
        heading: topicData.heading,
        paragraph: topicData.paragraph,
        illustration: topicData.illustration,
        video: topicData.video,
        reference: topicData.reference,
        course_id: Number(topicData.course_id)
      };

      const createdTopic = await this.topic.create(createTopicData);
      
      // Return the created topic with course information
      const topicWithCourse = await this.topic.findByPk(createdTopic.id, {
        include: [{
          model: this.course,
          as: 'course',
          attributes: ['id', 'title', 'description']
        }]
      });

      return topicWithCourse;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error creating topic');
    }
  }

  public async updateTopic(topicId: number, topicData: Partial<CreateTopicDto>): Promise<Topic> {
    try {
      if (!topicId || isNaN(topicId) || topicId <= 0) {
        throw new HttpException(400, 'Invalid topic ID');
      }

      if (isEmpty(topicData)) {
        throw new HttpException(400, "Update data is empty");
      }

      // Check if topic exists
      const existingTopic = await this.topic.findByPk(topicId);
      if (!existingTopic) {
        throw new HttpException(404, "Topic doesn't exist");
      }

      // If course_id is being updated, validate the new course exists
      if (topicData.course_id) {
        const findCourse = await this.course.findByPk(topicData.course_id);
        if (!findCourse) {
          throw new HttpException(404, `Course with ID ${topicData.course_id} does not exist`);
        }
      }

      // Check if heading is being updated and already exists for the course
      if (topicData.heading) {
        const courseId = topicData.course_id || existingTopic.course_id;
        const duplicateTopic = await this.topic.findOne({
          where: {
            heading: topicData.heading,
            course_id: courseId,
            id: { [require('sequelize').Op.ne]: topicId } // Exclude current topic
          }
        });
        
        if (duplicateTopic) {
          throw new HttpException(409, `Topic "${topicData.heading}" already exists for this course`);
        }
      }

      const updateData: any = { ...topicData };
      if (updateData.course_id) {
        updateData.course_id = Number(updateData.course_id);
      }

      await this.topic.update(updateData, {
        where: { id: topicId }
      });

      // Return updated topic with course information
      const updatedTopic = await this.topic.findByPk(topicId, {
        include: [{
          model: this.course,
          as: 'course',
          attributes: ['id', 'title', 'description']
        }]
      });

      return updatedTopic;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error updating topic');
    }
  }

  public async deleteTopic(topicId: number): Promise<{ message: string }> {
    try {
      if (!topicId || isNaN(topicId) || topicId <= 0) {
        throw new HttpException(400, 'Invalid topic ID');
      }

      const findTopic = await this.topic.findByPk(topicId);
      if (!findTopic) {
        throw new HttpException(404, "Topic doesn't exist");
      }

      await this.topic.destroy({
        where: { id: topicId }
      });

      return { message: 'Topic deleted successfully' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error deleting topic');
    }
  }

  public async findTopicsByCourse(courseId: number): Promise<Topic[]> {
    try {
      if (!courseId || isNaN(courseId) || courseId <= 0) {
        throw new HttpException(400, 'Invalid course ID');
      }

      // Validate course exists
      const findCourse = await this.course.findByPk(courseId);
      if (!findCourse) {
        throw new HttpException(404, "Course doesn't exist");
      }

      const topics = await this.topic.findAll({
        where: { course_id: courseId },
        include: [{
          model: this.course,
          as: 'course',
          attributes: ['id', 'title', 'description']
        }]
      });

      return topics;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error retrieving topics for course');
    }
  }
}

export default TopicService;
