import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkAdmonitions from 'remark-admonitions';
import rehypeRaw from 'rehype-raw';
import { WidgetPreviewContainer } from 'decap-cms-ui-default';

const Preview = ({ value }) => (
  <WidgetPreviewContainer>
    <ReactMarkdown
      children={value}
      remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonitions]}
      rehypePlugins={[rehypeRaw]}
    />
  </WidgetPreviewContainer>
);

export default Preview;
