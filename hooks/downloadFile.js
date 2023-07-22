export const downloadFile = (src, name_file) => {
  const index = src.search("upload");
  const itemDownload =
    src.slice(0, index) +
    `upload/fl_attachment:${name_file}` +
    src.slice(index + 6);
  let link = document.createElement("a");
  link.setAttribute("href", itemDownload);
  link.click();
};
