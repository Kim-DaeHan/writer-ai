const manifest = {
  manifest_version: 3,
  name: "Writer AI Extension",
  version: "1.0.0",
  description: "AI writing assistant for Chrome",
  action: {
    default_popup: "index.html",
  },
  permissions: ["storage", "tabs", "activeTab"],
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
