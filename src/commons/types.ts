export interface MetricBody {
  value?: number
};

export interface LogEntry {
  timestamp: number;
  value: number;
}

export interface AddLogEntry extends LogEntry {
  key: string;
}
