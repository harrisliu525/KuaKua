import './globals.css';
import type { Metadata } from 'next';
import { NOTO_SANS_SC, NOTO_SERIF_SC } from '@/lib/fonts';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '小嘴儿抹了蜜 - 高情商夸奖生成器',
  description: '生成走心又高级的夸奖内容，让你的赞美更加专业、真诚',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${NOTO_SANS_SC.variable} ${NOTO_SERIF_SC.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}