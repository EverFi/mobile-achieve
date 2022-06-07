module.exports = {
  appName: 'skeletor',
  showLogs: false,
  batchName: `skeletor-${Date.now()}`,
  concurrency: 20,
  apiKey: process.env.APPLITOOLS_API_KEY,
  serverUrl: 'https://everfieyes.applitools.com/',
  browser: [
    { width: 1440, height: 768, name: 'firefox' },
    { width: 1440, height: 768, name: 'chrome' },
    { deviceName: 'iPhone 4', screenOrientation: 'portrait', name: 'chrome' },
    { deviceName: 'iPhone 6/7/8', screenOrientation: 'portrait', name: 'chrome' },
    { deviceName: 'iPad', screenOrientation: 'portrait', name: 'chrome' },
  ],
};
