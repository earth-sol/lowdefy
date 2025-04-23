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

import { jest } from '@jest/globals';
import createBlockLayout from './createBlockLayout.js';

// Mock the imported components
import BlockLayout from './BlockLayout.js';
import BlockLayoutTailwind from './BlockLayoutTailwind.js';

jest.mock('./BlockLayout.js');
jest.mock('./BlockLayoutTailwind.js');

test('createBlockLayout returns BlockLayout by default', () => {
  const result = createBlockLayout();
  expect(result).toBe(BlockLayout);
});

test('createBlockLayout returns BlockLayoutTailwind when useTailwind is true', () => {
  const result = createBlockLayout({ useTailwind: true });
  expect(result).toBe(BlockLayoutTailwind);
});

test('createBlockLayout returns BlockLayout when useTailwind is false', () => {
  const result = createBlockLayout({ useTailwind: false });
  expect(result).toBe(BlockLayout);
});