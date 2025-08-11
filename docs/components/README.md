# Component Documentation

This directory contains comprehensive documentation for all public components in this project.

## 📋 Table of Contents

- [Component Overview](#component-overview)
- [Getting Started](#getting-started)
- [Design System](#design-system)
- [Component Categories](#component-categories)
- [Usage Guidelines](#usage-guidelines)
- [Accessibility](#accessibility)
- [Testing](#testing)

## 🔍 Component Overview

Our component library is built with modern frameworks and follows best practices for reusability, accessibility, and performance.

**Framework:** React 18+ with TypeScript
**Styling:** CSS Modules / Styled Components / Tailwind CSS
**Bundle Size:** Tree-shakeable components
**Browser Support:** Modern browsers (ES2020+)

## 🚀 Getting Started

### Installation

```bash
npm install @yourproject/components
```

### Basic Usage

```jsx
import { Button, Card, Input } from '@yourproject/components';

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Importing Styles

```jsx
import '@yourproject/components/dist/styles.css';
```

## 🎨 Design System

Our components follow a consistent design system with standardized:

- **Colors:** Primary, secondary, success, warning, error, neutral
- **Typography:** Heading scales, body text, captions
- **Spacing:** 4px grid system (4, 8, 12, 16, 24, 32, 48, 64px)
- **Border Radius:** 4px, 8px, 12px, 16px
- **Shadows:** Subtle elevation system
- **Breakpoints:** Mobile-first responsive design

### Color Palette

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-neutral: #6b7280;
}
```

## 📦 Component Categories

### Layout Components
- [Container](./layout/container.md) - Responsive container with max-width
- [Grid](./layout/grid.md) - Flexible grid system
- [Stack](./layout/stack.md) - Vertical and horizontal spacing
- [Flex](./layout/flex.md) - Flexbox wrapper with common props

### Form Components
- [Button](./forms/button.md) - Primary, secondary, and icon buttons
- [Input](./forms/input.md) - Text, email, password, and number inputs
- [TextArea](./forms/textarea.md) - Multi-line text input
- [Select](./forms/select.md) - Dropdown selection
- [Checkbox](./forms/checkbox.md) - Boolean input with labels
- [Radio](./forms/radio.md) - Single selection from options
- [Switch](./forms/switch.md) - Toggle switch component

### Data Display
- [Card](./display/card.md) - Content container with optional header/footer
- [Table](./display/table.md) - Data table with sorting and pagination
- [List](./display/list.md) - Ordered and unordered lists
- [Badge](./display/badge.md) - Status indicators and labels
- [Avatar](./display/avatar.md) - User profile images
- [Tooltip](./display/tooltip.md) - Contextual information on hover

### Navigation
- [Navbar](./navigation/navbar.md) - Top navigation bar
- [Sidebar](./navigation/sidebar.md) - Side navigation panel
- [Breadcrumb](./navigation/breadcrumb.md) - Hierarchical navigation
- [Pagination](./navigation/pagination.md) - Page navigation controls
- [Tabs](./navigation/tabs.md) - Tabbed content navigation

### Feedback
- [Alert](./feedback/alert.md) - Success, warning, error messages
- [Modal](./feedback/modal.md) - Overlay dialogs
- [Toast](./feedback/toast.md) - Temporary notification messages
- [Loading](./feedback/loading.md) - Loading states and spinners
- [Progress](./feedback/progress.md) - Progress bars and indicators

### Utility Components
- [Icon](./utility/icon.md) - SVG icon system
- [Divider](./utility/divider.md) - Content separator
- [Spacer](./utility/spacer.md) - Flexible spacing component

## 📖 Usage Guidelines

### Props Naming Convention

- **Variant Props:** Use descriptive names like `variant="primary"` or `size="large"`
- **Boolean Props:** Use positive names like `isLoading` instead of `notLoading`
- **Event Props:** Use `onXxx` pattern like `onClick`, `onChange`
- **Ref Props:** Use `ref` for component refs, `xxxRef` for nested refs

### Component Composition

```jsx
// Good: Composable components
<Card>
  <Card.Header>
    <Card.Title>User Profile</Card.Title>
  </Card.Header>
  <Card.Body>
    <Avatar src="/user.jpg" alt="John Doe" />
    <Text>John Doe</Text>
  </Card.Body>
  <Card.Footer>
    <Button>Edit Profile</Button>
  </Card.Footer>
</Card>

// Avoid: Monolithic components with too many props
<UserCard 
  title="User Profile"
  avatarSrc="/user.jpg"
  userName="John Doe"
  hasEditButton={true}
  onEdit={handleEdit}
/>
```

### Styling Guidelines

- Use CSS custom properties for theming
- Prefer composition over configuration
- Support both light and dark themes
- Use semantic color names

## ♿ Accessibility

All components follow WCAG 2.1 AA guidelines:

- **Keyboard Navigation:** All interactive elements are keyboard accessible
- **Screen Readers:** Proper ARIA labels and semantic HTML
- **Color Contrast:** Minimum 4.5:1 contrast ratio
- **Focus Management:** Visible focus indicators
- **Alternative Text:** Images have descriptive alt text

### Accessibility Props

Common accessibility props supported across components:

```jsx
<Button
  aria-label="Close dialog"
  aria-describedby="tooltip-1"
  role="button"
  tabIndex={0}
>
  Close
</Button>
```

## 🧪 Testing

### Testing Guidelines

1. **Unit Tests:** Test component logic and prop handling
2. **Integration Tests:** Test component interactions
3. **Visual Tests:** Snapshot testing for UI consistency
4. **Accessibility Tests:** Automated a11y testing

### Testing Utilities

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

test('button handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 🔧 Development

### Local Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build components
npm run build
```

### Contributing

1. Follow the [Contributing Guidelines](../guides/contributing.md)
2. Use the [Component Template](./templates/component-template.md)
3. Include comprehensive tests
4. Add Storybook stories
5. Update documentation

## 📚 Additional Resources

- [Storybook](https://storybook.example.com) - Component playground
- [Design Tokens](./design-tokens.md) - Design system values
- [Migration Guide](./migration.md) - Upgrading between versions
- [FAQ](./faq.md) - Frequently asked questions
- [Changelog](./changelog.md) - Version history

## 🤝 Support

- 🐛 [Report bugs](https://github.com/example/components/issues)
- 💡 [Request features](https://github.com/example/components/discussions)
- 📖 [Documentation issues](https://github.com/example/components/issues)
- 💬 [Community Discord](https://discord.gg/example)