# Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you get started and ensure your contributions follow our standards.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Documentation Standards](#documentation-standards)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Release Process](#release-process)

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Git
- A code editor (VS Code recommended)

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PROJECT_NAME.git
   cd PROJECT_NAME
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Run Tests**
   ```bash
   npm test
   npm run test:e2e
   ```

### Project Structure

```
├── docs/                 # Documentation
│   ├── api/             # API documentation
│   ├── components/      # Component documentation
│   └── guides/          # Development guides
├── src/                 # Source code
│   ├── components/      # React components
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript definitions
├── tests/               # Test files
└── scripts/             # Build and utility scripts
```

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding or updating tests

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes

**Examples:**
```bash
feat(auth): add OAuth 2.0 authentication
fix(button): resolve focus ring issues in Safari
docs(api): update user endpoints documentation
test(utils): add unit tests for date helpers
```

## 📖 Documentation Standards

### API Documentation

When adding or modifying APIs:

1. **Update OpenAPI Specification**
   - Add endpoint definitions to `docs/api/openapi.yaml`
   - Include request/response schemas
   - Add example requests and responses

2. **Create Detailed Endpoint Documentation**
   - Follow the template in `docs/api/users.md`
   - Include comprehensive examples
   - Document error responses
   - Add code samples in multiple languages

3. **Update API Index**
   - Add links to new endpoints in `docs/api/README.md`
   - Update the changelog

### Component Documentation

When creating or updating components:

1. **Component Documentation File**
   ```markdown
   # ComponentName

   Brief description of the component's purpose.

   ## Props
   [Comprehensive props table]

   ## Examples
   [Multiple usage examples]

   ## Accessibility
   [Accessibility considerations]

   ## Testing
   [Testing examples]
   ```

2. **Storybook Stories**
   ```tsx
   // ComponentName.stories.tsx
   export default {
     title: 'Components/ComponentName',
     component: ComponentName,
     parameters: {
       docs: {
         description: {
           component: 'Component description for Storybook docs'
         }
       }
     }
   };

   export const Default = {
     args: {
       // Default props
     }
   };

   export const Variants = () => (
     // Multiple variants example
   );
   ```

3. **TypeScript Definitions**
   - Export clear interfaces for all props
   - Include JSDoc comments for better IDE support
   - Use generic types where appropriate

   ```tsx
   interface ComponentProps {
     /** Brief description of the prop */
     variant?: 'primary' | 'secondary';
     /** Whether the component is disabled */
     isDisabled?: boolean;
   }
   ```

### Function Documentation

For utility functions and hooks:

```tsx
/**
 * Formats a date according to the specified format and locale.
 * 
 * @param date - The date to format
 * @param format - The format string (e.g., 'YYYY-MM-DD')
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns The formatted date string
 * 
 * @example
 * ```tsx
 * const formatted = formatDate(new Date(), 'YYYY-MM-DD');
 * console.log(formatted); // '2024-01-15'
 * ```
 */
export function formatDate(
  date: Date, 
  format: string, 
  locale: string = 'en-US'
): string {
  // Implementation
}
```

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Prefer functional components and hooks
- Use descriptive variable and function names
- Follow the existing code formatting (Prettier configuration)

### React Best Practices

```tsx
// Good: Descriptive component name and props
interface UserProfileProps {
  user: User;
  onEdit: (user: User) => void;
  isEditing?: boolean;
}

export function UserProfile({ user, onEdit, isEditing = false }: UserProfileProps) {
  // Component implementation
}

// Good: Custom hooks for complex logic
function useUserProfile(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user logic
  }, [userId]);

  return { user, isLoading, refetch: () => {} };
}
```

### CSS/Styling

- Use CSS Modules or Styled Components
- Follow BEM methodology for class names
- Use CSS custom properties for theming
- Mobile-first responsive design

```css
/* Component.module.css */
.button {
  /* Base styles */
}

.button--primary {
  /* Primary variant */
}

.button--small {
  /* Small size */
}

@media (min-width: 768px) {
  .button {
    /* Tablet and up styles */
  }
}
```

## 🧪 Testing Requirements

### Unit Tests

- Write tests for all new functions and components
- Aim for 80%+ code coverage
- Use descriptive test names

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

- Test component interactions
- Test API integrations
- Use MSW for API mocking

### E2E Tests

- Test critical user journeys
- Use Playwright or Cypress
- Include accessibility testing

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🔄 Pull Request Process

### Before Creating a PR

1. **Ensure Tests Pass**
   ```bash
   npm test
   npm run test:e2e
   npm run lint
   npm run type-check
   ```

2. **Update Documentation**
   - Update relevant documentation files
   - Add or update Storybook stories
   - Update changelog if needed

3. **Check Bundle Size**
   ```bash
   npm run build:analyze
   ```

### PR Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added and passing
- [ ] No new accessibility violations
```

### Review Process

1. **Automated Checks**
   - All CI checks must pass
   - Code coverage must meet requirements
   - No accessibility violations

2. **Code Review**
   - At least one approving review required
   - Address all review comments
   - Resolve any merge conflicts

3. **Final Checks**
   - Squash commits if needed
   - Update PR title to follow conventional commits
   - Ensure documentation is complete

## 🐛 Issue Guidelines

### Bug Reports

```markdown
**Bug Description**
Clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.0.0]

**Additional Context**
Screenshots, logs, or other relevant information.
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Why would this feature be useful?

**Proposed Solution**
How would you like this to be implemented?

**Alternatives Considered**
Other approaches you've considered.

**Additional Context**
Mockups, examples, or other relevant information.
```

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Checklist

1. **Pre-release**
   - [ ] All tests passing
   - [ ] Documentation updated
   - [ ] Changelog updated
   - [ ] Version bumped

2. **Release**
   - [ ] Create release tag
   - [ ] Build and publish packages
   - [ ] Update documentation site
   - [ ] Announce release

3. **Post-release**
   - [ ] Monitor for issues
   - [ ] Update dependencies
   - [ ] Plan next release

## 🆘 Getting Help

- 💬 [Discussions](https://github.com/example/project/discussions) - General questions and ideas
- 🐛 [Issues](https://github.com/example/project/issues) - Bug reports and feature requests
- 📧 [Email](mailto:support@example.com) - Private support questions
- 💬 [Discord](https://discord.gg/example) - Real-time community chat

## 🙏 Recognition

Contributors will be recognized in:

- **README Contributors Section**
- **Release Notes**
- **Annual Contributor Report**

Thank you for contributing to making this project better! 🎉