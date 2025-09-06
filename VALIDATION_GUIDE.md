# DTO Validation Guide

This document describes the comprehensive validation system implemented for all DTOs in the Open-V application.

## 🎯 Overview

All DTOs now include comprehensive class-validator decorators to ensure data integrity, security, and user experience. The validation covers:

- **Input Sanitization**: Preventing malicious input
- **Data Type Validation**: Ensuring correct data types
- **Business Logic Validation**: Enforcing business rules
- **Security Validation**: Protecting against common attacks
- **User Experience**: Providing clear error messages

## 📁 DTO Files Enhanced

### 1. **Course DTOs** (`course.dto.ts`)

#### CreateCourseDto
- **title**: Required, 3-200 characters
- **image_url**: Optional, valid URL format
- **image_id**: Optional, max 100 characters
- **category**: Required, predefined categories only
- **price**: Required, 0-10,000 range
- **creator**: Required, 2-100 characters

#### UpdateCourseDto
- All fields optional for partial updates
- Same validation rules as CreateCourseDto

**Categories Allowed**:
`technology`, `business`, `design`, `marketing`, `development`, `data-science`, `health`, `music`, `language`, `other`

### 2. **Topic DTOs** (`topic.dto.ts`)

#### CreateTopicDto
- **heading**: Required, 5-300 characters
- **paragraph**: Required array, 1-20 paragraphs, each 10-2000 characters
- **illustration**: Optional, valid URL
- **video**: Optional, valid URL
- **reference**: Optional, max 1000 characters
- **course_id**: Required, numeric string format

#### UpdateTopicDto
- All fields optional for partial updates
- Same validation rules as CreateTopicDto

### 3. **User DTOs** (`users.dto.ts`)

#### CreateStudentDto
- **email**: Valid email format, max 254 characters
- **password**: Strong password requirements (8-128 chars, mixed case, numbers, special chars)
- **first_name/last_name**: 2-50 characters, letters only
- **gender**: Predefined options (`male`, `female`, `other`, `prefer-not-to-say`)
- **dob**: ISO date format (YYYY-MM-DD)
- **nationality**: 2-100 characters, letters only
- **phone**: Valid phone number format, 10-20 characters
- **city**: 2-100 characters, letters only
- **sponsor_***: Similar validation to personal fields

#### UpdateStudentDto
- All fields optional for partial updates
- Same validation rules as CreateStudentDto

#### Additional DTOs
- **LoginUserDto**: Email and password validation
- **ChangePasswordDto**: Current and new password validation
- **ForgotPasswordDto**: Email validation
- **ResetPasswordDto**: Token and new password validation

### 4. **Admin DTOs** (`admin.dto.ts`)

#### CreateAdminDto
- **email**: Valid email format
- **name**: 2-100 characters, letters only
- **password**: Strong password requirements
- **role**: Optional (`super_admin`, `admin`, `moderator`)
- **isActive**: Optional boolean

#### UpdateAdminDto & AdminLoginDto
- Similar validation rules with appropriate requirements

### 5. **Common DTOs** (`common.dto.ts`)

#### PaginationDto
- **page**: Number, 1-1000 range
- **limit**: Number, 1-100 range
- **sortBy**: Optional string
- **sortOrder**: `asc` or `desc`

#### SearchDto
- Extends PaginationDto
- **q**: Optional search query
- **filters**: Optional array of strings

#### FileUploadDto
- **filename**: Required string
- **fileType**: Required (`image`, `video`, `document`, `audio`)
- **fileSize**: Optional, max 100MB

#### BulkOperationDto
- **ids**: Array of 1-100 numbers
- **action**: Required (`delete`, `activate`, `deactivate`, `archive`)

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- Maximum 128 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### Input Sanitization
- Email format validation
- Phone number format validation
- Name fields: letters, spaces, hyphens, apostrophes only
- URL validation for media fields
- Numeric validation for IDs and prices

### Data Limits
- Email: 254 characters (RFC standard)
- Names: 50-100 characters
- Descriptions: Up to 2000 characters
- Arrays: Limited to prevent DoS attacks
- File sizes: Maximum 100MB

## 📝 Validation Messages

All validators include clear, user-friendly error messages:

```typescript
@MinLength(8, { message: 'Password must be at least 8 characters long' })
@IsEmail({}, { message: 'Please provide a valid email address' })
@IsIn(['male', 'female', 'other'], { message: 'Gender must be one of: male, female, other' })
```

## 🚀 Usage Examples

### In Controllers
```typescript
@Post('/courses')
async createCourse(
  @Body(validationMiddleware(CreateCourseDto)) courseData: CreateCourseDto
) {
  // Validated data is guaranteed to meet requirements
}
```

### Validation Middleware Usage
```typescript
this.router.post('/signup', 
  validationMiddleware(CreateStudentDto, 'body'), 
  this.authController.signUp
);
```

## 🛠️ Testing Validation

### Valid Request Example
```json
{
  "email": "john.doe@example.com",
  "password": "SecureP@ss123",
  "first_name": "John",
  "last_name": "Doe",
  "gender": "male",
  "dob": "1990-05-15",
  "nationality": "American",
  "phone": "+1234567890"
}
```

### Invalid Request Response
```json
{
  "status": 400,
  "message": "Password must contain at least one uppercase letter, Email must be a valid email address"
}
```

## 🔧 Customization

### Adding New Validators
```typescript
import { IsCustom } from 'class-validator';

@IsCustom((value) => {
  // Custom validation logic
  return value.length > 0;
}, { message: 'Custom validation failed' })
public customField: string;
```

### Conditional Validation
```typescript
import { ValidateIf } from 'class-validator';

@ValidateIf(o => o.type === 'premium')
@IsNotEmpty({ message: 'Premium courses require a price' })
public price?: number;
```

## 📊 Validation Performance

- **Class-validator**: Optimized for performance
- **Fail-fast**: Stops on first validation error (configurable)
- **Memory efficient**: Minimal overhead
- **Type-safe**: Full TypeScript support

## 🐛 Common Issues & Solutions

### Issue: "Validation decorators not working"
**Solution**: Ensure `reflect-metadata` is imported and validation middleware is properly configured.

### Issue: "Nested object validation failing"
**Solution**: Use `@ValidateNested()` and `@Type()` decorators.

### Issue: "Array validation not working"
**Solution**: Use `@IsArray()` with `{ each: true }` for element validation.

## 🎯 Best Practices

1. **Always validate at the boundary** - Validate all incoming data
2. **Use specific validators** - Choose the most appropriate validator
3. **Provide clear messages** - Users should understand what went wrong
4. **Validate business logic** - Not just data types
5. **Test edge cases** - Test with invalid data
6. **Keep validators simple** - One responsibility per validator
7. **Document custom validators** - Explain complex validation logic

## 🔄 Future Enhancements

- **Custom validators** for complex business rules
- **Conditional validation** based on user roles
- **Cross-field validation** for related fields
- **Async validation** for database checks
- **Localization** for multi-language error messages

This validation system ensures data integrity, improves security, and provides excellent user experience through clear error messages and robust validation rules.
