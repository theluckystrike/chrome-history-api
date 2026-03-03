/**
 * History Stats — Browsing analytics and insights
 */

export class HistoryStatsError extends Error {
    constructor(
        message: string,
        public code: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'HistoryStatsError';
        if (originalError?.stack) {
            this.stack = originalError.stack;
        }
    }
}

export const HistoryStatsErrorCode = {
    SEARCH_FAILED: 'SEARCH_FAILED',
    INVALID_PARAMS: 'INVALID_PARAMS',
    URL_PARSE_FAILED: 'URL_PARSE_FAILED',
} as const;

export class HistoryStats {
    /** Get domain frequency (top domains visited) */
    static async topDomains(days: number = 7, limit: number = 20): Promise<Array<{ domain: string; visits: number; parseErrors: number }>> {
        if (days < 1) {
            throw new HistoryStatsError(
                `Invalid days: ${days}. Must be at least 1.`,
                HistoryStatsErrorCode.INVALID_PARAMS
            );
        }
        if (limit < 1 || limit > 1000) {
            throw new HistoryStatsError(
                `Invalid limit: ${limit}. Must be between 1 and 1000.`,
                HistoryStatsErrorCode.INVALID_PARAMS
            );
        }
        
        const start = Date.now() - days * 86400000;
        const items = await chrome.history.search({ text: '', startTime: start, maxResults: 10000 });
        
        const domains = new Map<string, number>();
        let parseErrors = 0;
        
        for (const item of items) {
            if (!item.url) continue;
            try { 
                const d = new URL(item.url).hostname; 
                domains.set(d, (domains.get(d) || 0) + (item.visitCount || 1)); 
            } catch (error) {
                parseErrors++;
                console.warn(`[HistoryStats] Failed to parse URL: ${item.url}`, error);
            }
        }
        
        return [...domains.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([domain, visits]) => ({ domain, visits, parseErrors: 0 }));
    }

    /** Browsing hours distribution */
    static async hourlyDistribution(days: number = 7): Promise<number[]> {
        if (days < 1) {
            throw new HistoryStatsError(
                `Invalid days: ${days}. Must be at least 1.`,
                HistoryStatsErrorCode.INVALID_PARAMS
            );
        }
        
        const start = Date.now() - days * 86400000;
        const items = await chrome.history.search({ text: '', startTime: start, maxResults: 10000 });
        const hours = new Array(24).fill(0);
        for (const item of items) { 
            if (item.lastVisitTime) {
                hours[new Date(item.lastVisitTime).getHours()] += item.visitCount || 1; 
            }
        }
        return hours;
    }

    /** Total pages visited per day */
    static async dailyCounts(days: number = 7): Promise<Array<{ date: string; count: number }>> {
        if (days < 1 || days > 365) {
            throw new HistoryStatsError(
                `Invalid days: ${days}. Must be between 1 and 365.`,
                HistoryStatsErrorCode.INVALID_PARAMS
            );
        }
        
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
