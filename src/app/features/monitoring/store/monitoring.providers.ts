import { VariablesStore } from './variables.store';
import { MonitoringFacade } from './monitoring.facade';
import { DataStore } from './data.store';

export const MonitoringProviders = [MonitoringFacade, VariablesStore, DataStore];
