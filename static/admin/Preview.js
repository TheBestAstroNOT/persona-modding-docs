import React from 'react';
import { WidgetPreviewContainer } from 'decap-cms-ui-default';
import { compile } from 'xdm';
import { run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';

const Admonition = ({ type = 'note', title, children }) => (
  <div className={`admonition admonition-${type}`}>
    {title && <div className="admonition-title">{title}</div>}
    <div className="admonition-content">{children}</div>
  </div>
);

const Preview = ({ entry }) => {
  const raw = entry.getIn(['data', 'body']) || '';
  const [Component, setComponent] = React.useState(() => () => <p>Loading...</p>);

  React.useEffect(() => {
    const renderMDX = async () => {
      try {
        const compiled = await compile(raw, { outputFormat: 'function-body' });
        const mod = await run(compiled.value, {
          ...runtime,
          baseUrl: import.meta.url,
          useMDXComponents: () => ({ Admonition }),
        });
        setComponent(() => mod.default);
      } catch (err) {
        setComponent(() => () => <pre style={{ color: 'red' }}>{err.message}</pre>);
      }
    };
    renderMDX();
  }, [raw]);

  return (
    <WidgetPreviewContainer>
      <Component />
    </WidgetPreviewContainer>
  );
};

export default Preview;
