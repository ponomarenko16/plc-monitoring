export type VariableType = 'BOOL' | 'INT' | 'REAL';

export interface PlcVariable {
  id: string;
  name: string;
  type: VariableType;
  unit?: string;
  enabled: boolean;
}
