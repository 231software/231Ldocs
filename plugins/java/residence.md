# Java版领地插件使用教程
我们的服务器使用residence插件作为领地插件
## 圈地
1. 手持一把木锄
2. 领地的形状必须是长方形，前往这个长方形的两个对角，对着其中一个角在地面上对应的方块点击左键（手机版触屏玩家直接长按破坏方块），之后游戏提示“已选择第一个选取点”，然后再前往另一个角点击右键（手机版触屏玩家直接点击方块），游戏提示“已选择第二个选取点”，两个点都用木锄点击后，要建立的领地周围一圈会出现红色和绿色的粒子效果（像萤火虫一样飘在空中）（如果选区过大可能不会显示）
3. 发送指令`/res create 你要创建的领地的名字`
4. 如果创建成功，游戏提示“已创建领地「你要创建的领地的名字」！”

## 删除领地
1. 发送指令`/res remove 你要创建的领地的名字`，游戏提示“如果你要删除领地「你要创建的领地的名字」，输入/res confirm以确认操作”
2. 发送指令`/res confirm`，游戏提示“「你要创建的领地的名字」已删除”

## 重命名领地
发送指令`/res set 旧领地名 新领地名`
## 领地传送
发送指令`/res tpset`来把当前坐标设置为脚下领地的传送点。注意，领地传送点不能设置到领地外面。  
发送指令`/res tp 领地名`来传送到领地  
## 更改权限
### 修改领地默认权限
java版玩家发送指令`/res set 领地名`即可直接打开修改权限的界面，**基岩版玩家修改权限不要用这个方法，请使用指令修改**  
发送指令`/res set 领地名 权限名 操作`，操作有true，false和remove，true是修改权限为允许，false是改为拒绝，remove是直接移除权限使其成为未设置状态  
所有权限名都可以输入指令`/res flags ?`查看
**如果要修改针对某个玩家的或者是信任名单内所有玩家的权限，不要使用这个方法，因为这个方法修改的是所有人的权限，包括陌生人**  
### 修改指定玩家的权限
发送指令`/res pset 领地名 玩家名 权限名 操作`  
### 显示领地信息
发送指令`/res info 领地名`来显示一个领地的信息。
### 显示领地边界
发送指令`/res show`来显示脚下领地边界。
### 转让领地
发送指令`/res give 领地名 要把领地给予的玩家的玩家名`
### 删除领地
发送指令`/res remove 领地名`
> [!WARNING]
> 领地系统没有回收站，删除后不可恢复
