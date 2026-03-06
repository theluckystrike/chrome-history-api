# chrome-history-api

[![npm version](https://img.shields.io/npm/v/chrome-history-api)](https://npmjs.com/package/chrome-history-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI Status](https://github.com/theluckystrike/chrome-history-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-history-api/actions)

A clean, Promise-based wrapper around Chrome's History API for Manifest V3 extensions. Search history, get browsing stats, clean up old entries, and analyze domain usage. Zero dependencies. Full TypeScript support.

Part of the [Zovo](https://zovo.one) developer tools family.

INSTALLATION

```bash
npm install chrome-history-api
```

Your extension manifest needs the `history` permission.

```json
{
  "permissions": ["history"]
}
```

EXPORTS

The library exports three classes from `chrome-history-api`.

```typescript
import { HistoryManager, HistoryStats, HistoryCleaner } from 'chrome-history-api';
```

HISTORY MANAGER

Wraps Chrome's core history search, retrieval, and deletion methods.

```typescript
// Search history by keyword, returns up to 100 results by default
const results = await HistoryManager.search('github');
const topResults = await HistoryManager.search('docs', 25);

// Get all history from a time range (epoch ms)
const items = await HistoryManager.getRange(startTime, endTime);

// Get everything visited today
const today = await HistoryManager.getToday();

// Get visit records for a specific URL
const visits = await HistoryManager.getVisits('https://github.com');

// Get the top 20 most visited URLs (adjustable limit)
const popular = await HistoryManager.getMostVisited(10);

// Delete a single URL from history
await HistoryManager.deleteUrl('https://example.com');

// Delete everything in a time range
await HistoryManager.deleteRange(startTime, endTime);

// Wipe all history
await HistoryManager.deleteAll();

// Listen for new page visits in real time
HistoryManager.onVisited((item) => {
  console.log('Visited', item.url);
});
```

HISTORY STATS

Browsing analytics and pattern insights.

```typescript
// Top domains visited in the last 7 days, limited to 20
const domains = await HistoryStats.topDomains(7, 20);
// Returns [{ domain: 'github.com', visits: 142 }, ...]

// Hourly browsing distribution over the last 7 days
// Returns an array of 24 numbers, one per hour
const hours = await HistoryStats.hourlyDistribution(7);

// Daily page counts for the last 7 days
const daily = await HistoryStats.dailyCounts(7);
// Returns [{ date: '2025-01-01', count: 87 }, ...]
```

HISTORY CLEANER

Smart cleanup utilities that return the number of deleted entries.

```typescript
// Delete history older than 30 days
const count = await HistoryCleaner.deleteOlderThan(30);

// Delete history for specific domains
const removed = await HistoryCleaner.deleteDomains(['example.com', 'ads.tracker.io']);

// Delete URLs visited only once (cleanup noise)
const singles = await HistoryCleaner.deleteSingleVisits();
```

API REFERENCE

HistoryManager

| Method | Returns | Description |
|--------|---------|-------------|
| `search(query, maxResults?)` | `Promise<HistoryItem[]>` | Full-text search across titles and URLs |
| `getRange(startTime, endTime?)` | `Promise<HistoryItem[]>` | Get history within a time window |
| `getToday()` | `Promise<HistoryItem[]>` | Shortcut for today's browsing history |
| `getVisits(url)` | `Promise<VisitItem[]>` | Detailed visit records for a URL |
| `getMostVisited(limit?)` | `Promise<HistoryItem[]>` | Top URLs sorted by visit count |
| `deleteUrl(url)` | `Promise<void>` | Remove a single URL |
| `deleteRange(startTime, endTime)` | `Promise<void>` | Remove history in a time range |
| `deleteAll()` | `Promise<void>` | Remove all browsing history |
| `onVisited(callback)` | `void` | Listen for new visits |

HistoryStats

| Method | Returns | Description |
|--------|---------|-------------|
| `topDomains(days?, limit?)` | `Promise<{ domain, visits }[]>` | Most visited domains |
| `hourlyDistribution(days?)` | `Promise<number[]>` | Visit counts per hour of day |
| `dailyCounts(days?)` | `Promise<{ date, count }[]>` | Total pages visited per day |

HistoryCleaner

| Method | Returns | Description |
|--------|---------|-------------|
| `deleteOlderThan(days)` | `Promise<number>` | Remove entries older than N days |
| `deleteDomains(domains)` | `Promise<number>` | Remove entries matching domains |
| `deleteSingleVisits()` | `Promise<number>` | Remove URLs visited only once |

DEVELOPMENT

```bash
git clone https://github.com/theluckystrike/chrome-history-api.git
cd chrome-history-api
npm install
npm run build
npm test
```

CONTRIBUTING

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

LICENSE

MIT. See [LICENSE](LICENSE) for details.

---

Built by [theluckystrike](https://github.com/theluckystrike) | [zovo.one](https://zovo.one)
