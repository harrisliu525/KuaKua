# Vercel 部署指南

## 🚀 快速部署步骤

### 1. 前置条件检查
- [ ] 代码已提交并推送到GitHub/GitLab
- [ ] 拥有有效的OpenRouter API密钥
- [ ] 本地构建测试通过 (`npm run build`)

### 2. Vercel项目创建
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择您的代码仓库
4. 确认项目设置（框架会自动检测为Next.js）

### 3. 环境变量配置（关键步骤）

**必须配置的环境变量：**

| 变量名 | 值 | 说明 |
|--------|----|----|
| `OPENROUTER_API_KEY` | 您的OpenRouter API密钥 | 用于AI生成功能 |
| `OPENROUTER_MODEL` | `deepseek/deepseek-chat-v3-0324` | AI模型配置 |

**配置步骤（通过Vercel Dashboard）：**
1. 在Vercel项目页面，点击 **Settings** 标签
2. 在左侧菜单选择 **Environment Variables**
3. 点击 **Add New** 按钮
4. 添加第一个变量：
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: 粘贴您的实际API密钥（例如：sk-or-v1-xxx...）
   - **Environment**: 勾选 Production、Preview、Development
   - 点击 **Save**
5. 添加第二个变量：
   - **Name**: `OPENROUTER_MODEL`
   - **Value**: `deepseek/deepseek-chat-v3-0324`
   - **Environment**: 勾选 Production、Preview、Development
   - 点击 **Save**

**重要提醒：**
- ⚠️ API密钥必须是完整的密钥字符串，不要包含任何引号或额外字符
- ⚠️ 确保选择所有三个环境：Production、Preview、Development
- ⚠️ 变量名区分大小写，必须完全匹配

### 4. 重新部署
配置完环境变量后：
1. 在Vercel项目页面，点击 **Deployments** 标签
2. 点击最新部署右侧的三个点菜单
3. 选择 **Redeploy** 重新部署

### 5. 部署验证
- [ ] 构建成功完成
- [ ] 网站可以正常访问
- [ ] 夸奖生成功能正常工作
- [ ] 历史记录功能正常

## 🔧 常见问题排查

### 问题1：Secret引用错误
```
Environment Variable "OPENROUTER_API_KEY" references Secret "openrouter_api_key", which does not exist.
```

**解决方案：**
1. 这个错误表示配置文件引用了不存在的Vercel Secret
2. 已修复：项目现在使用标准环境变量配置
3. 请按照上述步骤在Dashboard中直接添加环境变量
4. 如果仍有问题，删除并重新创建环境变量

### 问题2：构建失败 - 环境变量未设置
```
Error: OPENROUTER_API_KEY 环境变量未设置
```

**解决方案：**
1. 确认在Vercel中正确添加了环境变量
2. 变量名拼写完全正确（区分大小写）
3. 重新触发部署

### 问题3：部署成功但功能不工作
**排查步骤：**
1. 检查Vercel Functions日志：项目 → Functions → 查看运行时日志
2. 确认API密钥有效且有足够额度
3. 测试环境变量是否正确传递

### 问题4：域名访问慢
**优化方案：**
- Vercel已配置香港节点（hkg1）以提升国内访问速度
- 考虑使用自定义域名

## 📊 部署后检查清单

### 功能测试
- [ ] 首页正常加载
- [ ] 可以输入夸奖对象
- [ ] 点击生成按钮有响应
- [ ] 能够正常生成夸奖内容
- [ ] 历史记录功能正常
- [ ] 复制功能正常工作

### 性能检查
- [ ] 页面加载速度正常（< 3秒）
- [ ] API响应速度正常（< 10秒）
- [ ] 移动端显示正常

### 安全检查
- [ ] 环境变量未在客户端暴露
- [ ] API密钥安全存储
- [ ] 没有敏感信息泄露

## 🎯 优化建议

### 性能优化
1. **启用Vercel Analytics**：了解网站访问情况
2. **配置缓存策略**：优化API响应速度
3. **启用压缩**：减少传输数据量

### 监控设置
1. **Vercel Monitoring**：监控函数执行情况
2. **错误追踪**：及时发现并解决问题
3. **日志管理**：保留关键操作日志

## 📞 技术支持

如果遇到部署问题，可以：
1. 查看[Vercel官方文档](https://vercel.com/docs)
2. 检查本项目的GitHub Issues
3. 联系项目维护者

---

**提示**：首次部署通常需要3-5分钟，请耐心等待构建完成。 