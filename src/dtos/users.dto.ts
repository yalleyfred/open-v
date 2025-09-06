import { 
  IsEmail, 
  IsString, 
  MinLength, 
  MaxLength,
  Matches, 
  IsNotEmpty, 
  IsOptional,
  IsPhoneNumber,
  IsDateString,
  IsIn,
  Length
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  public password: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Name can only contain letters, spaces, hyphens, and apostrophes' })
  public name: string;
}

export class CreateStudentDto  {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  public password: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hyphens, and apostrophes' })
  public first_name: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Last name can only contain letters, spaces, hyphens, and apostrophes' })
  public last_name: string;

  @IsString({ message: 'Gender must be a string' })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsIn(['male', 'female', 'other', 'prefer-not-to-say'], {
    message: 'Gender must be one of: male, female, other, prefer-not-to-say'
  })
  public gender: string;

  @IsString({ message: 'Date of birth must be a string' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  @IsDateString({}, { message: 'Date of birth must be a valid date in ISO format (YYYY-MM-DD)' })
  public dob: string;

  @IsString({ message: 'Nationality must be a string' })
  @IsNotEmpty({ message: 'Nationality is required' })
  @MinLength(2, { message: 'Nationality must be at least 2 characters long' })
  @MaxLength(100, { message: 'Nationality must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Nationality can only contain letters, spaces, hyphens, and apostrophes' })
  public nationality: string;

  @IsString({ message: 'Highest qualifications must be a string' })
  @IsNotEmpty({ message: 'Highest qualifications is required' })
  @MinLength(2, { message: 'Highest qualifications must be at least 2 characters long' })
  @MaxLength(200, { message: 'Highest qualifications must not exceed 200 characters' })
  public highest_qualifications: string;

  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Please provide a valid phone number' })
  @MinLength(10, { message: 'Phone number must be at least 10 digits long' })
  @MaxLength(20, { message: 'Phone number must not exceed 20 characters' })
  public phone: string;

  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City is required' })
  @MinLength(2, { message: 'City must be at least 2 characters long' })
  @MaxLength(100, { message: 'City must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'City can only contain letters, spaces, hyphens, and apostrophes' })
  public city: string;

  @IsString({ message: 'Sponsor name must be a string' })
  @IsNotEmpty({ message: 'Sponsor name is required' })
  @MinLength(2, { message: 'Sponsor name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Sponsor name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Sponsor name can only contain letters, spaces, hyphens, and apostrophes' })
  public sponsor_name: string;

  @IsEmail({}, { message: 'Please provide a valid sponsor email address' })
  @IsNotEmpty({ message: 'Sponsor email is required' })
  @MaxLength(254, { message: 'Sponsor email must not exceed 254 characters' })
  public sponsor_email: string;

  @IsString({ message: 'Sponsor phone number must be a string' })
  @IsNotEmpty({ message: 'Sponsor phone number is required' })
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Please provide a valid sponsor phone number' })
  @MinLength(10, { message: 'Sponsor phone number must be at least 10 digits long' })
  @MaxLength(20, { message: 'Sponsor phone number must not exceed 20 characters' })
  public sponsor_phone: string;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email?: string;

  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hyphens, and apostrophes' })
  public first_name?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Last name can only contain letters, spaces, hyphens, and apostrophes' })
  public last_name?: string;

  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  @IsIn(['male', 'female', 'other', 'prefer-not-to-say'], {
    message: 'Gender must be one of: male, female, other, prefer-not-to-say'
  })
  public gender?: string;

  @IsOptional()
  @IsString({ message: 'Date of birth must be a string' })
  @IsDateString({}, { message: 'Date of birth must be a valid date in ISO format (YYYY-MM-DD)' })
  public dob?: string;

  @IsOptional()
  @IsString({ message: 'Nationality must be a string' })
  @MinLength(2, { message: 'Nationality must be at least 2 characters long' })
  @MaxLength(100, { message: 'Nationality must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Nationality can only contain letters, spaces, hyphens, and apostrophes' })
  public nationality?: string;

  @IsOptional()
  @IsString({ message: 'Highest qualifications must be a string' })
  @MinLength(2, { message: 'Highest qualifications must be at least 2 characters long' })
  @MaxLength(200, { message: 'Highest qualifications must not exceed 200 characters' })
  public highest_qualifications?: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Please provide a valid phone number' })
  @MinLength(10, { message: 'Phone number must be at least 10 digits long' })
  @MaxLength(20, { message: 'Phone number must not exceed 20 characters' })
  public phone?: string;

  @IsOptional()
  @IsString({ message: 'City must be a string' })
  @MinLength(2, { message: 'City must be at least 2 characters long' })
  @MaxLength(100, { message: 'City must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'City can only contain letters, spaces, hyphens, and apostrophes' })
  public city?: string;

  @IsOptional()
  @IsString({ message: 'Sponsor name must be a string' })
  @MinLength(2, { message: 'Sponsor name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Sponsor name must not exceed 100 characters' })
  @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Sponsor name can only contain letters, spaces, hyphens, and apostrophes' })
  public sponsor_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid sponsor email address' })
  @MaxLength(254, { message: 'Sponsor email must not exceed 254 characters' })
  public sponsor_email?: string;

  @IsOptional()
  @IsString({ message: 'Sponsor phone number must be a string' })
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, { message: 'Please provide a valid sponsor phone number' })
  @MinLength(10, { message: 'Sponsor phone number must be at least 10 digits long' })
  @MaxLength(20, { message: 'Sponsor phone number must not exceed 20 characters' })
  public sponsor_phone?: string;
}

export class LoginUserDto  {
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

export class ChangePasswordDto {
  @IsString({ message: 'Current password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  public currentPassword: string;

  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @MaxLength(128, { message: 'New password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  public newPassword: string;

  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  public confirmPassword: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(254, { message: 'Email must not exceed 254 characters' })
  public email: string;
}

export class ResetPasswordDto {
  @IsString({ message: 'Reset token must be a string' })
  @IsNotEmpty({ message: 'Reset token is required' })
  public token: string;

  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @MaxLength(128, { message: 'New password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
  public newPassword: string;
}




