# Contributing to Open-V API

Thank you for your interest in contributing to Open-V API! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project adheres to a [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to yalleyfred@gmail.com.

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.17.0)
- PostgreSQL database
- Git
- Code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-v.git
   cd open-v
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/yalleyfred/open-v.git
   ```

## 🛠️ Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up database**
   ```bash
   npx sequelize-cli db:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Making Changes

### Branch Naming Convention

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/amazing-feature
git checkout -b bugfix/fix-critical-bug
git checkout -b docs/update-readme
```

**Branch Types:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `security/` - Security improvements
- `chore/` - Maintenance tasks

### Development Workflow

1. **Keep your fork up to date**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write code following our style guidelines
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run build
   npm test
   npm run lint
   ```

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect meaning of code (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit
- **security**: Security improvements and fixes

### Examples

```bash
feat(auth): add JWT token refresh mechanism
fix(database): resolve connection pool memory leak
docs(readme): update installation instructions
security(middleware): implement rate limiting
refactor(services): simplify user validation logic
```

## 🔀 Pull Request Process

1. **Ensure your branch is up to date**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Use a clear and descriptive title
   - Fill out the PR template completely
   - Link any related issues

### PR Title Format

Follow the same format as commit messages:
```
feat(auth): add social login integration
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally with my changes
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

## 🎨 Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer explicit types over `any`

### Code Style

```typescript
// Good
interface User {
  id: number;
  email: string;
  name: string;
}

const createUser = async (userData: CreateUserDto): Promise<User> => {
  // Implementation
};

// Bad
const createUser = (userData: any): any => {
  // Implementation
};
```

### File Organization

- Place files in appropriate directories
- Use descriptive file names
- Export interfaces and types from dedicated files
- Group related functionality together

### API Design

- Use RESTful conventions
- Consistent response formats
- Proper HTTP status codes
- Clear error messages

## 🧪 Testing

### Writing Tests

- Add tests for all new features
- Test both success and error cases
- Use descriptive test names
- Mock external dependencies

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Test Structure

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user with valid data', async () => {
      // Test implementation
    });

    it('should throw error for duplicate email', async () => {
      // Test implementation
    });
  });
});
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex algorithms
- Include examples in comments
- Keep comments up to date

### API Documentation

- Update API documentation for new endpoints
- Include request/response examples
- Document error cases
- Update OpenAPI/Swagger specs if applicable

### README Updates

- Update feature lists
- Add new configuration options
- Update installation instructions
- Include breaking changes

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Bug Description**: Clear description of the issue
2. **Steps to Reproduce**: Minimal steps to reproduce the bug
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: OS, Node.js version, database version
6. **Screenshots**: If applicable
7. **Additional Context**: Any other relevant information

## 💡 Feature Requests

For feature requests, please include:

1. **Feature Description**: Clear description of the feature
2. **Use Case**: Why is this feature needed?
3. **Proposed Solution**: How should it work?
4. **Alternatives**: Any alternative solutions considered
5. **Additional Context**: Any other relevant information

## 🏷️ Release Process

1. Features are merged into `main` branch
2. Version is bumped following [Semantic Versioning](https://semver.org/)
3. Changelog is updated
4. Release is tagged and published

## 🤔 Questions?

If you have questions:

1. Check existing issues and documentation
2. Ask in GitHub Discussions
3. Contact maintainers at yalleyfred@gmail.com

Thank you for contributing to Open-V API! 🎉
