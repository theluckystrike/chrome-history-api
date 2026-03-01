/**
 * History Cleaner — Smart history cleanup
 */
export class HistoryCleaner {
    /** Delete history older than N days */
    static async deleteOlderThan(days: number): Promise<number> {
        const cutoff = Date.now() - days * 86400000;
        const items = await chrome.history.search({ text: '', startTime: 0, endTime: cutoff, maxResults: 10000 });
        for (const item of items) { if (item.url) await chrome.history.deleteUrl({ url: item.url }); }
        return items.length;
    }

    /** Delete history for specific domains */
    static async deleteDomains(domains: string[]): Promise<number> {
        let deleted = 0;
        for (const domain of domains) {
            const items = await chrome.history.search({ text: domain, maxResults: 10000 });
            for (const item of items) {
                if (item.url && new URL(item.url).hostname === domain) { await chrome.history.deleteUrl({ url: item.url }); deleted++; }
            }
        }
        return deleted;
    }

    /** Delete items visited only once */
    static async deleteSingleVisits(): Promise<number> {
        const items = await chrome.history.search({ text: '', maxResults: 10000 });
        const singles = items.filter((i) => (i.visitCount || 0) <= 1);
        for (const item of singles) { if (item.url) await chrome.history.deleteUrl({ url: item.url }); }
        return singles.length;
    }
}
