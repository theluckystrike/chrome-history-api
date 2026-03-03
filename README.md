# chrome-history-api — Browser History Access

[![npm version](https://img.shields.io/npm/v/chrome-history-api)](https://npmjs.com/package/chrome-history-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-history-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-history-api/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-history-api?style=social)](https://github.com/theluckystrike/chrome-history-api)

> Access and search browser history in Chrome extensions.

**chrome-history-api** provides a clean Promise-based wrapper around Chrome's History API for extensions. Search history, get visit details, track page visits, and manage browsing data — all with full TypeScript support.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Search History** - Full-text search across titles and URLs
- ✅ **Visit Tracking** - Get detailed visit information
- ✅ **Time Filtering** - Filter by date range
- ✅ **URL Analysis** - Extract domains and paths
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-history-api
```

## Quick Start

```typescript
import { History } from 'chrome-history-api';

// Search history
const results = await History.search('example');

// Get recent visits
const visits = await History.getVisits({
  maxResults: 50
});
```

## Usage Examples

### Search History

```typescript
import { History, HistoryQuery } from 'chrome-history-api';

const query: HistoryQuery = {
  text: 'github',
  maxResults: 20,
  startTime: Date.now() - 7 * 24 * 60 * 60 * 1000 // Last 7 days
};

const results = await History.search(query);

results.forEach(item => {
  console.log(item.title);
  console.log(item.url);
  console.log(item.lastVisitTime);
});
```

### Get Visit Details

```typescript
import { History } from 'chrome-history-api';

// Get all visits for a specific URL
const visits = await History.getVisits('https://github.com');

visits.forEach(visit => {
  console.log('Visit time:', visit.visitTime);
  console.log('Referrer:', visit.referringUrl);
});
```

### Delete History

```typescript
import { History } from 'chrome-history-api';

// Delete all visits for a specific URL
await History.deleteUrl('https://example.com');

// Delete by date range
await History.deleteRange({
  startTime: 0,
  endTime: Date.now() - 30 * 24 * 60 * 60 * 1000 // Older than 30 days
});
```

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| `search(query)` | Search history by text |
| `getVisits(url)` | Get visit history for URL |
| `deleteUrl(url)` | Delete all visits for URL |
| `deleteRange(range)` | Delete visits in date range |
| `addUrl(url)` | Programmatically add a visit |

### Types

```typescript
interface HistoryQuery {
  text: string;
  maxResults?: number;
  startTime?: number;
  endTime?: number;
}

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  lastVisitTime: number;
  visitCount: number;
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/history-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/history-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [chrome-bookmark-manager](https://github.com/theluckystrike/chrome-bookmark-manager) - Bookmark management
- [chrome-download-manager](https://github.com/theluckystrike/chrome-download-manager) - Download utilities
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
