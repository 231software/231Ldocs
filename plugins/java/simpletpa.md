# 玩家互传
玩家互传需要一个人主动进行请求并由另一个人接受。  
首先主动进行请求的人发送指令，如果是传送到对方那里，发送指令`/tpa 玩家名`，如果是传送到自己这里，发送指令`/tpahere 玩家名`  
此时游戏会提示“[SimpleTpa] Sending a teleport request to 「玩家名」. If you want to cancle it  /tpacancel player”，证明请求发送成功  
另一个人此时需要发送`/tpaccept`来接受请求  
如果接受成功，游戏提示“You accepted the teleport request!”  
随后传送不会立即开始，请双方站在原地不动，几秒后传送才会开始  
传送完成后，游戏提示“Teleported!”
## 被请求方拒绝传送
发送`/tpadeny`即可拒绝他人发来的传送请求
## 请求方取消请求
发送`/tpacancel 「玩家名」`即可取消请求。玩家名是自己请求过传送的那个玩家的名字
