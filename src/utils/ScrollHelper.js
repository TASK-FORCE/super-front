import { LocalCache } from '@/utils/common/LocalCache.js';

class ScrollHelper {
    constructor() {
        this.scrollYCache = new LocalCache(100);
    }

    save(key) {
        this.scrollYCache.put(key, window.scrollY);
    }

    get(key) {
        return this.scrollYCache.get(key);
    }

    init(key) {
        this.scrollYCache.put(key, undefined);
    }
}

const scrollHelper = new ScrollHelper();
export default scrollHelper;
