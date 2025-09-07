/**
 * Slope Unblocked 安全配置文件
 * 包含安全头部、CSP策略、性能优化等设置
 */

// 内容安全策略配置
const CSP_CONFIG = {
  // 默认策略 - 最严格
  defaultSrc: ["'self'"],
  
  // 脚本策略
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // 用于内联JavaScript (逐步淘汰)
    "https://slopeunblocked.bitbucket.io", // 游戏源
    "https://www.googletagmanager.com", // Google Tag Manager (可选)
    "https://www.google-analytics.com" // Google Analytics (可选)
  ],
  
  // 样式策略
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // 用于内联CSS
    "https://cdn.tailwindcss.com" // Tailwind CSS (可选)
  ],
  
  // 图片策略
  imgSrc: [
    "'self'",
    "data:", // 用于内联图片
    "https:", // 允许HTTPS图片
    "https://slopeunblocked.bitbucket.io" // 游戏图片源
  ],
  
  // 字体策略
  fontSrc: [
    "'self'",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com"
  ],
  
  // 连接策略
  connectSrc: [
    "'self'",
    "https://www.google-analytics.com", // Google Analytics
    "https://slopeunblocked.bitbucket.io" // 游戏API
  ],
  
  // iframe策略
  frameSrc: [
    "https://slopeunblocked.bitbucket.io" // 游戏iframe源
  ],
  
  // 媒体策略
  mediaSrc: ["'self'"],
  
  // 对象策略
  objectSrc: ["'none'"], // 禁止object和embed标签
  
  // worker策略
  workerSrc: ["'self'"],
  
  // manifest策略
  manifestSrc: ["'self'"]
};

// 安全头部配置
const SECURITY_HEADERS = {
  // 内容类型选项
  'X-Content-Type-Options': 'nosniff',
  
  // X-Frame-Options
  'X-Frame-Options': 'DENY',
  
  // 引用策略
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // X-XSS-Protection (已废弃，但提供向后兼容)
  'X-XSS-Protection': '1; mode=block',
  
  // 严格传输安全 (HSTS) - 仅HTTPS环境
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // 权限策略
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  
  // 内容安全策略
  'Content-Security-Policy': buildCSP(CSP_CONFIG),
  
  // 跨域策略
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin'
};

// 性能优化配置
const PERFORMANCE_CONFIG = {
  // 资源预加载
  preloads: [
    {
      href: 'https://slopeunblocked.bitbucket.io/',
      as: 'document',
      type: 'text/html'
    }
  ],
  
  // DNS预解析
  dnsPrefetches: [
    'https://slopeunblocked.bitbucket.io',
    'https://www.google-analytics.com',
    'https://fonts.googleapis.com'
  ],
  
  // 预连接
  preconnects: [
    {
      href: 'https://slopeunblocked.bitbucket.io',
      crossorigin: true
    },
    {
      href: 'https://fonts.googleapis.com',
      crossorigin: true
    }
  ],
  
  // 资源提示
  resourceHints: {
    // 关键CSS
    criticalCSS: true,
    
    // 字体预加载
    fontPreload: true,
    
    // 图片懒加载
    lazyLoadImages: true,
    
    // 延迟加载非关键JavaScript
    deferJS: true
  },
  
  // 缓存策略
  caching: {
    // 静态资源缓存时间
    staticAssets: '1y',
    
    // HTML缓存时间
    html: '1h',
    
    // API响应缓存时间
    api: '5m'
  }
};

// 构建CSP字符串
function buildCSP(config) {
  const directives = [];
  
  for (const [key, values] of Object.entries(config)) {
    if (values && values.length > 0) {
      const directive = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      directives.push(`${directive} ${values.join(' ')}`);
    }
  }
  
  return directives.join('; ');
}

// 性能监控配置
const MONITORING_CONFIG = {
  // 性能指标收集
  performanceMetrics: {
    // 首次内容绘制 (FCP)
    firstContentfulPaint: true,
    
    // 最大内容绘制 (LCP)
    largestContentfulPaint: true,
    
    // 首次输入延迟 (FID)
    firstInputDelay: true,
    
    // 累积布局偏移 (CLS)
    cumulativeLayoutShift: true,
    
    // 时间到第一字节 (TTFB)
    timeToFirstByte: true
  },
  
  // 错误监控
  errorTracking: {
    // JavaScript错误
    jsErrors: true,
    
    // 资源加载错误
    resourceErrors: true,
    
    // Promise拒绝
    unhandledRejections: true
  },
  
  // 用户行为监控
  userBehavior: {
    // 页面停留时间
    pageDwellTime: true,
    
    // 点击事件
    clickEvents: true,
    
    // 滚动行为
    scrollBehavior: true
  }
};

// 输入验证配置
const INPUT_VALIDATION = {
  // 游戏输入验证
  gameInput: {
    // 键盘输入验证
    keyboard: {
      allowedKeys: ['ArrowLeft', 'ArrowRight', 'Space', 'Escape'],
      maxKeyPresses: 10 // 每秒最大按键次数
    },
    
    // 触摸输入验证
    touch: {
      maxTouchPoints: 2,
      minTouchDuration: 50, // 最小触摸时间 (ms)
      maxTouchDuration: 5000 // 最大触摸时间 (ms)
    }
  },
  
  // URL验证
  urlValidation: {
    // 允许的iframe源
    allowedIframeOrigins: [
      'https://slopeunblocked.bitbucket.io'
    ],
    
    // 重定向验证
    redirectValidation: true
  }
};

// 机器人检测和防护
const BOT_PROTECTION = {
  // 速率限制
  rateLimiting: {
    // 页面加载频率限制
    pageLoad: {
      windowMs: 60 * 1000, // 1分钟
      max: 30 // 每分钟最多30次
    },
    
    // 游戏启动频率限制
    gameStart: {
      windowMs: 60 * 1000, // 1分钟
      max: 20 // 每分钟最多20次
    },
    
    // API请求频率限制
    apiRequests: {
      windowMs: 60 * 1000, // 1分钟
      max: 60 // 每分钟最多60次
    }
  },
  
  // 行为分析
  behaviorAnalysis: {
    // 检测异常鼠标移动
    mouseMovement: true,
    
    // 检测异常键盘输入
    keyboardPattern: true,
    
    // 检测自动化工具
    automationDetection: true
  }
};

// 数据保护配置
const DATA_PROTECTION = {
  // 本地存储加密
  localStorageEncryption: {
    enabled: true,
    key: 'slope-unblocked-encryption-key'
  },
  
  // 会话管理
  sessionManagement: {
    // 会话超时时间
    timeout: 30 * 60 * 1000, // 30分钟
    
    // 自动清理过期会话
    autoCleanup: true
  },
  
  // 数据最小化
  dataMinimization: {
    // 只收集必要的分析数据
    collectOnlyEssential: true,
    
    // 定期清理旧数据
    regularCleanup: true,
    
    // 匿名化处理
    anonymization: true
  }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CSP_CONFIG,
    SECURITY_HEADERS,
    PERFORMANCE_CONFIG,
    MONITORING_CONFIG,
    INPUT_VALIDATION,
    BOT_PROTECTION,
    DATA_PROTECTION,
    buildCSP
  };
}

// 应用安全头部 (客户端)
function applySecurityHeaders() {
  // 创建meta标签添加CSP
  const metaCSP = document.createElement('meta');
  metaCSP.httpEquiv = 'Content-Security-Policy';
  metaCSP.content = buildCSP(CSP_CONFIG);
  document.head.appendChild(metaCSP);
  
  // 添加其他安全meta标签
  const securityMetas = [
    { name: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' }
  ];
  
  securityMetas.forEach(meta => {
    const element = document.createElement('meta');
    element.httpEquiv = meta.name;
    element.content = meta.content;
    document.head.appendChild(element);
  });
}

// 输入验证函数
function validateGameInput(input, type) {
  const validation = INPUT_VALIDATION.gameInput[type];
  
  if (type === 'keyboard') {
    // 验证按键
    if (!validation.allowedKeys.includes(input.key)) {
      return false;
    }
    
    // 速率限制检查
    const now = Date.now();
    if (!window.keyPressTimes) {
      window.keyPressTimes = [];
    }
    
    // 清理旧的按键记录
    window.keyPressTimes = window.keyPressTimes.filter(time => now - time < 1000);
    
    // 检查是否超过限制
    if (window.keyPressTimes.length >= validation.maxKeyPresses) {
      return false;
    }
    
    window.keyPressTimes.push(now);
    
  } else if (type === 'touch') {
    // 触摸输入验证逻辑
    // 这里可以添加更复杂的触摸验证
  }
  
  return true;
}

// 机器人检测函数
function detectBotBehavior(event) {
  const { rateLimiting, behaviorAnalysis } = BOT_PROTECTION;
  
  // 速率限制检查
  const now = Date.now();
  if (!window.userActions) {
    window.userActions = [];
  }
  
  // 清理旧的操作记录
  window.userActions = window.userActions.filter(action => now - action.time < 60000);
  
  // 检查速率限制
  const recentActions = window.userActions.filter(action => now - action.time < rateLimiting.pageLoad.windowMs);
  if (recentActions.length >= rateLimiting.pageLoad.max) {
    console.warn('Possible bot detected: Rate limit exceeded');
    return true;
  }
  
  // 行为分析
  if (behaviorAnalysis.mouseMovement) {
    // 检查鼠标移动模式
    const mouseMovements = window.userActions.filter(action => action.type === 'mousemove');
    if (mouseMovements.length > 100) { // 异常多的鼠标移动
      const linearMovements = analyzeMouseMovement(mouseMovements);
      if (linearMovements > 0.8) { // 80%以上是直线移动
        console.warn('Possible bot detected: Linear mouse movement');
        return true;
      }
    }
  }
  
  // 记录用户行为
  window.userActions.push({
    type: event.type,
    time: now,
    coordinates: event.type.includes('mouse') ? { x: event.clientX, y: event.clientY } : null
  });
  
  return false;
}

// 鼠标移动分析
function analyzeMouseMovement(movements) {
  if (movements.length < 10) return 0;
  
  let linearMovements = 0;
  
  for (let i = 1; i < movements.length; i++) {
    const prev = movements[i - 1];
    const curr = movements[i];
    
    if (prev.coordinates && curr.coordinates) {
      const deltaX = curr.coordinates.x - prev.coordinates.x;
      const deltaY = curr.coordinates.y - prev.coordinates.y;
      
      // 检查是否为直线移动（斜率一致）
      if (Math.abs(deltaX) > 0 && Math.abs(deltaY) > 0) {
        const slope = deltaY / deltaX;
        if (Math.abs(slope) < 0.1 || Math.abs(slope) > 10) {
          linearMovements++;
        }
      }
    }
  }
  
  return linearMovements / movements.length;
}

// 数据加密函数
function encryptData(data, key) {
  // 简单的数据加密实现
  // 在生产环境中应该使用更强的加密算法
  try {
    const encrypted = btoa(JSON.stringify(data) + key);
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
}

function decryptData(encryptedData, key) {
  try {
    const decrypted = atob(encryptedData);
    const data = decrypted.replace(key, '');
    return JSON.parse(data);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

// 性能监控函数
function monitorPerformance() {
  if (!window.performance) return;
  
  const { performanceMetrics } = MONITORING_CONFIG;
  
  // 首次内容绘制 (FCP)
  if (performanceMetrics.firstContentfulPaint) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
          // 发送到分析服务
          sendAnalytics('performance', {
            metric: 'fcp',
            value: entry.startTime,
            timestamp: Date.now()
          });
        }
      }
    }).observe({ entryTypes: ['paint'] });
  }
  
  // 最大内容绘制 (LCP)
  if (performanceMetrics.largestContentfulPaint) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
        sendAnalytics('performance', {
          metric: 'lcp',
          value: entry.startTime,
          timestamp: Date.now()
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }
}

// 错误监控函数
function monitorErrors() {
  const { errorTracking } = MONITORING_CONFIG;
  
  // JavaScript错误
  if (errorTracking.jsErrors) {
    window.addEventListener('error', (event) => {
      console.error('JavaScript Error:', event.error);
      sendAnalytics('error', {
        type: 'javascript',
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: Date.now()
      });
    });
  }
  
  // 未处理的Promise拒绝
  if (errorTracking.unhandledRejections) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      sendAnalytics('error', {
        type: 'promise_rejection',
        message: event.reason.toString(),
        timestamp: Date.now()
      });
    });
  }
  
  // 资源加载错误
  if (errorTracking.resourceErrors) {
    window.addEventListener('error', (event) => {
      if (event.target && (event.target.src || event.target.href)) {
        console.error('Resource Error:', event.target);
        sendAnalytics('error', {
          type: 'resource',
          resource: event.target.src || event.target.href,
          tagName: event.target.tagName,
          timestamp: Date.now()
        });
      }
    }, true);
  }
}

// 分析数据发送函数
function sendAnalytics(type, data) {
  // 这里可以实现发送到分析服务的逻辑
  // 出于隐私考虑，可以匿名化处理数据
  const anonymizedData = anonymizeData(data);
  
  // 本地存储或发送到远程服务
  if (typeof gtag !== 'undefined') {
    gtag('event', type, anonymizedData);
  }
  
  // 本地存储备份
  if (DATA_PROTECTION.dataMinimization.collectOnlyEssential) {
    saveAnalyticsData(anonymizedData);
  }
}

// 数据匿名化函数
function anonymizeData(data) {
  // 移除或混淆敏感信息
  const anonymized = { ...data };
  
  // 移除具体时间戳，只保留相对时间
  if (anonymized.timestamp) {
    anonymized.relativeTime = Math.floor(anonymized.timestamp / 1000);
    delete anonymized.timestamp;
  }
  
  // 移除具体的错误堆栈信息
  if (anonymized.stack) {
    delete anonymized.stack;
  }
  
  // 移除具体的URL，只保留域名
  if (anonymized.url) {
    try {
      const url = new URL(anonymized.url);
      anonymized.domain = url.hostname;
      delete anonymized.url;
    } catch (e) {
      delete anonymized.url;
    }
  }
  
  return anonymized;
}

// 本地存储分析数据
function saveAnalyticsData(data) {
  try {
    let analyticsData = localStorage.getItem('analytics_data');
    analyticsData = analyticsData ? JSON.parse(analyticsData) : [];
    
    analyticsData.push(data);
    
    // 限制存储的数据量
    if (analyticsData.length > 100) {
      analyticsData = analyticsData.slice(-100);
    }
    
    localStorage.setItem('analytics_data', JSON.stringify(analyticsData));
  } catch (error) {
    console.error('Failed to save analytics data:', error);
  }
}

// 初始化安全功能
function initializeSecurity() {
  // 应用安全头部
  applySecurityHeaders();
  
  // 启动性能监控
  monitorPerformance();
  
  // 启动错误监控
  monitorErrors();
  
  // 添加输入验证
  document.addEventListener('keydown', (event) => {
    if (!validateGameInput(event, 'keyboard')) {
      event.preventDefault();
      console.warn('Invalid keyboard input blocked');
    }
  });
  
  // 添加机器人检测
  document.addEventListener('mousemove', (event) => {
    if (detectBotBehavior(event)) {
      console.warn('Bot behavior detected');
      // 可以采取进一步措施，如验证码挑战
    }
  });
  
  console.log('Security features initialized');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSecurity);
} else {
  initializeSecurity();
}