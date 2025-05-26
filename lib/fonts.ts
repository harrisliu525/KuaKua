// 使用系统字体替代Google Fonts以避免网络连接问题
export const fontConfig = {
  sans: {
    fontFamily: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
    variable: '--font-noto-sans-sc',
  },
  serif: {
    fontFamily: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    variable: '--font-noto-serif-sc',
  }
};

// 兼容性导出
export const NOTO_SANS_SC = {
  variable: '--font-noto-sans-sc',
  className: 'font-sans'
};

export const NOTO_SERIF_SC = {
  variable: '--font-noto-serif-sc', 
  className: 'font-serif'
};