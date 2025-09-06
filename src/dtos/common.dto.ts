import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsNumber, 
  Min, 
  Max, 
  IsIn,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  @Max(1000, { message: 'Page cannot exceed 1000' })
  @Type(() => Number)
  public page?: number = 1;

  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  @Type(() => Number)
  public limit?: number = 10;

  @IsOptional()
  @IsString({ message: 'Sort field must be a string' })
  public sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'Sort order must be either asc or desc' })
  public sortOrder?: 'asc' | 'desc' = 'asc';
}

export class SearchDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'Search query must be a string' })
  @Type(() => String)
  public q?: string;

  @IsOptional()
  @IsArray({ message: 'Filters must be an array' })
  @IsString({ each: true, message: 'Each filter must be a string' })
  public filters?: string[];
}

export class FileUploadDto {
  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty({ message: 'File name is required' })
  public filename: string;

  @IsString({ message: 'File type must be a string' })
  @IsNotEmpty({ message: 'File type is required' })
  @IsIn(['image', 'video', 'document', 'audio'], {
    message: 'File type must be one of: image, video, document, audio'
  })
  public fileType: string;

  @IsOptional()
  @IsNumber({}, { message: 'File size must be a number' })
  @Min(1, { message: 'File size must be at least 1 byte' })
  @Max(104857600, { message: 'File size cannot exceed 100MB' }) // 100MB
  public fileSize?: number;
}

export class BulkOperationDto {
  @IsArray({ message: 'IDs must be an array' })
  @ArrayMinSize(1, { message: 'At least one ID is required' })
  @ArrayMaxSize(100, { message: 'Maximum 100 IDs allowed' })
  @IsNumber({}, { each: true, message: 'Each ID must be a number' })
  public ids: number[];

  @IsString({ message: 'Action must be a string' })
  @IsNotEmpty({ message: 'Action is required' })
  @IsIn(['delete', 'activate', 'deactivate', 'archive'], {
    message: 'Action must be one of: delete, activate, deactivate, archive'
  })
  public action: string;
}

export class ContactDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Type(() => String)
  public name: string;

  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Type(() => String)
  public email: string;

  @IsString({ message: 'Subject must be a string' })
  @IsNotEmpty({ message: 'Subject is required' })
  @Type(() => String)
  public subject: string;

  @IsString({ message: 'Message must be a string' })
  @IsNotEmpty({ message: 'Message is required' })
  @Type(() => String)
  public message: string;
}

export class IdParamDto {
  @IsNumber({}, { message: 'ID must be a number' })
  @Min(1, { message: 'ID must be at least 1' })
  @Type(() => Number)
  public id: number;
}
