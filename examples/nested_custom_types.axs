// Define nested structures
DEFINE_TYPE
STRUCTURE DeviceStatus {
  INTEGER connected
  INTEGER powerState
  CHAR statusMessage[50]
}

STRUCTURE SystemConfig {
  INTEGER version
  DeviceStatus primaryDevice
  DeviceStatus backupDevices[3]
}

// Using nested types
VOLATILE DeviceStatus mainProjector
VOLATILE SystemConfig systemSettings

// Accessing nested fields
systemSettings.version = 2
systemSettings.primaryDevice.powerState = 1
systemSettings.backupDevices[0].statusMessage = 'Standby'
