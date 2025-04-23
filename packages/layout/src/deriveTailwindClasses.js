/*
  Copyright 2020-2024 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { type } from '@lowdefy/helpers';

// Maps Lowdefy breakpoints to Tailwind breakpoints
const breakpointMap = {
  xs: '',      // Base styles (no prefix in Tailwind)
  sm: 'sm:',   // sm: >= 576px in Lowdefy, >= 640px in Tailwind
  md: 'md:',   // md: >= 768px in Lowdefy, >= 768px in Tailwind
  lg: 'lg:',   // lg: >= 992px in Lowdefy, >= 1024px in Tailwind
  xl: 'xl:',   // xl: >= 1200px in Lowdefy, >= 1280px in Tailwind
  xxl: '2xl:', // xxl: >= 1600px in Lowdefy, >= 1536px in Tailwind
};

// Maps span value (0-24) to Tailwind's grid column classes or width percentages
const spanToTailwind = (span) => {
  if (!type.isNumber(span) || span < 0 || span > 24) {
    return 'w-full'; // Default to full width
  }
  
  // Tailwind has col-span-1 through col-span-12, but our grid is 24 columns
  // Convert from 24-column to percentage width
  const percentage = Math.round((span / 24) * 100);
  
  if (percentage === 100) return 'w-full';
  if (percentage === 75) return 'w-3/4';
  if (percentage === 67 || percentage === 66) return 'w-2/3';
  if (percentage === 50) return 'w-1/2';
  if (percentage === 33) return 'w-1/3';
  if (percentage === 25) return 'w-1/4';
  if (percentage === 17 || percentage === 16) return 'w-1/6';
  if (percentage === 12 || percentage === 13) return 'w-[12.5%]';
  if (percentage === 8) return 'w-1/12';
  
  // For other percentages, use arbitrary values
  return `w-[${percentage}%]`;
};

// Maps offset value (0-24) to Tailwind's margin classes
const offsetToTailwind = (offset) => {
  if (!type.isNumber(offset) || offset <= 0 || offset > 24) {
    return '';
  }

  const percentage = Math.round((offset / 24) * 100);
  
  if (percentage === 50) return 'ml-1/2';
  if (percentage === 33) return 'ml-1/3';
  if (percentage === 25) return 'ml-1/4';
  if (percentage === 16) return 'ml-1/6';
  if (percentage === 8) return 'ml-1/12';
  
  // For other percentages, use arbitrary values
  return `ml-[${percentage}%]`;
};

// Maps order value to Tailwind's order classes
const orderToTailwind = (order) => {
  if (!type.isNumber(order)) {
    return '';
  }
  
  if (order >= 1 && order <= 12) {
    return `order-${order}`;
  }
  
  return `order-[${order}]`;
};

// Maps flex properties to Tailwind classes
const flexToTailwind = ({ flex, grow, shrink, size }) => {
  const classes = [];
  
  if (flex === true) {
    classes.push('flex-1');
    return classes.join(' ');
  }
  
  if (type.isString(flex)) {
    // Custom flex value
    return `flex-[${flex}]`;
  }
  
  // Handle grow
  if (grow === true || grow === 1) {
    classes.push('grow');
  } else if (grow === 0 || grow === false) {
    classes.push('grow-0');
  } else if (type.isNumber(grow)) {
    classes.push(`grow-[${grow}]`);
  }
  
  // Handle shrink
  if (shrink === true || shrink === 1) {
    classes.push('shrink');
  } else if (shrink === 0 || shrink === false) {
    classes.push('shrink-0');
  } else if (type.isNumber(shrink)) {
    classes.push(`shrink-[${shrink}]`);
  }
  
  // Handle basis (size)
  if (type.isNumber(size)) {
    classes.push(`basis-[${size}px]`);
  } else if (type.isString(size) && size !== 'auto') {
    classes.push(`basis-[${size}]`);
  } else if (size === 'auto') {
    classes.push('basis-auto');
  }
  
  return classes.join(' ');
};

// Maps alignment to Tailwind's self-alignment classes
const alignToTailwind = (align) => {
  if (align === 'top') return 'self-start';
  if (align === 'middle') return 'self-center';
  if (align === 'bottom') return 'self-end';
  if (align === 'stretch') return 'self-stretch';
  return '';
};

// Processes layout parameters for a specific breakpoint
const processBreakpoint = (breakpoint, breakpointProps) => {
  const classes = [];
  const prefix = breakpointMap[breakpoint];
  
  if (!type.isObject(breakpointProps)) return '';
  
  // Handle span
  if (type.isNumber(breakpointProps.span)) {
    classes.push(`${prefix}${spanToTailwind(breakpointProps.span)}`);
  }
  
  // Handle offset
  if (type.isNumber(breakpointProps.offset)) {
    classes.push(`${prefix}${offsetToTailwind(breakpointProps.offset)}`);
  }
  
  // Handle order
  if (type.isNumber(breakpointProps.order)) {
    classes.push(`${prefix}${orderToTailwind(breakpointProps.order)}`);
  }
  
  return classes.join(' ');
};

const deriveTailwindClasses = ({
  flex,
  offset,
  order,
  pull,
  push,
  span,
  grow,
  shrink,
  size,
  align,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}) => {
  const classes = ['flex']; // Always use flex for layout
  
  // For offset, we need to calculate the width based on 24-column grid
  let mdSpan = span;
  if (offset && !span) {
    mdSpan = 24 - offset;
  }

  // Add default responsive with properties for md breakpoint
  classes.push(
    processBreakpoint('xs', { span: 24 }),
    processBreakpoint('sm', { span: 24 }),
  );
  
  // Add layout properties to md breakpoint
  classes.push(processBreakpoint('md', { offset, order, span: mdSpan }));
  
  // Handle flex properties
  const flexClasses = flexToTailwind({ flex, grow, shrink, size });
  if (flexClasses) {
    classes.push(flexClasses);
  }
  
  // Handle responsive breakpoints
  if (type.isObject(xs)) {
    classes.push(processBreakpoint('xs', xs));
  }
  
  if (type.isObject(sm)) {
    classes.push(processBreakpoint('sm', sm));
  }
  
  if (type.isObject(md)) {
    classes.push(processBreakpoint('md', md));
  }
  
  if (type.isObject(lg)) {
    classes.push(processBreakpoint('lg', lg));
  }
  
  if (type.isObject(xl)) {
    classes.push(processBreakpoint('xl', xl));
  }
  
  if (type.isObject(xxl)) {
    classes.push(processBreakpoint('xxl', xxl));
  }
  
  // Handle alignment
  if (align) {
    classes.push(alignToTailwind(align));
  }
  
  return classes.filter(Boolean).join(' ');
};

export default deriveTailwindClasses;