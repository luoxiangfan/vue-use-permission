export type Descriptor =
  | 'accelerometer'
  | 'accessibility-events'
  | 'ambient-light-sensor'
  | 'background-sync'
  | 'clipboard-read'
  | 'clipboard-write'
  | 'compute-pressure'
  | 'gyroscope'
  | 'local-fonts'
  | 'magnetometer'
  | 'payment-handler'
  | 'top-level-storage-access'
  | 'window-management';

export type IPermissionDescriptor = PermissionDescriptor | { name: Descriptor };
