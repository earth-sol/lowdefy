# @lowdefy/blocks-classnames

A Lowdefy plugin that adds `className` support to all blocks, enabling easy integration with CSS frameworks like Tailwind CSS.

## Overview

This plugin wraps the standard Lowdefy blocks and extends them with a `className` property, allowing you to:

- Apply custom CSS classes to any block
- Use utility-based CSS frameworks like Tailwind
- Add theming or custom styling without modifying the core blocks

## Installation

Add the plugin to your Lowdefy app's configuration:

```yaml
plugins:
  - name: '@lowdefy/blocks-classnames'
    version: 4.0.0
```

## Usage

Once the plugin is installed, you can use the `className` property on any block:

```yaml
blocks:
  - id: myButton
    type: Button
    properties:
      title: Click Me
      className: my-custom-button bg-blue-500 hover:bg-blue-700
```

### Tailwind CSS Integration

For Tailwind integration:

1. Install Tailwind in your Lowdefy project
2. Configure your Tailwind setup
3. Use Tailwind utility classes in the `className` property

Example with Tailwind classes:

```yaml
- id: cardBlock
  type: Card
  properties:
    title: User Profile
    className: shadow-lg rounded-xl bg-white p-6 hover:shadow-xl transition-shadow
```

## How It Works

This plugin:

1. Wraps existing block components using a higher-order component
2. Enhances the `makeCssClass` method to include your custom classes
3. Preserves all original block functionality

The implementation is non-destructive and maintains backward compatibility with Lowdefy's styling system.

## Supported Blocks

All blocks from these packages are supported:

- @lowdefy/blocks-antd
- @lowdefy/blocks-basic
- @lowdefy/blocks-markdown

## License

Apache-2.0