import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';

export default function DifyChatbot() {
  useEffect(() => {
    if (!siteConfig('DIFY_CHATBOT_ENABLED')) {
      return;
    }

    // 检查 token 是否存在
    const token = siteConfig('DIFY_CHATBOT_TOKEN');
    if (!token) {
      console.error('DifyChatbot token is missing or invalid');
      return;
    }

    // 配置 DifyChatbot
    window.difyChatbotConfig = {
      token: token, // 确保 token 正确
      containerProps: {
        style: {
          bottom: '20px',
          right: '40px',
          backgroundColor: '#155EEF',
        },
      },
    };

    // 动态加载 DifyChatbot 脚本
    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js'; // 使用官方提供的 URL
    script.id = token;
    script.defer = true;
    document.body.appendChild(script);

    // 添加样式
    const style = document.createElement('style');
    style.innerHTML = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // 清理脚本
      const existingScript = document.getElementById(token);
      if (existingScript) {
        existingScript.parentNode.removeChild(existingScript);
      }

      // 清理样式
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []); // 依赖数组为空，确保脚本仅加载一次

  return null;
}
