const manifest = {
  manifest_version: 3,
  name: "Chrome Extension",
  version: "1.0.0",
  description: "Chrome Extension with React & TypeScript",
  action: {
    default_popup: "index.html",
  },
  permissions: ["storage", "tabs"],
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"],
    },
  ],
};

export default manifest;
