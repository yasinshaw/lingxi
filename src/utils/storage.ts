interface ProxyStorage {
    getItem(key: string): any;

    setItem(Key: string, value: string): void;

    removeItem(key: string): void;

    clear(): void;
}

interface ExtendProxyStorage {
    getItemDefault(key: string, defaultValue: any): any;

    containsItem(key: string): boolean;
}

//sessionStorage operate
class sessionStorageProxy implements ProxyStorage, ExtendProxyStorage {
    protected storage: ProxyStorage;

    constructor(storageModel: ProxyStorage) {
        this.storage = storageModel;
    }

    // 存
    public setItem(key: string, value: any): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    // 取
    public getItem(key: string): any {
        return JSON.parse(this.storage.getItem(key));
    }

    // 带默认值地取
    public getItemDefault<T>(key: string, defaultValue: T ): T {
        let value = this.storage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return defaultValue
        }
    }

    // 是否存在
    public containsItem(key: string): boolean {
        return this.storage.getItem(key);
    }

    // 删
    public removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    // 清空
    public clear(): void {
        this.storage.clear();
    }
}

//localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
    constructor(localStorage: ProxyStorage) {
        super(localStorage);
    }
}

export const storageSession = new sessionStorageProxy(sessionStorage);

export const storageLocal = new localStorageProxy(localStorage);
