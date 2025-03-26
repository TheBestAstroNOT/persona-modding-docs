import React from "react";
import CMS from "decap-cms-app";
import { MDXProvider } from "@mdx-js/react";
import * as DocusaurusComponents from "@docusaurus/theme-common"; // Import Docusaurus components

const components = {
  ...DocusaurusComponents, // Ensure Docusaurus components are available
};

const MDXPreview = ({ entry }) => {
  return (
    <MDXProvider components={components}>
      <div>{entry.getIn(["data", "body"])}</div>
    </MDXProvider>
  );
};

CMS.registerPreviewTemplate("mdx", MDXPreview);