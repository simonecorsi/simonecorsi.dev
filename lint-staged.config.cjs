module.exports = {
  '*.{js,ts,tsx,css,json,md,yaml,yml}': ['prettier --write'],
  '*.md': (filenames) => {
    const list = filenames.map((filename) => `'markdown-toc -i ${filename}`);
    return list;
  },
  '*.{js,ts,tsx}': ['eslint --fix'],
};
