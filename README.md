# chrome-history-api — History API Wrapper for Chrome Extensions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Built by [Zovo](https://zovo.one)**

**Chrome History API wrapper** — search, stats (top domains, hourly distribution), smart cleanup (by age, domain, single-visits). Zero dependencies.

## 🚀 Quick Start
```typescript
import { HistoryManager, HistoryStats, HistoryCleaner } from 'chrome-history-api';
const today = await HistoryManager.getToday();
const topSites = await HistoryManager.getMostVisited(10);
const domains = await HistoryStats.topDomains(7);
await HistoryCleaner.deleteOlderThan(30);
```

## 📄 License
MIT — [Zovo](https://zovo.one)
