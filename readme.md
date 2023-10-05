# 使用 The Graph 检索 BAYC NFT 的基本信息

BAYC ETH Mainet: 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D

我们定义的 GraphQL Entity

- BoredApeToken NFT 信息
    - Token ID
    - Content URI
    - Created Timestamp
    - ...
- BoredApeUser 用户信息
    - ID (Address)
    - Tokens (Token IDs) 

Playground: https://thegraph.com/hosted-service/subgraph/liyang-ust/camp?selected=playground

API: https://api.thegraph.com/subgraphs/name/liyang-ust/camp


## 操作流程

1. 跟随官方教程初始化之后 修改文件到这个仓库的版本
   
2. 直接下载该仓库

### 下载代码仓库
```
git clone https://github.com/LIYANG-UST/graphcamp
```

### 生成Graph配置
```
graph codegen
graph build
```

### 部署到自己的Hosted Service中
```
graph auth --product hosted-service <Your Access Token>
graph deploy --product hosted-service <Your Github Name>/<Your Graph Name>
```