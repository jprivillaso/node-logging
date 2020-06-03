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
    const currentValues: LogEntry[] = this._log.get(key) || [];

    const timestamp = new Date().valueOf();
    const oneHourAgo = timestamp - 3.6e6;

    // Discard values before one hour
    const oldestValue = currentValues.findIndex((t: LogEntry) => t.timestamp >= oneHourAgo);
    currentValues.splice(oldestValue);

    // Add new value and update the array
    currentValues.push({
      timestamp,
      value: Math.round(value)
    });
    this._log.set(key, currentValues);
  }

  public getSum(key: string) {
    let currentValues = this._log.get(key)?.map(e => e.value) ?? [];
    return currentValues.reduce((a: number, b: number) => a + b, 0) ?? 0;
  }
}

export default new Logger();
