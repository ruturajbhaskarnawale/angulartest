// src/app/services/secureshield.service.ts
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SecureShield, SecurityAuditReport } from '@secureshield/web';

@Injectable({
  providedIn: 'root'
})
export class SecureShieldService {
  private platformId = inject(PLATFORM_ID);
  private sdkInstance: any = null;

  // 🚦 Angular 19 Reactive Signals
  public isShieldActive = signal<boolean>(false);
  public trustScore = signal<number>(100);
  public lastReport = signal<(SecurityAuditReport & { trustScore?: number }) | null>(null);

  /**
   * Initializes SecureShield with 3-Key Cryptography Envelope
   */
  async initSecureShield(): Promise<SecurityAuditReport | null> {
    // 🛡️ SSR Safety Guard
    if (!isPlatformBrowser(this.platformId)) return null;
    if (this.sdkInstance) return this.lastReport();

    try {
      this.sdkInstance = await SecureShield.init({
        headerKey: 'enc:v1:bf004452ea9f2170fa2f0d75:b0d33433ad98d9648c17bafe4a45cdde:07ff537a3441f0059e1134d902233f',
        encryptionKey: 'U1MEOYmR2f9ZePypUKvFtCGC7xHuXcJKsukRKEeHjYQ=',
        initializationKey: 'INIT_7IvGJG9j70Cl61f8RnNwqZdQPf9Xy3Dw',
        tenantId: 'TEN-SAKSHI-8743',
        appId: 'ast_web_782480',
        serverUrl: 'https://radiator-waving-cahoots.ngrok-free.dev/api/v1/telemetry/ingest',
        environment: 'development',            // 🛡️ Set 'production' for live deployment
        skipHandshake: true,
        enableRuntimeIntegrityWatchdog: true,
        enablePrototypeFreezing: false,        // ✅ Kept false for Angular Signals compatibility
        enableStorageLeakScrubber: false,      // ✅ Kept false on initial boot to keep main thread light
        enableTabBlurShield: false,
        enableDomLockoutOverlay: false,        // 🚀 Set false in dev to prevent black screen & allow element inspection
        blockRedirectUrl: null,

        onTamperDetected: (apiName: string, reason?: string) => {
          console.warn(`[SecureShield Tamper Alert] ${apiName}: ${reason}`);
        },
        onRemediationTriggered: (action: string, reason?: string) => {
          console.warn(`[SecureShield Policy Action] ${action} — ${reason || 'Triggered'}`);
        }
      });

      // ⚡ Defer security scans so the initial page renders in 0ms without UI freezing
      setTimeout(async () => {
        try {
          const report = await this.sdkInstance.evaluateSecurityState();
          this.lastReport.set(report);
          this.trustScore.set(report.trustScore ?? 100);
          this.isShieldActive.set(true);
          console.log('[SecureShield] Initialized ✅. Trust Score:', report.trustScore);
        } catch (e) {
          console.warn('[SecureShield] Background evaluation notice:', e);
        }
      }, 50);

      return null;
    } catch (error) {
      console.error('[SecureShield] Initialization error:', error);
      return null;
    }
  }

  isCleanForTransaction(): boolean {
    if (!this.sdkInstance) return false;
    const audit = this.sdkInstance.runScan();
    return audit.verdict === 'SECURE' && (audit.risk_score || 0) < 50;
  }
}