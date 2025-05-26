export function Footer() {
  return (
    <footer className="py-6 md:py-8 border-t border-honey-accent/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-honey-text/80 text-sm">
              小嘴儿抹了蜜 | 高情商夸奖生成器
            </p>
          </div>
          <div className="text-honey-text/60 text-xs">
            <p>基于 DeepSeek V3 模型提供技术支持</p>
          </div>
        </div>
      </div>
    </footer>
  );
}