const fs = require("fs-extra");const path = require("path");const chalk = require('chalk');const crypto = require('crypto');var argv = require('minimist')(process.argv.slice(2));(async () => {  let config = argv;  if (!config) {    console.error(chalk.red("配置文件不存在"));    return;  }  if (!config.file) {    console.error(chalk.red("配置文件格式不对") + "\r\n" + "格式: " + chalk.blue("{ file }"));    return;  }  const algorithm = 'aes-256-ctr';  const key = config.key || "c48550a506734b21";  let iv = config.iv || "f5a871d66f804ca3";  iv = Buffer.from(iv, "utf8");  const decrypt = function (str) {    const decryptKey = crypto.createHash("sha256").update(key).digest("base64");    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(decryptKey, 'base64'), iv);    const buffer = Buffer.from(str, 'hex');    let decrypted = decipher.update(buffer);    decrypted = Buffer.concat([decrypted, decipher.final()]);    return decrypted.toString();  }  try {    let dbFile = path.resolve(config.file);    if (fs.existsSync(dbFile)) {      const db = JSON.parse(decrypt(fs.readFileSync(dbFile).toString()));      if (!fs.existsSync("cache")) fs.mkdirSync("cache")      fs.writeFileSync("cache/db.json", JSON.stringify(db, null, 4));    }  } catch (e) {    console.error(e);  }})();