const zl = require("zip-lib");const path = require("path");const fs = require("fs-extra");const archive = async (src, dist) => {  if (!src || !dist) return "empty";  try {    if (typeof (src) == "string") {      if (fs.lstatSync(src).isDirectory()) {        await zl.archiveFolder(path.resolve(__dirname, "..", src), path.resolve(__dirname, "..", dist));      } else {        await zl.archiveFile(path.resolve(__dirname, "..", src), path.resolve(__dirname, "..", dist));      }    } else {      const zip = new zl.Zip();      for (const s in src) {        if (fs.lstatSync(src[s]).isDirectory()) {          zip.addFolder(path.resolve(__dirname, "..", src[s]), s);        } else {          zip.addFile(path.resolve(__dirname, "..", src[s]), s);        }      }      await zip.archive(path.resolve(__dirname, "..", dist));    }  } catch (e) {    return e;  }}exports.archive = archive;const extract = async (file, dist) => {  await zl.extract(file, dist);}exports.extract = extract;