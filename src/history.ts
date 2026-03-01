/**
 * History Manager — Search and browse Chrome history
 */
export class HistoryManager {
    /** Search history */
    static async search(query: string, maxResults: number = 100): Promise<chrome.history.HistoryItem[]> {
        return chrome.history.search({ text: query, maxResults });
    }

    /** Get history for a time range */
    static async getRange(startTime: number, endTime: number = Date.now()): Promise<chrome.history.HistoryItem[]> {
        return chrome.history.search({ text: '', startTime, endTime, maxResults: 10000 });
    }

    /** Get today's history */
    static async getToday(): Promise<chrome.history.HistoryItem[]> {
        const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
        return this.getRange(startOfDay.getTime());
    }

    /** Get visits for a specific URL */
    static async getVisits(url: string): Promise<chrome.history.VisitItem[]> {
        return chrome.history.getVisits({ url });
    }

    /** Get most visited URLs */
    static async getMostVisited(limit: number = 20): Promise<chrome.history.HistoryItem[]> {
        const items = await chrome.history.search({ text: '', maxResults: 5000 });
        return items.sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0)).slice(0, limit);
    }

    /** Delete a specific URL from history */
    static async deleteUrl(url: string): Promise<void> {
        await chrome.history.deleteUrl({ url });
    }

    /** Delete history in a time range */
    static async deleteRange(startTime: number, endTime: number): Promise<void> {
        await chrome.history.deleteRange({ startTime, endTime });
    }

    /** Delete all history */
    static async deleteAll(): Promise<void> {
        await chrome.history.deleteAll();
    }

    /** Listen for new visits */
    static onVisited(callback: (result: chrome.history.HistoryItem) => void): void {
        chrome.history.onVisited.addListener(callback);
    }
}
