# chrome-history-api

[![npm version](https://img.shields.io/npm/v/chrome-history-api)](https://npmjs.com/package/chrome-history-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-history-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-history-api/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-history-api?style=social)](https://github.com/theluckystrike/chrome-history-api)

> Access browser history in Chrome extensions.

**chrome-history-api** provides browser history access for Chrome extensions. Part of the Zovo Chrome extension utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Search History** - Search browser history
- ✅ **Visit History** - Get visit records
- ✅ **URL Lookup** - Look up URL details
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-history-api
```

## Usage

```javascript
import { History } from 'chrome-history-api';

// Search history
const results = await History.search('query');

// Get visit history
const visits = await History.getVisits(url);
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

## See Also

### Related Zovo Repositories

- [chrome-bookmark-manager](https://github.com/theluckystrike/chrome-bookmark-manager) - Bookmark management
- [chrome-reading-list-api](https://github.com/theluckystrike/chrome-reading-list-api) - Reading list

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)
