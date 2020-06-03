class Logger {
  private _log: Map<string, Map<number, number>>;

  constructor() {
    this._log = new Map<string, Map<number, number>>();
  }

  public add({ key, value }: { key: string, value: number}) {
    const currentValue: Map<number, number> =
      this._log.get(key) || new Map<number, number>();

    const currentDate = new Date().valueOf();
    currentValue.set(currentDate, value);
    this._log.set(key, currentValue);
  }

  public getSum(key: string) {
    // return this._log.get(key)?.reduce((a: number, b: number) => a + b, 0) ?? 0;
    return 0;
  }
}

export default new Logger();
