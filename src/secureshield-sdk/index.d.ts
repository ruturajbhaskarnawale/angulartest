/**
 * SecureShield Web Protection & Telemetry SDK
 * Self-contained TypeScript Type Definitions
 */

export interface DetectorItem {
  id: string;
  triggered: boolean;
  severity: number;
  category: string;
  event: string;
  confidence?: number;
  fpRiskTier?: 'LOW' | 'MEDIUM' | 'HIGH';
  evasionDifficulty?: 'LOW' | 'MEDIUM' | 'HIGH';
  requiresConsent?: boolean;
  implementationCost?: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: 'PASSED' | 'FAILED' | 'INCONCLUSIVE' | 'SKIPPED_NO_CONSENT';
  name?: string;
  executionTimeMs?: number;
  evidence?: Record<string, any>;
}

export interface SecurityAuditReport {
  scan_id: string;
  device_id_hash: string;
  session_id: string;
  os_name: string;
  os_version: string;
  app_id: string;
  app_version: string;
  sdk_version: string;
  verdict: 'SECURE' | 'BLOCKED';
  risk_score: number;
  risk_tier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  decision_action: 'ALLOW' | 'BLOCK';
  total_detectors: number;
  passed: number;
  failed: number;
  tenant_id: string;
  environment: string;
  items: DetectorItem[];
}

export interface TabBlurOptions {
  blurFilter?: string;
  maskMessage?: string;
  maskSubtitle?: string;
  listenToWindowBlur?: boolean;
  customOverlayId?: string;
}

export interface WatermarkOptions {
  opacity?: number;
  color?: string;
  fontSize?: number;
  elementId?: string;
}

export interface RemediationOptions {
  blockRedirectUrl?: string | null;
  enableDomLockoutOverlay?: boolean;
  onRemediationTriggered?: (action: string, reason?: string) => void;
  onWipeKeys?: () => void;
}

export interface RemediationResult {
  action: string;
  enforced: boolean;
  details?: string;
}

export declare class RemediationManager {
  constructor(options?: RemediationOptions);
  executeRemediation(action: string, reason?: string): Promise<RemediationResult>;
}

export interface SecureShieldConfig {
  tenantId?: string;
  appId?: string;
  appToken?: string;
  headerKey?: string;
  encryptionKey?: string;
  initializationKey?: string;
  serverUrl?: string;
  publicKeyPem?: string;
  serverPublicKeyBase64?: string;
  hmacKeyHex?: string;
  enableE2eeEncryption?: boolean;
  allowedOrigins?: string[];
  offlineGracePeriodMs?: number;
  skipHandshake?: boolean;
  blockRedirectUrl?: string | null;
  enableDomLockoutOverlay?: boolean;
  onRemediationTriggered?: (action: string, reason?: string) => void;
  onWipeKeys?: () => void;
  enableTabBlurShield?: boolean;
  tabBlurOptions?: TabBlurOptions;
  enableWatermark?: boolean;
  watermarkText?: string;
  watermarkOptions?: WatermarkOptions;
  defaultClipboardWipeTimeoutMs?: number;
  enableStorageLeakScrubber?: boolean;
  storageWhitelistKeys?: string[];
  enablePrototypeFreezing?: boolean;
  enableRuntimeIntegrityWatchdog?: boolean;
  onTamperDetected?: (api: string, details: string) => void;
  autoIngest?: boolean;
  environment?: 'production' | 'staging' | 'development';
  enableBehavioralBiometrics?: boolean;
  disabledDetectors?: string[];
}

export declare class SecureShield {
  private constructor();
  static init(config?: SecureShieldConfig): Promise<SecureShield>;
  getHandshakeUrl(): string;
  getSdkInitializeUrl(): string;
  initializeWithKeys(): Promise<boolean>;
  getSessionToken(): string | undefined;
  getDeviceToken(): string | undefined;
  isInitialized(): boolean;
  executeSdkHandshake(): Promise<boolean>;
  isApproved(): boolean;
  isOperatingOffline(): boolean;
  getIngestUrl(): string;
  getPolicyUrl(): string;
  fetchSignedRemotePolicy(): Promise<void>;
  evaluateSecurityState(): Promise<SecurityAuditReport & { trustScore: number }>;
  ingestTelemetry(reportPayload?: SecurityAuditReport): Promise<any>;
  isPaused(): boolean;
  setPaused(paused: boolean): void;
  getRemediationManager(): RemediationManager;
  runScan(options?: { ingest?: boolean }): SecurityAuditReport;
  getDetailedDeviceSecurityScan(): string;
}

export default SecureShield;
