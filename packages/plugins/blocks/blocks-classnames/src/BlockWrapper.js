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

import React from 'react';
import classNames from 'classnames';
import { blockDefaultProps } from '@lowdefy/block-utils';

// This is a higher-order component that wraps any Lowdefy block
// to add support for className prop
const createWrappedBlock = (OriginalBlock) => {
  const WrappedBlock = (props) => {
    // Extract className from properties
    const { className, ...otherProperties } = props.properties || {};
    
    // Create a new makeCssClass method that combines the className with the style
    const enhancedMethods = {
      ...props.methods,
      makeCssClass: (style) => {
        const originalClass = props.methods.makeCssClass(style);
        return className ? `${className} ${originalClass}` : originalClass;
      }
    };

    // Clone the props, modify the properties and methods
    const enhancedProps = {
      ...props,
      properties: otherProperties,
      methods: enhancedMethods
    };

    // Return the original block with our enhanced props
    return <OriginalBlock {...enhancedProps} />;
  };

  // Copy meta information from original block
  WrappedBlock.meta = OriginalBlock.meta ? { ...OriginalBlock.meta } : {};
  
  // Add className to the schema if it exists
  if (OriginalBlock.schema) {
    WrappedBlock.schema = {
      ...OriginalBlock.schema,
      properties: {
        ...OriginalBlock.schema.properties,
        properties: {
          ...OriginalBlock.schema.properties.properties,
          className: {
            type: "string",
            description: "Custom CSS class names to apply to the block"
          }
        }
      }
    };
  }

  WrappedBlock.defaultProps = blockDefaultProps;
  
  return WrappedBlock;
};

export default createWrappedBlock;