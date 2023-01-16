import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto  {
  @IsString()
  public title: string;

  @IsString()
  public image_url: string;

  @IsString()
  public image_id: string;

  @IsString()
  public category: string;

  @IsNumber()
  public price: number;

  @IsString()
  public creator: string;


}