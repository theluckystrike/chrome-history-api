/**
 * History Stats — Browsing analytics and insights
 */
export class HistoryStats {
    /** Get domain frequency (top domains visited) */
    static async topDomains(days: number = 7, limit: number = 20): Promise<Array<{ domain: string; visits: number }>> {
        const start = Date.now() - days * 86400000;
        const items = await chrome.history.search({ text: '', startTime: start, maxResults: 10000 });
        const domains = new Map<string, number>();
        for (const item of items) {
            if (!item.url) continue;
            try { const d = new URL(item.url).hostname; domains.set(d, (domains.get(d) || 0) + (item.visitCount || 1)); } catch { }
        }
        return [...domains.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([domain, visits]) => ({ domain, visits }));
    }

    /** Browsing hours distribution */
    static async hourlyDistribution(days: number = 7): Promise<number[]> {
        const start = Date.now() - days * 86400000;
        const items = await chrome.history.search({ text: '', startTime: start, maxResults: 10000 });
        const hours = new Array(24).fill(0);
        for (const item of items) { if (item.lastVisitTime) hours[new Date(item.lastVisitTime).getHours()] += item.visitCount || 1; }
        return hours;
    }

    /** Total pages visited per day */
    static async dailyCounts(days: number = 7): Promise<Array<{ date: string; count: number }>> {
        const counts: Array<{ date: string; count: number }> = [];
        for (let i = 0; i < days; i++) {
            const start = Date.now() - (i + 1) * 86400000;
            const end = Date.now() - i * 86400000;
            const items = await chrome.history.search({ text: '', startTime: start, endTime: end, maxResults: 10000 });
            counts.push({ date: new Date(start).toISOString().split('T')[0], count: items.length });
        }
        return counts.reverse();
    }
}
