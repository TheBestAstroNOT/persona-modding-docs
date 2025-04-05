import React from "react";
import ReactMarkdown from "react-markdown";
import { WidgetPreviewContainer } from "decap-cms-ui-default";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

// Our custom plugin
function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" &&
        ["info", "warning", "danger", "note"].includes(node.name)
      ) {
        const data = node.data || (node.data = {});
        const type = node.name;

        data.hName = "div";
        data.hProperties = {
          className: `admonition admonition-${type}`,
        };

        if (!node.children[0] || node.children[0].type !== "paragraph") return;

        node.children.unshift({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: { className: "admonition-title" },
          },
          children: [
            {
              type: "text",
              value: type.charAt(0).toUpperCase() + type.slice(1),
            },
          ],
        });
      }
    });
  };
}

const Preview = ({ entry }) => {
  const body = entry.getIn(["data", "body"]) || "";

  return (
    <WidgetPreviewContainer>
      <ReactMarkdown
        children={body}
        remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonitions]}
        rehypePlugins={[rehypeRaw]}
      />
    </WidgetPreviewContainer>
  );
};

export default Preview;