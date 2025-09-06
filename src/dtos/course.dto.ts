import { 
  IsNumber, 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  MinLength, 
  MaxLength, 
  Min, 
  Max, 
  IsUrl,
  Matches,
  IsIn 
} from 'class-validator';

export class CreateCourseDto  {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  public title: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  public image_url?: string;

  @IsOptional()
  @IsString({ message: 'Image ID must be a string' })
  @MaxLength(100, { message: 'Image ID must not exceed 100 characters' })
  public image_id?: string;

  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required' })
  @IsIn(['technology', 'business', 'design', 'marketing', 'development', 'data-science', 'health', 'music', 'language', 'other'], {
    message: 'Category must be one of: technology, business, design, marketing, development, data-science, health, music, language, other'
  })
  public category: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  @Max(10000, { message: 'Price cannot exceed $10,000' })
  public price: number;

  @IsString({ message: 'Creator must be a string' })
  @IsNotEmpty({ message: 'Creator is required' })
  @MinLength(2, { message: 'Creator name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Creator name must not exceed 100 characters' })
  public creator: string;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  public title?: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  public image_url?: string;

  @IsOptional()
  @IsString({ message: 'Image ID must be a string' })
  @MaxLength(100, { message: 'Image ID must not exceed 100 characters' })
  public image_id?: string;

  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  @IsIn(['technology', 'business', 'design', 'marketing', 'development', 'data-science', 'health', 'music', 'language', 'other'], {
    message: 'Category must be one of: technology, business, design, marketing, development, data-science, health, music, language, other'
  })
  public category?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  @Max(10000, { message: 'Price cannot exceed $10,000' })
  public price?: number;

  @IsOptional()
  @IsString({ message: 'Creator must be a string' })
  @MinLength(2, { message: 'Creator name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Creator name must not exceed 100 characters' })
  public creator?: string;
}