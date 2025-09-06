# 开发指南 - Slope Unblocked

## 🔄 解决浏览器缓存问题

### 问题描述
当你修改网站文件后，浏览器可能仍然显示旧版本，这是因为浏览器缓存了文件以提高加载速度。

### 解决方案

#### 方法1: 强制刷新浏览器
- **Windows/Linux**: `Ctrl + F5` 或 `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- **或者**: 按 `F12` 打开开发者工具，右键刷新按钮选择"清空缓存并硬性重新加载"

#### 方法2: 清除浏览器缓存
1. 打开浏览器设置
2. 找到"隐私和安全"或"清除浏览数据"
3. 选择"缓存的图片和文件"
4. 点击清除

#### 方法3: 使用开发服务器（推荐）
我们提供了一个带缓存控制的开发服务器：

```bash
# 使用Python启动
python dev-server.py

# 或者双击批处理文件（Windows）
start-dev-server.bat
```

## 🚀 本地开发服务器

### 启动方式

#### Windows用户
1. 双击 `start-dev-server.bat` 文件
2. 或者在命令行中运行：
   ```cmd
   python dev-server.py
   ```

#### Mac/Linux用户
```bash
python3 dev-server.py
```

### 服务器特性
- ✅ 自动禁用缓存
- ✅ 实时更新文件
- ✅ 详细的访问日志
- ✅ 支持所有现代浏览器

### 访问地址
服务器启动后，在浏览器中访问：
- 本地访问: http://localhost:8000
- 局域网访问: http://[你的IP地址]:8000

## 🛠️ 开发工作流

### 推荐的开发流程
1. 启动开发服务器
2. 在浏览器中打开 http://localhost:8000
3. 修改代码文件
4. 刷新浏览器查看更改（普通刷新即可，无需强制刷新）

### 文件修改监控
开发服务器会为每个请求添加防缓存头部，确保你总是看到最新版本的文件。

## 🔧 故障排除

### 问题1: Python未安装
**错误**: `'python' 不是内部或外部命令`
**解决**: 从 https://python.org 下载并安装Python 3.x

### 问题2: 端口被占用
**错误**: `Address already in use`
**解决**: 
```bash
# 使用不同端口
python dev-server.py 8080
```

### 问题3: 文件权限问题
**错误**: `Permission denied`
**解决**: 
- Windows: 以管理员身份运行
- Mac/Linux: 使用 `chmod +x dev-server.py`

## 📱 移动端测试

### 在手机上测试
1. 确保手机和电脑在同一WiFi网络
2. 找到电脑的IP地址：
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. 在手机浏览器中访问: `http://[电脑IP]:8000`

### 响应式设计测试
使用浏览器开发者工具的设备模拟功能：
1. 按 `F12` 打开开发者工具
2. 点击设备图标（或按 `Ctrl+Shift+M`）
3. 选择不同设备尺寸进行测试

## 🚀 部署准备

### 生产环境优化
部署到生产环境前，记得：
1. 移除开发用的缓存控制头部
2. 启用适当的缓存策略
3. 压缩静态资源
4. 配置CDN（如果需要）

### 缓存策略建议
```html
<!-- 生产环境缓存设置 -->
<meta http-equiv="Cache-Control" content="public, max-age=31536000">
```

## 📞 技术支持

如果遇到其他问题，请：
1. 检查浏览器控制台是否有错误信息
2. 确认所有文件路径正确
3. 验证网络连接正常
4. 联系技术支持: contact@slopeunblocked.games