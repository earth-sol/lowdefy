# Tailwind CSS Integration with Lowdefy Layout

This guide shows how to integrate Tailwind CSS with Lowdefy's layout system.

## Setup in your Lowdefy app

1. Install the required dependencies:

```bash
npm install tailwindcss postcss autoprefixer --save-dev
```

2. Initialize Tailwind CSS:

```bash
npx tailwindcss init -p
```

3. Configure your `tailwind.config.js` file to include Lowdefy source files:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
    },
  },
  plugins: [],
}
```

4. Create a CSS file (e.g., `styles/globals.css`) with Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Import the CSS file in your app's entry point.

## Using Tailwind with Lowdefy Layout

### Option 1: Using `className` with blocks-classnames plugin

With the blocks-classnames plugin, you can directly apply Tailwind classes to any block:

```yaml
blocks:
  - id: myCard
    type: Card
    properties:
      title: User Profile
      className: p-4 bg-white shadow-lg rounded-lg hover:shadow-xl
```

### Option 2: Using the Tailwind Layout system

Configure your app to use Tailwind-based layout:

```js
// In your app configuration
import { createBlockLayout } from '@lowdefy/layout';

// Create a Tailwind-based BlockLayout
const BlockLayout = createBlockLayout({ useTailwind: true });

// Then use this BlockLayout in your app
```

Use standard Lowdefy layout properties, which will be converted to Tailwind classes:

```yaml
blocks:
  - id: responsiveBlock
    type: Box
    layout:
      span: 12       # Becomes w-1/2 at medium breakpoints and up
      xs:
        span: 24     # Full width on mobile (default)
      md:
        span: 12     # Half width on medium screens
      lg:
        span: 8      # One-third width on large screens
      align: middle  # Vertically centered (self-center)
```

## Responsive Layout Example

```yaml
blocks:
  - id: page
    type: Box
    blocks:
      - id: header
        type: Box
        layout:
          span: 24
        properties:
          className: bg-blue-600 text-white p-4
        blocks:
          - id: title
            type: Title
            properties:
              content: My Tailwind App
              level: 2
              className: m-0
      
      - id: content
        type: Box
        layout:
          span: 24
        properties:
          className: flex flex-wrap p-4
        blocks:
          - id: sidebar
            type: Box
            layout:
              xs: { span: 24 }
              md: { span: 6 }
            properties:
              className: p-4 bg-gray-100
            blocks:
              - id: navMenu
                type: Menu
                properties:
                  className: bg-transparent border-0
          
          - id: mainContent
            type: Box
            layout:
              xs: { span: 24 }
              md: { span: 18 }
            properties:
              className: p-4
            blocks:
              - id: card1
                type: Card
                layout:
                  xs: { span: 24 }
                  lg: { span: 12 }
                properties:
                  title: Card One
                  className: m-2 shadow hover:shadow-md transition-shadow
              
              - id: card2
                type: Card
                layout:
                  xs: { span: 24 }
                  lg: { span: 12 }
                properties:
                  title: Card Two
                  className: m-2 shadow hover:shadow-md transition-shadow
```

## Breakpoint Mapping

Lowdefy's layout breakpoints map to Tailwind's breakpoints as follows:

| Lowdefy | Breakpoint | Tailwind |
|---------|------------|----------|
| xs      | < 576px    | Default  |
| sm      | ≥ 576px    | sm       |
| md      | ≥ 768px    | md       |
| lg      | ≥ 992px    | lg       |
| xl      | ≥ 1200px   | xl       |
| xxl     | ≥ 1600px   | 2xl      |