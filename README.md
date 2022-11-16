# 解决痛点  

文件未加密不安全  
网盘文件被莫名删除  

# 初始化  

npm install  

# 生成密钥  

node key  

# 配置 config  
```json
{
  "from": "起始文件夹",
  "to": "目标文件夹",
  "cache": "缓存文件夹 会自删 默认[from]/cache",
  "iv": "混淆 默认 c48550a506734b21",
  "key": "密钥 默认 f5a871d66f804ca3",
  "hex": "名称加密 默认 true",
  "fullhex": "路径加密 默认 false",
  "ignore": "忽略 正则",
  "db": "数据库模式 默认 true 对比模式下 会判断文件是否发生改变 并且更新变化",
  "md5": "对比模式 默认 false"
}
```

# 传参  

```bat
node index.js --from=test --to=test/dist  
```

# 执行  

npm start  