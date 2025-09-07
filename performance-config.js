/**
 * Slope Unblocked 性能优化配置
 * 包含性能监控、优化策略、缓存配置等
 */

// 性能目标配置
const PERFORMANCE_TARGETS = {
  // 核心Web指标 (Core Web Vitals)
  firstContentfulPaint: 1500, // FCP < 1.5s (Good)
  largestContentfulPaint: 2500, // LCP < 2.5s (Good)
  firstInputDelay: 100, // FID < 100ms (Good)
  cumulativeLayoutShift: 0.1, // CLS < 0.1 (Good)
  timeToFirstByte: 800, // TTFB < 800ms (Good)
  
  // 自定义性能指标
  gameLoadTime: 3000, // 游戏加载时间 < 3s
  interactiveTime: 2000, // 可交互时间 < 2s
  resourceLoadTime: 5000 // 资源加载时间 < 5s
};

// 资源优先级配置
const RESOURCE_PRIORITIES = {
  // 最高优先级 - 关键渲染路径
  critical: [
    'index.html',
    'manifest.json',
    'sw.js',
    'security-config.js',
    'performance-config.js'
  ],
  
  // 高优先级 - 核心样式和功能
  high: [
    'styles.css',
    'game-iframe',
    'fonts.googleapis.com',
    'icons/icon-192x192.png'
  ],
  
  // 中等优先级 - 增强功能
  medium: [
    'analytics.js',
    'social-sharing.js',
    'icons/icon-512x512.png'
  ],
  
  // 低优先级 - 非关键资源
  low: [
    'generate-icons.html',
    'README.md',
    'non-critical-images'
  ]
};

// 延迟加载配置
const LAZY_LOADING_CONFIG = {
  // 图片延迟加载
  images: {
    enabled: true,
    threshold: 0.1, // 10%可见时开始加载
    rootMargin: '50px', // 提前50px开始加载
    placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
  },
  
  // iframe延迟加载
  iframes: {
    enabled: true,
    threshold: 0.3, // 30%可见时开始加载
    rootMargin: '100px'
  },
  
  // JavaScript延迟加载
  scripts: {
    enabled: true,
    loadDelay: 1000, // 页面加载后1秒开始加载
    async: true,
    defer: true
  },
  
  // CSS延迟加载
  styles: {
    enabled: true,
    criticalCSS: true, // 内联关键CSS
    loadDelay: 0
  }
};

// 缓存策略配置
const CACHE_STRATEGIES = {
  // Service Worker缓存
  serviceWorker: {
    // 缓存版本
    version: 'v2.0.0',
    
    // 缓存名称
    cacheNames: {
      core: 'slope-core-v2.0.0',
      game: 'slope-game-v2.0.0',
      assets: 'slope-assets-v2.0.0'
    },
    
    // 缓存策略
    strategies: {
      // 网络优先 - 对实时性要求高的资源
      networkFirst: {
        patterns: ['/api/', '/game/', '.html$'],
        timeout: 3000, // 3秒超时后使用缓存
        maxAge: 5 * 60 * 1000 // 5分钟缓存
      },
      
      // 缓存优先 - 对静态资源
      cacheFirst: {
        patterns: ['.css$', '.js$', '.png$', '.jpg$', '.svg$'],
        maxAge: 24 * 60 * 60 * 1000, // 24小时
        maxEntries: 50 // 最多缓存50个
      },
      
      // Stale-While-Revalidate - 平衡性能和新鲜度
      staleWhileRevalidate: {
        patterns: ['/icons/', '/manifest.json'],
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
        revalidateTimeout: 1000 // 1秒内重新验证
      }
    }
  },
  
  // HTTP缓存头部
  httpCache: {
    // 静态资源
    staticAssets: {
      'Cache-Control': 'public, max-age=31536000, immutable', // 1年
      'ETag': 'auto',
      'Last-Modified': 'auto'
    },
    
    // HTML页面
    html: {
      'Cache-Control': 'public, max-age=3600, must-revalidate', // 1小时
      'ETag': 'auto'
    },
    
    // API响应
    api: {
      'Cache-Control': 'private, max-age=300, must-revalidate', // 5分钟
      'ETag': 'auto'
    }
  }
};

// 资源优化配置
const RESOURCE_OPTIMIZATION = {
  // 图片优化
  images: {
    // 格式优先级
    formatPriority: ['webp', 'avif', 'png', 'jpg'],
    
    // 压缩质量
    quality: {
      webp: 85,
      avif: 80,
      jpg: 75,
      png: 90
    },
    
    // 响应式图片
    responsive: {
      enabled: true,
      breakpoints: [320, 480, 768, 1024, 1440, 1920],
      sizes: 'auto'
    },
    
    // 懒加载
    lazyLoading: {
      enabled: true,
      threshold: 0.1,
      rootMargin: '50px'
    }
  },
  
  // 字体优化
  fonts: {
    // 字体显示策略
    display: 'swap',
    
    // 预加载关键字体
    preload: [
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
        as: 'style'
      }
    ],
    
    // 字体子集化
    subsetting: {
      enabled: true,
      characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.!?'
    }
  },
  
  // CSS优化
  styles: {
    // 关键CSS内联
    criticalCSS: {
      enabled: true,
      extract: true,
      inline: true
    },
    
    // CSS压缩
    minification: {
      enabled: true,
      removeComments: true,
      removeWhitespace: true
    },
    
    // 未使用CSS移除
    unusedCSSRemoval: {
      enabled: true,
      safelist: ['.cyber-*', '.neon-*', '.game-*']
    }
  },
  
  // JavaScript优化
  scripts: {
    // 代码分割
    codeSplitting: {
      enabled: true,
      chunks: {
        vendor: ['analytics', 'social'],
        game: ['game-controls', 'fullscreen'],
        ui: ['theme-toggle', 'mobile-menu']
      }
    },
    
    // 压缩
    minification: {
      enabled: true,
      removeComments: true,
      removeConsole: true,
      mangle: true
    },
    
    // Tree Shaking
    treeShaking: {
      enabled: true,
      sideEffects: false
    }
  }
};

// 网络优化配置
const NETWORK_OPTIMIZATION = {
  // 连接优化
  connection: {
    // HTTP/2服务器推送
    serverPush: {
      enabled: true,
      resources: [
        '/css/critical.css',
        '/js/performance.js',
        '/icons/icon-192x192.png'
      ]
    },
    
    // 预加载策略
    preloading: {
      // DNS预解析
      dnsPrefetch: [
        'https://slopeunblocked.bitbucket.io',
        'https://fonts.googleapis.com',
        'https://www.google-analytics.com'
      ],
      
      // 预连接
      preconnect: [
        {
          href: 'https://slopeunblocked.bitbucket.io',
          crossorigin: true
        }
      ],
      
      // 预加载
      preload: [
        {
          href: '/css/critical.css',
          as: 'style'
        },
        {
          href: '/js/performance.js',
          as: 'script'
        }
      ]
    }
  },
  
  // 压缩配置
  compression: {
    // Gzip压缩
    gzip: {
      enabled: true,
      level: 6,
      threshold: 1024 // 1KB以上文件启用压缩
    },
    
    // Brotli压缩
    brotli: {
      enabled: true,
      level: 4,
      threshold: 1024
    }
  },
  
  // CDN配置
  cdn: {
    // 静态资源CDN
    staticAssets: {
      enabled: false, // 需要时启用
      domains: ['https://cdn.example.com'],
      resources: ['.css$', '.js$', '.png$', '.jpg$', '.svg$']
    }
  }
};

// 渲染优化配置
const RENDERING_OPTIMIZATION = {
  // 关键渲染路径优化
  criticalRenderingPath: {
    // 关键资源内联
    inlineCriticalResources: true,
    
    // 异步加载非关键CSS
    asyncCSS: true,
    
    // 延迟加载JavaScript
    deferJS: true,
    
    // 优化CSS选择器
    optimizeCSSSelectors: true
  },
  
  // 布局优化
  layout: {
    // 避免布局抖动
    preventLayoutThrashing: true,
    
    // 批量DOM操作
    batchDOMOperations: true,
    
    // 使用CSS transform代替位置属性
    useCSSTransforms: true
  },
  
  // 动画优化
  animations: {
    // 使用requestAnimationFrame
    useRAF: true,
    
    // GPU加速
    gpuAcceleration: true,
    
    // 减少重绘和重排
    minimizeRepaints: true
  }
};

// 内存管理配置
const MEMORY_MANAGEMENT = {
  // 垃圾回收优化
  garbageCollection: {
    // 定期清理
    periodicCleanup: true,
    cleanupInterval: 30000, // 30秒
    
    // 内存阈值
    thresholds: {
      warning: 50 * 1024 * 1024, // 50MB
      critical: 100 * 1024 * 1024 // 100MB
    }
  },
  
  // 资源清理
  resourceCleanup: {
    // 清理未使用的资源
    unusedResources: true,
    
    // 清理过期缓存
    expiredCache: true,
    
    // 清理事件监听器
    eventListeners: true
  },
  
  // 内存池
  objectPooling: {
    enabled: true,
    pools: {
      particles: 1000,
      animations: 100,
      domElements: 50
    }
  }
};

// 性能监控和报告
const PERFORMANCE_MONITORING = {
  // 实时监控
  realTimeMonitoring: {
    enabled: true,
    interval: 1000, // 1秒
    
    // 监控指标
    metrics: [
      'fps',
      'memoryUsage',
      'cpuUsage',
      'networkLatency',
      'renderTime'
    ]
  },
  
  // 性能报告
  reporting: {
    // 自动报告
    autoReport: true,
    
    // 报告阈值
    thresholds: {
      fps: 30, // 低于30fps报告
      memoryUsage: 80 * 1024 * 1024, // 80MB
      renderTime: 16 // 超过16ms报告
    },
    
    // 报告频率
    frequency: 60000 // 每分钟报告一次
  },
  
  // 性能分析
  profiling: {
    // 自动性能分析
    autoProfile: true,
    
    // 分析触发条件
    triggers: {
      lowFPS: true,
      highMemory: true,
      slowRender: true
    }
  }
};

// 性能优化工具函数
const PerformanceUtils = {
  // FPS监控
  fpsCounter: {
    lastTime: 0,
    frameCount: 0,
    fps: 0,
    
    update() {
      const now = performance.now();
      this.frameCount++;
      
      if (now >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
        this.frameCount = 0;
        this.lastTime = now;
        
        // 检查是否低于目标FPS
        if (this.fps < 30) {
          console.warn(`Low FPS detected: ${this.fps}`);
          this.onLowFPS(this.fps);
        }
      }
    },
    
    onLowFPS(fps) {
      // 触发性能优化措施
      this.optimizeForLowFPS();
    },
    
    optimizeForLowFPS() {
      // 降低动画质量
      document.body.classList.add('low-performance-mode');
      
      // 减少粒子效果
      if (window.particleSystem) {
        window.particleSystem.reduceQuality();
      }
      
      // 禁用非关键动画
      document.documentElement.style.setProperty('--animations-enabled', 'false');
    }
  },
  
  // 内存监控
  memoryMonitor: {
    lastMemoryUsage: 0,
    
    check() {
      if (performance.memory) {
        const memoryUsage = performance.memory.usedJSHeapSize;
        const memoryLimit = performance.memory.jsHeapSizeLimit;
        const usagePercentage = (memoryUsage / memoryLimit) * 100;
        
        if (usagePercentage > 80) {
          console.warn(`High memory usage: ${usagePercentage.toFixed(2)}%`);
          this.onHighMemoryUsage(memoryUsage);
        }
        
        this.lastMemoryUsage = memoryUsage;
        return memoryUsage;
      }
      return 0;
    },
    
    onHighMemoryUsage(usage) {
      // 触发内存清理
      this.cleanupMemory();
    },
    
    cleanupMemory() {
      // 清理未使用的对象
      if (window.gc) {
        window.gc();
      }
      
      // 清理缓存
      if (window.caches) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.open(cacheName).then(cache => {
              cache.keys().then(requests => {
                if (requests.length > 50) {
                  // 清理最旧的缓存项
                  cache.delete(requests[0]);
                }
              });
            });
          });
        });
      }
    }
  },
  
  // 网络延迟监控
  networkMonitor: {
    latencies: [],
    
    measureLatency(url) {
      const startTime = performance.now();
      
      return fetch(url, { method: 'HEAD', cache: 'no-cache' })
        .then(response => {
          const latency = performance.now() - startTime;
          this.latencies.push(latency);
          
          // 保持最近10次测量
          if (this.latencies.length > 10) {
            this.latencies.shift();
          }
          
          const avgLatency = this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
          
          if (avgLatency > 1000) {
            console.warn(`High network latency: ${avgLatency.toFixed(2)}ms`);
            this.onHighLatency(avgLatency);
          }
          
          return latency;
        })
        .catch(error => {
          console.error('Network measurement failed:', error);
          return -1;
        });
    },
    
    onHighLatency(latency) {
      // 调整资源加载策略
      document.body.classList.add('slow-network-mode');
      
      // 启用更激进的缓存
      if (window.serviceWorker) {
        navigator.serviceWorker.controller?.postMessage({
          type: 'ENABLE_AGGRESSIVE_CACHING'
        });
      }
    }
  }
};

// 自动性能优化
function applyAutomaticOptimizations() {
  // 根据设备性能调整
  const deviceInfo = detectDevicePerformance();
  
  if (deviceInfo.isLowEndDevice) {
    console.log('Low-end device detected, applying optimizations');
    
    // 禁用非关键动画
    document.documentElement.style.setProperty('--animations-enabled', 'false');
    
    // 降低图片质量
    document.body.classList.add('low-quality-images');
    
    // 减少粒子效果
    if (window.particleSystem) {
      window.particleSystem.setQuality('low');
    }
  }
  
  // 根据网络状况调整
  if (navigator.connection) {
    const connection = navigator.connection;
    
    if (connection.effectiveType === '2g' || connection.saveData) {
      console.log('Slow network detected, applying optimizations');
      
      // 禁用大资源加载
      document.body.classList.add('data-saver-mode');
      
      // 启用更激进的缓存
      if (window.serviceWorker) {
        navigator.serviceWorker.controller?.postMessage({
          type: 'ENABLE_DATA_SAVER_MODE'
        });
      }
    }
  }
}

// 设备性能检测
function detectDevicePerformance() {
  const memory = navigator.deviceMemory || 4; // 默认4GB
  const cores = navigator.hardwareConcurrency || 2; // 默认2核
  
  return {
    memoryGB: memory,
    cpuCores: cores,
    isLowEndDevice: memory < 4 || cores < 4,
    isHighEndDevice: memory >= 8 && cores >= 8
  };
}

// 启动性能监控
function startPerformanceMonitoring() {
  const { realTimeMonitoring } = PERFORMANCE_MONITORING;
  
  if (realTimeMonitoring.enabled) {
    setInterval(() => {
      // 更新FPS计数器
      PerformanceUtils.fpsCounter.update();
      
      // 检查内存使用
      PerformanceUtils.memoryMonitor.check();
      
      // 其他性能指标
      if (window.performance && window.performance.now) {
        const now = performance.now();
        
        // 检查长任务
        if (window.PerformanceObserver) {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.duration > 50) { // 超过50ms的任务
                console.warn(`Long task detected: ${entry.duration}ms`);
              }
            }
          }).observe({ entryTypes: ['longtask'] });
        }
      }
    }, realTimeMonitoring.interval);
  }
}

// 性能报告生成
function generatePerformanceReport() {
  const report = {
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    devicePerformance: detectDevicePerformance(),
    
    // 核心Web指标
    coreWebVitals: {
      fcp: getFCP(),
      lcp: getLCP(),
      fid: getFID(),
      cls: getCLS()
    },
    
    // 自定义指标
    customMetrics: {
      gameLoadTime: window.gameLoadTime,
      interactiveTime: window.interactiveTime,
      resourceLoadTime: window.resourceLoadTime
    },
    
    // 资源加载统计
    resourceStats: getResourceStats(),
    
    // 内存使用
    memoryUsage: PerformanceUtils.memoryMonitor.lastMemoryUsage
  };
  
  return report;
}

// 获取核心Web指标
function getFCP() {
  return PerformanceObserver.supportedEntryTypes.includes('paint') 
    ? getPerformanceEntry('first-contentful-paint')
    : null;
}

function getLCP() {
  return PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')
    ? getPerformanceEntry('largest-contentful-paint')
    : null;
}

function getFID() {
  return PerformanceObserver.supportedEntryTypes.includes('first-input')
    ? getPerformanceEntry('first-input')
    : null;
}

function getCLS() {
  return PerformanceObserver.supportedEntryTypes.includes('layout-shift')
    ? getPerformanceEntry('layout-shift')
    : null;
}

function getPerformanceEntry(entryType) {
  const entries = performance.getEntriesByType(entryType);
  return entries.length > 0 ? entries[entries.length - 1] : null;
}

// 获取资源加载统计
function getResourceStats() {
  const resources = performance.getEntriesByType('resource');
  const stats = {
    total: resources.length,
    byType: {},
    timing: {
      dns: [],
      tcp: [],
      request: [],
      response: []
    }
  };
  
  resources.forEach(resource => {
    const type = resource.initiatorType || 'other';
    stats.byType[type] = (stats.byType[type] || 0) + 1;
    
    // 收集时序数据
    if (resource.domainLookupEnd > resource.domainLookupStart) {
      stats.timing.dns.push(resource.domainLookupEnd - resource.domainLookupStart);
    }
    if (resource.connectEnd > resource.connectStart) {
      stats.timing.tcp.push(resource.connectEnd - resource.connectStart);
    }
    if (resource.responseStart > resource.requestStart) {
      stats.timing.request.push(resource.responseStart - resource.requestStart);
    }
    if (resource.responseEnd > resource.responseStart) {
      stats.timing.response.push(resource.responseEnd - resource.responseStart);
    }
  });
  
  return stats;
}

// 初始化性能优化
function initializePerformanceOptimization() {
  console.log('Initializing performance optimizations...');
  
  // 应用自动优化
  applyAutomaticOptimizations();
  
  // 启动性能监控
  startPerformanceMonitoring();
  
  // 测量关键性能指标
  measureCriticalMetrics();
  
  console.log('Performance optimizations initialized');
}

// 测量关键性能指标
function measureCriticalMetrics() {
  // 游戏加载时间
  const gameLoadStart = performance.now();
  
  // 监听游戏加载完成
  window.addEventListener('game-loaded', () => {
    window.gameLoadTime = performance.now() - gameLoadStart;
    console.log(`Game load time: ${window.gameLoadTime.toFixed(2)}ms`);
  });
  
  // 可交互时间
  const interactiveStart = performance.now();
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.interactiveTime = performance.now() - interactiveStart;
      console.log(`Interactive time: ${window.interactiveTime.toFixed(2)}ms`);
    }, 0);
  });
  
  // 资源加载时间
  const resourceLoadStart = performance.now();
  
  window.addEventListener('load', () => {
    window.resourceLoadTime = performance.now() - resourceLoadStart;
    console.log(`Resource load time: ${window.resourceLoadTime.toFixed(2)}ms`);
  });
}

// 性能优化工具函数
const PerformanceOptimizer = {
  // 防抖函数
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // 节流函数
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // 批量DOM操作
  batchDOMOperations(operations) {
    // 使用DocumentFragment进行批量操作
    const fragment = document.createDocumentFragment();
    
    operations.forEach(op => {
      if (typeof op === 'function') {
        op(fragment);
      }
    });
    
    // 一次性添加到DOM
    document.body.appendChild(fragment);
  },
  
  // 虚拟滚动
  virtualScroll(container, items, itemHeight, renderItem) {
    const visibleCount = Math.ceil(container.clientHeight / itemHeight);
    const buffer = 5;
    
    let startIndex = 0;
    let endIndex = visibleCount + buffer;
    
    function render() {
      const fragment = document.createDocumentFragment();
      
      for (let i = startIndex; i < endIndex && i < items.length; i++) {
        const item = renderItem(items[i], i);
        fragment.appendChild(item);
      }
      
      container.innerHTML = '';
      container.appendChild(fragment);
    }
    
    container.addEventListener('scroll', throttle(() => {
      const scrollTop = container.scrollTop;
      startIndex = Math.floor(scrollTop / itemHeight) - buffer;
      endIndex = startIndex + visibleCount + buffer * 2;
      
      startIndex = Math.max(0, startIndex);
      endIndex = Math.min(items.length, endIndex);
      
      render();
    }, 16));
    
    render();
  },
  
  // 对象池
  objectPool(createFn, resetFn, maxSize = 100) {
    const pool = [];
    let active = 0;
    
    return {
      acquire() {
        if (pool.length > 0) {
          active++;
          return pool.pop();
        }
        
        if (active < maxSize) {
          active++;
          return createFn();
        }
        
        return null;
      },
      
      release(obj) {
        if (obj && pool.length < maxSize) {
          resetFn(obj);
          pool.push(obj);
          active--;
        }
      },
      
      clear() {
        pool.length = 0;
        active = 0;
      }
    };
  }
};

// 导出配置和工具
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PERFORMANCE_TARGETS,
    RESOURCE_PRIORITIES,
    LAZY_LOADING_CONFIG,
    CACHE_STRATEGIES,
    RESOURCE_OPTIMIZATION,
    NETWORK_OPTIMIZATION,
    RENDERING_OPTIMIZATION,
    MEMORY_MANAGEMENT,
    PERFORMANCE_MONITORING,
    PerformanceUtils,
    PerformanceOptimizer,
    initializePerformanceOptimization,
    generatePerformanceReport
  };
}

// 自动初始化（如果在浏览器环境中）
if (typeof window !== 'undefined') {
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePerformanceOptimization);
  } else {
    initializePerformanceOptimization();
  }
  
  // 暴露全局性能工具
  window.PerformanceUtils = PerformanceUtils;
  window.PerformanceOptimizer = PerformanceOptimizer;
  window.generatePerformanceReport = generatePerformanceReport;
  window.startPerformanceMonitoring = startPerformanceMonitoring;
  window.applyAutomaticOptimizations = applyAutomaticOptimizations;
  
  console.log('Performance optimization utilities loaded');
} else {
  console.log('Performance optimization utilities loaded (Node.js environment)');
}