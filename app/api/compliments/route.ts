export const dynamic = 'force-dynamic';

import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// 夸人提示词
const COMPLIMENT_PROMPT = `
## 📝 夸人大师 Prompt

**你的任务**

根据用户提供的  
- **对象**（必填）：被夸奖的人是谁？  
- **场景**（选填）：什么情境下夸？（如「项目复盘会」「第一次见面」……）  

参考下方"夸人方法库"，输出 **3 条** 走心又高级的夸奖，并为每条补充"夸奖逻辑"。

---

### 夸人方法库（4 类 27 法，供模型自由组合）

- **A. 结构类**  
  1. 观察-感受-展望三步法 2. 关键词+句型法 3. 对比+延伸法 4. 递进式夸法  
- **B. 视角/情境类**  
  5. 显微镜细节放大 6. 时间隧道对比 7. 第三人称借力 8. 镜像反馈共情 9. 未来预测  
  10. 群体升维 11. 场景引用 12. 坦诚承认不足 13. 引述他人肯定  
- **C. 观察/内容类**  
  14. 气质氛围 15. 态度习惯 16. 审美品味 17. 潜力视野 18. 能力高亮 19. 影响力外溢  
  20. 情绪稳定 21. 价值观认同  
- **D. 氛围/语气类**  
  22. 半步幽默 23. 行动奖励 24. 夸+感谢 25. 夸+请教 26. 夸+邀请合作 27. 夸完转赠  

---

### 输出格式（严格遵守）

**对象**：<填回用户输入的对象>  
**场景**：<若用户未提供请写"未指定">  

| # | 夸奖内容 | 使用的技法 | 夸奖逻辑与思路 |
|---|----------|-----------|----------------|
| 1 | <句子> | <技法编号+名称> | <为何选此技法、如何抓住细节、体现真诚…> |
| 2 | … | … | … |
| 3 | … | … | … |

- 夸奖要 **具体、真诚、不油腻，避免陈词滥调**。  
- 若场景未指定，默认选"日常轻松对话"并选用通用夸点。  
- 不要在表格外输出其它文本。
`;

// 从环境变量获取配置
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat-v3-0324';

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY 环境变量未设置');
}

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
});

// 解析大模型返回的表格格式
function parseComplimentTable(text: string) {
  try {
    const compliments = [];
    
    // 表格内容正则匹配
    const tableRegex = /\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/g;
    let match;
    
    while ((match = tableRegex.exec(text)) !== null) {
      // 确保只匹配数据行，忽略表头
      if (match[1] && !isNaN(Number(match[1]))) {
        compliments.push({
          content: match[2].trim(),
          technique: match[3].trim(),
          logic: match[4].trim(),
        });
      }
    }
    
    return compliments;
  } catch (error) {
    console.error('Error parsing compliment table:', error);
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { target, scenario = '未指定' } = await request.json();
    
    if (!target) {
      return NextResponse.json(
        { error: 'Target is required' },
        { status: 400 }
      );
    }

    const prompt = `${COMPLIMENT_PROMPT}\n\n对象：${target}\n场景：${scenario}`;
    
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
    });
    
    const content = completion.choices[0].message.content || '';
    const compliments = parseComplimentTable(content);
    
    return NextResponse.json({ compliments });
  } catch (error) {
    console.error('Error generating compliments:', error);
    return NextResponse.json(
      { error: 'Failed to generate compliments' },
      { status: 500 }
    );
  }
}