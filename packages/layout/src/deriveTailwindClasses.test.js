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

import deriveTailwindClasses from './deriveTailwindClasses.js';

test('default layout', () => {
  expect(deriveTailwindClasses({})).toBe('flex w-full sm:w-full');
});

test('span', () => {
  expect(deriveTailwindClasses({ span: 12 })).toBe('flex w-full sm:w-full md:w-1/2');
  expect(deriveTailwindClasses({ span: 8 })).toBe('flex w-full sm:w-full md:w-1/3');
  expect(deriveTailwindClasses({ span: 6 })).toBe('flex w-full sm:w-full md:w-1/4');
  expect(deriveTailwindClasses({ span: 16 })).toBe('flex w-full sm:w-full md:w-2/3');
  expect(deriveTailwindClasses({ span: 24 })).toBe('flex w-full sm:w-full md:w-full');
});

test('offset', () => {
  expect(deriveTailwindClasses({ offset: 6 })).toBe('flex w-full sm:w-full md:w-3/4 md:ml-1/4');
  expect(deriveTailwindClasses({ offset: 12 })).toBe('flex w-full sm:w-full md:w-1/2 md:ml-1/2');
  expect(deriveTailwindClasses({ span: 8, offset: 8 })).toBe('flex w-full sm:w-full md:w-1/3 md:ml-1/3');
});

test('order', () => {
  expect(deriveTailwindClasses({ order: 1 })).toBe('flex w-full sm:w-full md:order-1');
  expect(deriveTailwindClasses({ order: 5 })).toBe('flex w-full sm:w-full md:order-5');
});

test('flex', () => {
  expect(deriveTailwindClasses({ flex: true })).toBe('flex w-full sm:w-full flex-1');
  expect(deriveTailwindClasses({ flex: '1 0 auto' })).toBe('flex w-full sm:w-full flex-[1 0 auto]');
});

test('grow, shrink, size', () => {
  expect(deriveTailwindClasses({ grow: true })).toBe('flex w-full sm:w-full grow');
  expect(deriveTailwindClasses({ grow: false })).toBe('flex w-full sm:w-full grow-0');
  expect(deriveTailwindClasses({ grow: 2 })).toBe('flex w-full sm:w-full grow-[2]');
  
  expect(deriveTailwindClasses({ shrink: true })).toBe('flex w-full sm:w-full shrink');
  expect(deriveTailwindClasses({ shrink: false })).toBe('flex w-full sm:w-full shrink-0');
  expect(deriveTailwindClasses({ shrink: 2 })).toBe('flex w-full sm:w-full shrink-[2]');
  
  expect(deriveTailwindClasses({ size: 'auto' })).toBe('flex w-full sm:w-full basis-auto');
  expect(deriveTailwindClasses({ size: '200px' })).toBe('flex w-full sm:w-full basis-[200px]');
  expect(deriveTailwindClasses({ size: 200 })).toBe('flex w-full sm:w-full basis-[200px]');
});

test('align', () => {
  expect(deriveTailwindClasses({ align: 'top' })).toBe('flex w-full sm:w-full self-start');
  expect(deriveTailwindClasses({ align: 'middle' })).toBe('flex w-full sm:w-full self-center');
  expect(deriveTailwindClasses({ align: 'bottom' })).toBe('flex w-full sm:w-full self-end');
  expect(deriveTailwindClasses({ align: 'stretch' })).toBe('flex w-full sm:w-full self-stretch');
});

test('responsive breakpoints', () => {
  expect(deriveTailwindClasses({ 
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 6 },
    xl: { span: 4 },
    xxl: { span: 3 }
  })).toBe('flex w-full sm:w-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-[12.5%]');
  
  expect(deriveTailwindClasses({ 
    xs: { span: 24, order: 3 },
    md: { span: 12, order: 1 }
  })).toBe('flex w-full sm:w-full w-full order-3 md:w-1/2 md:order-1');
});