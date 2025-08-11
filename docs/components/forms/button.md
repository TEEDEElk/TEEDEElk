# Button Component

A versatile button component with multiple variants, sizes, and states for user interactions.

## 📋 Table of Contents

- [Import](#import)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Variants](#variants)
- [Sizes](#sizes)
- [States](#states)
- [Examples](#examples)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)
- [Testing](#testing)

## 📦 Import

```tsx
import { Button } from '@yourproject/components';
// or
import Button from '@yourproject/components/Button';
```

## 🚀 Basic Usage

```tsx
import { Button } from '@yourproject/components';

function App() {
  return <Button>Click me</Button>;
}
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `isDisabled` | `boolean` | `false` | Disables button interaction |
| `fullWidth` | `boolean` | `false` | Makes button full width of container |
| `leftIcon` | `ReactNode` | - | Icon to display on the left |
| `rightIcon` | `ReactNode` | - | Icon to display on the right |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus event handler |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur event handler |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |
| `...rest` | `ButtonHTMLAttributes` | - | Additional HTML button attributes |

### TypeScript Interface

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}
```

## 🎨 Variants

### Primary (Default)

Primary action button with solid background.

```tsx
<Button variant="primary">Primary Button</Button>
```

### Secondary

Secondary action button with muted appearance.

```tsx
<Button variant="secondary">Secondary Button</Button>
```

### Outline

Button with border and transparent background.

```tsx
<Button variant="outline">Outline Button</Button>
```

### Ghost

Minimal button with no background or border.

```tsx
<Button variant="ghost">Ghost Button</Button>
```

### Danger

Button for destructive actions.

```tsx
<Button variant="danger">Delete Item</Button>
```

## 📏 Sizes

### Small

Compact button for tight spaces.

```tsx
<Button size="small">Small</Button>
```

### Medium (Default)

Standard button size for most use cases.

```tsx
<Button size="medium">Medium</Button>
```

### Large

Prominent button for primary actions.

```tsx
<Button size="large">Large</Button>
```

## 🔄 States

### Loading

Shows a spinner and disables interaction.

```tsx
<Button isLoading>Saving...</Button>
```

### Disabled

Prevents interaction and reduces opacity.

```tsx
<Button isDisabled>Can't Click</Button>
```

### Full Width

Stretches to fill container width.

```tsx
<Button fullWidth>Full Width Button</Button>
```

## 💡 Examples

### With Icons

```tsx
import { Button } from '@yourproject/components';
import { PlusIcon, ArrowRightIcon } from '@yourproject/icons';

function IconExamples() {
  return (
    <div>
      <Button leftIcon={<PlusIcon />}>Add Item</Button>
      <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
    </div>
  );
}
```

### Form Submit Button

```tsx
import { Button } from '@yourproject/components';

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button 
        type="submit" 
        isLoading={isSubmitting}
        fullWidth
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
```

### Button Group

```tsx
import { Button } from '@yourproject/components';

function ButtonGroup() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  );
}
```

### Conditional Rendering

```tsx
import { Button } from '@yourproject/components';

function ConditionalButton({ user, onLogin, onLogout }) {
  return (
    <Button
      variant={user ? 'outline' : 'primary'}
      onClick={user ? onLogout : onLogin}
    >
      {user ? 'Log Out' : 'Log In'}
    </Button>
  );
}
```

### Custom Styling

```tsx
import { Button } from '@yourproject/components';

function CustomButton() {
  return (
    <Button 
      className="custom-button-class"
      style={{ 
        backgroundColor: '#custom-color',
        borderRadius: '20px'
      }}
    >
      Custom Styled
    </Button>
  );
}
```

## ♿ Accessibility

The Button component includes comprehensive accessibility features:

### Keyboard Navigation
- **Enter/Space:** Activates the button
- **Tab:** Moves focus to/from the button

### Screen Reader Support
- Proper `role="button"` semantics
- Descriptive text for screen readers
- Loading state announcements

### ARIA Attributes

```tsx
<Button
  aria-label="Add new item to cart"
  aria-describedby="cart-help-text"
  aria-pressed={isPressed}
>
  Add to Cart
</Button>
```

### Focus Management

```tsx
import { useRef } from 'react';
import { Button } from '@yourproject/components';

function FocusExample() {
  const buttonRef = useRef(null);

  const focusButton = () => {
    buttonRef.current?.focus();
  };

  return (
    <Button ref={buttonRef} onClick={focusButton}>
      Focus Me
    </Button>
  );
}
```

## 📖 Best Practices

### Do's ✅

- Use descriptive button text that clearly indicates the action
- Use appropriate variants for visual hierarchy
- Include loading states for async operations
- Provide adequate spacing between buttons
- Use icons to enhance understanding when appropriate

```tsx
// Good: Clear action and proper variant
<Button variant="danger" leftIcon={<TrashIcon />}>
  Delete Account
</Button>

// Good: Loading state for async action
<Button isLoading={isSaving} onClick={handleSave}>
  {isSaving ? 'Saving...' : 'Save Changes'}
</Button>
```

### Don'ts ❌

- Don't use vague text like "Click here" or "Submit"
- Don't use too many primary buttons on one page
- Don't make buttons too small for touch targets
- Don't forget to handle loading and error states

```tsx
// Bad: Vague text and inappropriate variant
<Button variant="primary">Click here</Button>

// Bad: Multiple primary actions confuse hierarchy
<div>
  <Button variant="primary">Save</Button>
  <Button variant="primary">Cancel</Button>
  <Button variant="primary">Delete</Button>
</div>
```

### Button Hierarchy

1. **Primary:** Main action (usually one per page/section)
2. **Secondary:** Important but not primary actions
3. **Outline:** Less prominent actions
4. **Ghost:** Subtle actions or navigation
5. **Danger:** Destructive actions

## 🧪 Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when isDisabled prop is true', () => {
    render(<Button isDisabled>Can't click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('shows loading state correctly', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('applies correct CSS classes for variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### Integration Tests

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '../Button';

test('button integrates with form submission', async () => {
  const mockSubmit = jest.fn();
  
  render(
    <form onSubmit={mockSubmit}>
      <Button type="submit">Submit Form</Button>
    </form>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Submit Form' }));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
  });
});
```

### Accessibility Tests

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

test('button has no accessibility violations', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🔗 Related Components

- [IconButton](./icon-button.md) - Button with only an icon
- [ButtonGroup](./button-group.md) - Group of related buttons
- [ToggleButton](./toggle-button.md) - Button that can be toggled on/off
- [Link](../navigation/link.md) - For navigation actions

## 📚 Resources

- [Design System Guidelines](../../guides/design-system.md)
- [Accessibility Guidelines](../../guides/accessibility.md)
- [Testing Guidelines](../../guides/testing.md)
- [Storybook Examples](https://storybook.example.com/?path=/story/button)

## 🔄 Changelog

### v2.1.0
- Added `fullWidth` prop
- Improved loading state animation
- Fixed focus ring in Safari

### v2.0.0
- **Breaking:** Renamed `disabled` to `isDisabled`
- Added `leftIcon` and `rightIcon` props
- Improved TypeScript definitions

### v1.5.0
- Added `ghost` variant
- Improved accessibility attributes
- Performance optimizations