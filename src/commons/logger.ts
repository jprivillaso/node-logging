interface LogEntry {
  timestamp: number;
  value: number;
}

class Logger {
  private _log: Map<string, LogEntry[]>;

  constructor() {
    this._log = new Map<string, LogEntry[]>();
  }

  public add({ key, value }: { key: string, value: number}) {
    const currentValue: LogEntry[] = this._log.get(key) || [];

    const timestamp = new Date().valueOf();
    currentValue.push({
      timestamp,
      value: Math.round(value)
    });

    this._log.set(key, currentValue);
  }

  public getSum(key: string) {
    const currentValues = this._log.get(key)?.map(v => v.value) ?? [];
    return currentValues.reduce((a: number, b: number) => a + b, 0) ?? 0;
  }
}

export default new Logger();
