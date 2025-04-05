import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';

import { WidgetPreviewContainer } from 'decap-cms-ui-default';

// Admonition renderer
const Admonition = ({ className = '', children }) => {
  const type = className?.split(' ').find(cls => cls.startsWith('admonition-'))?.replace('admonition-', '') || 'note';

  return (
    <div className={`admonition admonition-${type}`}>
      <div className="admonition-title">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
      <div className="admonition-content">{children}</div>
    </div>
  );
};

const Preview = ({ entry }) => {
  const body = entry.getIn(['data', 'body']) || '';

  return (
    <WidgetPreviewContainer>
      <ReactMarkdown
        children={body}
        remarkPlugins={[remarkGfm, remarkDirective]}
        rehypePlugins={[rehypeRaw]}
        components={{
          div({ node, className, ...props }) {
            if (className?.includes('admonition')) {
              return <Admonition className={className} {...props} />;
            }
            return <div className={className} {...props} />;
          }
        }}
      />
    </WidgetPreviewContainer>
  );
};

export default Preview;