/**
 * Utilsクラスは、共通のユーティリティメソッドを提供するためのクラスです。
 */
export class Utils {
    /**
     * インデントを削除する
     * @param {string} str 
     * @returns {string}
     */
    static trimLines(str: string): string {
        const list = str.split('\n');
        const line = list.find((line, index) => line.trim().length > 0);
        if (line) { } else { return str; }
        const indent = line.length - line.trimLeft().length;
        const regex = new RegExp(`^ {${indent}}`, 'g');
        return list.map(line => line.replace(regex, '')).join('\n').trim();
    }
    /**
     * UUIDを生成する
     * @returns {string}
     */
    static generateUUID(): string {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}