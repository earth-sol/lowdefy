# Lowdefy Layout System

The Lowdefy layout package provides a flexible and responsive grid system that works with both Ant Design's grid system and Tailwind CSS.

## Features

- Responsive grid layouts based on breakpoints
- Support for both Ant Design and Tailwind CSS
- Consistent layout API regardless of the underlying CSS framework
- Seamless integration with the blocks-classnames plugin for utility classes

## Usage

### Ant Design Layout (Default)

The default layout system uses Ant Design's Col component and grid system.

```js
import { BlockLayout } from '@lowdefy/layout';

// Then use in your components
<BlockLayout
  id="block-id"
  layout={{
    span: 12,        // 12/24 columns wide
    offset: 6,       // 6/24 columns offset
    xs: { span: 24 } // Full width on mobile
  }}
  blockStyle={{ padding: '16px' }}
>
  {children}
</BlockLayout>
```

### Tailwind CSS Layout

For Tailwind CSS integration, use the Tailwind-based layout component.

```js
import { BlockLayoutTailwind } from '@lowdefy/layout';

// Or use the factory function
import { createBlockLayout } from '@lowdefy/layout';
const BlockLayout = createBlockLayout({ useTailwind: true });

// Then use in your components
<BlockLayout
  id="block-id"
  layout={{
    span: 12,        // Will become w-1/2 in Tailwind
    offset: 6,       // Will become ml-1/4 in Tailwind
    xs: { span: 24 } // Full width on mobile
  }}
  blockStyle={{ padding: '16px' }}
>
  {children}
</BlockLayout>
```

## Layout Properties

Both layout systems support the same layout properties:

- `span`: Width in grid columns (0-24)
- `offset`: Left margin in grid columns
- `order`: Order of the element (flexbox order)
- `align`: Alignment ('top', 'middle', 'bottom', 'stretch')
- `flex`, `grow`, `shrink`, `size`: Flexbox properties
- Responsive props: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- `disabled`: Disable grid layout

## Breakpoints

| Breakpoint | Min Width | Description    |
|------------|-----------|----------------|
| xs         | <576px    | Extra small    |
| sm         | ≥576px    | Small          |
| md         | ≥768px    | Medium         |
| lg         | ≥992px    | Large          |
| xl         | ≥1200px   | Extra large    |
| xxl        | ≥1600px   | Extra extra large |

## See Also

- [Example: Tailwind CSS Integration](./examples/tailwind-integration.md)
- [BlockLayout API Documentation](./docs/block-layout.md)
- [Lowdefy blocks-classnames Plugin](../plugins/blocks/blocks-classnames/README.md)