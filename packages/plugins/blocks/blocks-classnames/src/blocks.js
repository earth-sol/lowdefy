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

import * as antdBlocks from '@lowdefy/blocks-antd/blocks';
import * as basicBlocks from '@lowdefy/blocks-basic/blocks';
import * as markdownBlocks from '@lowdefy/blocks-markdown/blocks';

import createWrappedBlock from './BlockWrapper.js';

// Create wrapped versions of all blocks from all packages
const wrapBlocks = (blocks) => {
  const wrappedBlocks = {};
  Object.keys(blocks).forEach((blockName) => {
    wrappedBlocks[blockName] = createWrappedBlock(blocks[blockName]);
  });
  return wrappedBlocks;
};

// Export all wrapped blocks
export const wrappedAntdBlocks = wrapBlocks(antdBlocks);
export const wrappedBasicBlocks = wrapBlocks(basicBlocks);
export const wrappedMarkdownBlocks = wrapBlocks(markdownBlocks);

// Re-export all blocks individually
Object.entries({
  ...wrappedAntdBlocks,
  ...wrappedBasicBlocks,
  ...wrappedMarkdownBlocks,
}).forEach(([name, component]) => {
  exports[name] = component;
});
