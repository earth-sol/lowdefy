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

import BlockLayout from './BlockLayout.js'; // Ant Design based layout
import BlockLayoutTailwind from './BlockLayoutTailwind.js'; // Tailwind based layout

// Factory function to create the appropriate BlockLayout component based on configuration
const createBlockLayout = (config = {}) => {
  const { useTailwind = false } = config;
  
  // Return the appropriate BlockLayout component based on config
  return useTailwind ? BlockLayoutTailwind : BlockLayout;
};

export default createBlockLayout;