// Slope Unblocked Service Worker - 优化的缓存策略
const CACHE_NAME = 'slope-unblocked-v2.0.0';
const GAME_CACHE_NAME = 'slope-game-v2.0.0';

// 要缓存的核心资源
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 游戏相关资源
const GAME_ASSETS = [
  'https://slopeunblocked.bitbucket.io/',
  'https://slopeunblocked.bitbucket.io/file/'
];

// 安装事件 - 缓存核心资源
self.addEventListener('install', event => {
  console.log('[SW] 安装中...');
  
  event.waitUntil(
    Promise.all([
      // 缓存核心资源
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('[SW] 缓存核心资源');
          return cache.addAll(CORE_ASSETS);
        })
        .catch(error => {
          console.error('[SW] 核心资源缓存失败:', error);
        }),
      
      // 缓存游戏资源
      caches.open(GAME_CACHE_NAME)
        .then(cache => {
          console.log('[SW] 缓存游戏资源');
          return cache.addAll(GAME_ASSETS);
        })
        .catch(error => {
          console.error('[SW] 游戏资源缓存失败:', error);
        })
    ])
    .then(() => {
      console.log('[SW] 安装完成');
      self.skipWaiting();
    })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('[SW] 激活中...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 删除旧版本缓存
          if (cacheName !== CACHE_NAME && cacheName !== GAME_CACHE_NAME && 
              (cacheName.startsWith('slope-unblocked-v') || cacheName.startsWith('slope-game-v'))) {
            console.log('[SW] 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] 激活完成');
      return self.clients.claim();
    })
  );
});

// 获取事件 - 智能缓存策略
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 只处理HTTP/HTTPS请求
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // 根据请求类型选择不同的缓存策略
  if (request.mode === 'navigate' || request.headers.get('accept').includes('text/html')) {
    // 对导航请求使用网络优先策略
    event.respondWith(handleNavigationRequest(request));
  } else if (url.origin === self.location.origin) {
    // 同源资源使用缓存优先策略
    event.respondWith(handleSameOriginRequest(request));
  } else if (GAME_ASSETS.some(asset => url.href.includes(asset))) {
    // 游戏资源使用Stale-While-Revalidate策略
    event.respondWith(handleGameAssetRequest(request));
  } else {
    // 其他资源使用网络优先策略
    event.respondWith(handleNetworkFirst(request));
  }
});

// 导航请求处理 - 网络优先，失败时返回缓存
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // 更新缓存
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] 网络请求失败，返回缓存:', request.url);
    
    // 尝试从缓存获取
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 如果连缓存都没有，返回离线页面
    return new Response('Offline - Game not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// 同源资源处理 - 缓存优先
async function handleSameOriginRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] 获取资源失败:', request.url, error);
    return new Response('Resource not available', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// 游戏资源处理 - Stale-While-Revalidate
async function handleGameAssetRequest(request) {
  const cache = await caches.open(GAME_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // 立即返回缓存，同时在后台更新
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(error => {
      console.warn('[SW] 游戏资源更新失败:', request.url, error);
    });
    
    return cachedResponse;
  }
  
  // 如果没有缓存，等待网络请求
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] 游戏资源获取失败:', request.url, error);
    return new Response('Game resource not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// 网络优先通用处理
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] 网络请求失败，尝试缓存:', request.url);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Resource not available', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// 后台同步 - 用于分析或用户数据
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // 实现后台同步逻辑
    console.log('[SW] 执行后台同步');
    
    // 这里可以添加游戏数据同步、分析数据发送等
    const syncData = await getSyncData();
    if (syncData) {
      await sendAnalyticsData(syncData);
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] 后台同步失败:', error);
    return Promise.reject(error);
  }
}

// 推送通知支持
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Slope Unblocked有新更新！',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '立即游戏',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: '关闭',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Slope Unblocked', options)
  );
});

// 处理通知点击
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 消息处理 - 用于客户端通信
self.addEventListener('message', event => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      case 'CLEAR_CACHE':
        clearAllCaches().then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
      default:
        console.log('[SW] 未知消息类型:', event.data.type);
    }
  }
});

// 辅助函数
async function getSyncData() {
  // 从IndexedDB或其他存储获取待同步数据
  return null;
}

async function sendAnalyticsData(data) {
  // 发送分析数据到服务器
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('[SW] 发送分析数据失败:', error);
  }
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
}

// 定期清理旧缓存
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cleanup-old-caches') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const currentCaches = [CACHE_NAME, GAME_CACHE_NAME];
  
  return Promise.all(
    cacheNames.map(cacheName => {
      if (!currentCaches.includes(cacheName)) {
        console.log('[SW] 清理旧缓存:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
}

// 错误处理和日志记录
self.addEventListener('error', event => {
  console.error('[SW] Service Worker错误:', event.error);
});

// 未处理的Promise拒绝
self.addEventListener('unhandledrejection', event => {
  console.error('[SW] 未处理的Promise拒绝:', event.reason);
});

console.log('[SW] Service Worker已加载');