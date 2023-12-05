import { Observable, forkJoin, of } from "rxjs";

export class DomUtils {
    static scrollToBottomIfNeeded(elem: HTMLElement) {
        // 要素のスクロール可能な高さと現在のスクロール位置

        const end = elem.scrollHeight - elem.clientHeight;
        // 現在のスクロール位置+20pxが要素の一番下でない場合、一番下までスクロール
        if (elem.scrollTop + 40 <= end) {
            elem.scrollTop = end;
        } else {
            // 何もしない。
        }
    }
}

/**
 * forkJoinの引数が空の場合にforkJoinが全く起動しなくて扱いにくいので、空の場合はof([])を返すようにする。
 * @param observables 
 * @returns 
 */
export function safeForkJoin(observables: Observable<any>[]): Observable<any[]> {
    return observables.length === 0 ? of([]) : forkJoin(observables);
}
