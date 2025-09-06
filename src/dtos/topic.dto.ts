import { 
  IsNumber, 
  IsString, 
  IsArray, 
  IsNotEmpty, 
  IsOptional, 
  MinLength, 
  MaxLength, 
  ArrayMinSize, 
  ArrayMaxSize,
  IsUrl,
  IsUUID,
  ValidateNested,
  ArrayNotEmpty,
  Matches
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTopicDto  {
  @IsString({ message: 'Heading must be a string' })
  @IsNotEmpty({ message: 'Heading is required' })
  @MinLength(5, { message: 'Heading must be at least 5 characters long' })
  @MaxLength(300, { message: 'Heading must not exceed 300 characters' })
  public heading: string;

  @IsArray({ message: 'Paragraph must be an array' })
  @ArrayNotEmpty({ message: 'At least one paragraph is required' })
  @ArrayMinSize(1, { message: 'At least one paragraph is required' })
  @ArrayMaxSize(20, { message: 'Maximum 20 paragraphs allowed' })
  @IsString({ each: true, message: 'Each paragraph must be a string' })
  @MinLength(10, { each: true, message: 'Each paragraph must be at least 10 characters long' })
  @MaxLength(2000, { each: true, message: 'Each paragraph must not exceed 2000 characters' })
  public paragraph: string[];

  @IsOptional()
  @IsString({ message: 'Illustration must be a string' })
  @IsUrl({}, { message: 'Illustration must be a valid URL' })
  public illustration?: string;

  @IsOptional()
  @IsString({ message: 'Video must be a string' })
  @IsUrl({}, { message: 'Video must be a valid URL' })
  public video?: string;

  @IsOptional()
  @IsString({ message: 'Reference must be a string' })
  @MaxLength(1000, { message: 'Reference must not exceed 1000 characters' })
  public reference?: string;

  @IsString({ message: 'Course ID must be a string' })
  @IsNotEmpty({ message: 'Course ID is required' })
  @Matches(/^\d+$/, { message: 'Course ID must be a valid numeric string' })
  public course_id: string;
}

export class UpdateTopicDto {
  @IsOptional()
  @IsString({ message: 'Heading must be a string' })
  @MinLength(5, { message: 'Heading must be at least 5 characters long' })
  @MaxLength(300, { message: 'Heading must not exceed 300 characters' })
  public heading?: string;

  @IsOptional()
  @IsArray({ message: 'Paragraph must be an array' })
  @ArrayMinSize(1, { message: 'At least one paragraph is required' })
  @ArrayMaxSize(20, { message: 'Maximum 20 paragraphs allowed' })
  @IsString({ each: true, message: 'Each paragraph must be a string' })
  @MinLength(10, { each: true, message: 'Each paragraph must be at least 10 characters long' })
  @MaxLength(2000, { each: true, message: 'Each paragraph must not exceed 2000 characters' })
  public paragraph?: string[];

  @IsOptional()
  @IsString({ message: 'Illustration must be a string' })
  @IsUrl({}, { message: 'Illustration must be a valid URL' })
  public illustration?: string;

  @IsOptional()
  @IsString({ message: 'Video must be a string' })
  @IsUrl({}, { message: 'Video must be a valid URL' })
  public video?: string;

  @IsOptional()
  @IsString({ message: 'Reference must be a string' })
  @MaxLength(1000, { message: 'Reference must not exceed 1000 characters' })
  public reference?: string;

  @IsOptional()
  @IsString({ message: 'Course ID must be a string' })
  @Matches(/^\d+$/, { message: 'Course ID must be a valid numeric string' })
  public course_id?: string;
}