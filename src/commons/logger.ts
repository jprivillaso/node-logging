import { LogEntry, AddLogEntry } from "./types";

class Logger {
  private _log: Map<string, LogEntry[]>;

  constructor() {
    this._log = new Map<string, LogEntry[]>();
  }

  public add({ key, value, timestamp }: AddLogEntry) {
    const currentValues: LogEntry[] = this._log.get(key) || [];
    currentValues.push({
      timestamp,
      value: Math.round(value)
    });
    this._log.set(key, currentValues);
  }

  public getSum(key: string, timestamp: number) {
    let currentValues = this._log.get(key) ?? [];

    // Discard values before one hour
    const oneHourAgo = timestamp - 3.6e6;
    const oldestValueIndex = currentValues.findIndex(
      (t: LogEntry) => t.timestamp >= oneHourAgo
    );
    currentValues = currentValues.slice(oldestValueIndex);

    // Update again the log without the old values
    this._log.set(key, currentValues);

    return currentValues
      .map(i => i.value)
      .reduce((a: number, b: number) => a + b, 0) ?? 0;
  }
}

export default new Logger();
