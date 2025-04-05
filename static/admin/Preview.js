import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkAdmonitions from 'remark-admonitions';
import rehypeRaw from 'rehype-raw';
import { WidgetPreviewContainer } from 'decap-cms-ui-default';

// Custom Admonition component
const Admonition = ({ className = '', children, ...props }) => {
  const type =
    className?.split(' ').find(cls => cls.startsWith('admonition-'))?.replace('admonition-', '') || 'note';

  return (
    <div className={`admonition admonition-${type}`} {...props}>
      <div className="admonition-title">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="admonition-content">{children}</div>
    </div>
  );
};

const Preview = ({ value }) => (
  <WidgetPreviewContainer>
    <ReactMarkdown
      children={value}
      remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonitions]}
      rehypePlugins={[rehypeRaw]}
      components={{
        div({ node, className, ...props }) {
          if (className?.includes('admonition')) {
            return <Admonition className={className} {...props} />;
          }
          return <div className={className} {...props} />;
        },
      }}
    />
  </WidgetPreviewContainer>
);

export default Preview;