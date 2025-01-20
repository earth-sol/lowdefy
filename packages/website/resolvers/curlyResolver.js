import YAML from 'yaml';
import { serializer } from '@lowdefy/helpers';


async function mdResolver(refPath, vars) {

  const { content } = vars; // Markdown file content

  // regex to find Lowdefy config
  // captures content in `yaml ldf` codeblock
  // ignores any whitespace characters after closing tag
  const regex = new RegExp('\`\`\`yaml (ldf\\n.*)\\n\`\`\`\[\^yaml\]\s*$', 'gm');

  let counter = 0; // used to increment id of md blocks

  // splits content around regex
  const parsedMarkdown = content.split(regex).map((text) => {
    // ignores empty strings to avoid unnecessary md blocks between ldf blocks
    if (text.trim() !== '') {


      // parses codeblock as yaml only if capture group starts with "ldf"
      if (text.substring(0, 3) == 'ldf') {
        return serializer.deserialize(YAML.parse(text.substring(3), {}));
      }
      // any other content is returned as a properly formatted ldf block
      return {
        id: `md_${++counter}`,
        type: 'MarkdownWithCode',
        properties: {
          content: text.trim(),
        },
      };
    }
  });

  // returns array of all markdown and parsed ldf blocks
  return parsedMarkdown.filter((object) => !!object);

}

export default mdResolver;

