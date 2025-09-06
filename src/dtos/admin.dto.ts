import { 
  IsEmail, 
  IsString, 
  MinLength, 
  MaxLength,
  Matches, 
  IsNotEmpty, 
  IsOptional,
  IsIn,
  IsBoolean
} from 'class-validator';

export class CreateAdminDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Name can only contain letters, spaces, hyphens, and apostrophes' })
  public name: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  public password: string;

  @IsOptional()
  @IsString({ message: 'Role must be a string' })
  @IsIn(['super_admin', 'admin', 'moderator'], {
    message: 'Role must be one of: super_admin, admin, moderator'
  })
  public role?: string;

  @IsOptional()
  @IsBoolean({ message: 'Active status must be a boolean' })
  public isActive?: boolean;
}

export class UpdateAdminDto {
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email?: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Name can only contain letters, spaces, hyphens, and apostrophes' })
  public name?: string;

  @IsOptional()
  @IsString({ message: 'Role must be a string' })
  @IsIn(['super_admin', 'admin', 'moderator'], {
    message: 'Role must be one of: super_admin, admin, moderator'
  })
  public role?: string;

  @IsOptional()
  @IsBoolean({ message: 'Active status must be a boolean' })
  public isActive?: boolean;
}

export class AdminLoginDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(1, { message: 'Password is required' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  public password: string;
}
