# 🛡️ SecureShield Web SDK (v1.0.0)

> Enterprise-Grade Client-Side Security, Anti-Bot Fraud Defense, Threat Detection & Zero-Trust Telemetry Engine for Web Applications.

---

## 📦 What's Inside This Release Package

This release contains the clean single-file artifacts for integrating SecureShield into your web application:

```
SecureShield_Web_SDK_Release/
├── secureshield.js              <-- 📦 Option A: Single-file Hardened Obfuscated JS (<5ms load)
├── secureshield.wasm.js         <-- ⚡ Option B: Single-file Inline WASM-Embedded Engine
├── secureshield.js.sha256       <-- 🔒 Published SHA-256 Checksum (Option A)
├── secureshield.js.sri          <-- 🛡️ Subresource Integrity (SRI) Hash for <script> tag
├── secureshield.wasm.js.sha256  <-- 🔒 Published SHA-256 Checksum (Option B)
├── secureshield.wasm.js.sri     <-- 🛡️ Subresource Integrity (SRI) Hash for <script> tag
├── index.d.ts                   <-- 📘 Complete TypeScript Definitions (for React/Next/Vue/Angular)
├── INTEGRATION_GUIDE.md         <-- 📖 Step-by-Step Integration Guide (All Frameworks)
└── README.md                    <-- 📋 Quick Start & Overview
```

---

## ⚡ 3-Minute Quick Start

### Method 1: Drop-in Script Tag (HTML / CMS / Vanilla JS)

Add the script tag to your `<head>` and initialize SecureShield:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Protected App</title>

  <!-- Option A: Standard Hardened JS -->
  <script 
    src="./secureshield.js" 
    integrity="sha384-isBs1qoZUjLT2iWWCGZa8k2I0fJBbN3uMLcUP9p/WxW8wtCcuNV7F6Ym1PBfPvpt" 
    crossorigin="anonymous" 
    async>
  </script>
</head>
<body>
  <script>
    window.addEventListener('DOMContentLoaded', async () => {
      // 1. Fetch ephemeral token from your server (Zero secrets in client code)
      const { sessionToken } = await fetch('/api/secureshield-handshake').then(r => r.json());

      // 2. Initialize SecureShield
      const shield = await window.SecureShield.init({
        sessionToken: sessionToken,
        serverUrl: 'https://security.yourcompany.com/api/v1/telemetry/ingest',
        enableStorageLeakScrubber: true,
        enableTabBlurShield: true
      });

      // 3. Collect device signals & evaluate trust
      const verdict = await shield.ingestTelemetry();
      console.log('Security Status:', verdict.verdict);
    });
  </script>
</body>
</html>
```

---

### Method 2: NPM Package (React, Next.js, Vue 3, Angular)

```bash
npm install @secureshield/web
```

```typescript
import { SecureShield, ServerSecurityVerdict } from '@secureshield/web';

async function bootstrap() {
  const { sessionToken } = await fetch('/api/secureshield-handshake').then(r => r.json());

  const shield = await SecureShield.init({
    sessionToken,
    serverUrl: process.env.NEXT_PUBLIC_SECURITY_INGEST_URL,
    enableStorageLeakScrubber: true,
    enableTabBlurShield: true
  });

  const verdict: ServerSecurityVerdict = await shield.ingestTelemetry();
  console.log('Verdict:', verdict.verdict);
}
```

---

## 🔒 Security Architecture Highlights

| Layer | Feature | Protection Mechanism |
|---|---|---|
| **Zero Client Risk Scoring** | Server-Side Decisions | Risk scores, thresholds, and fraud verdicts are evaluated **exclusively on the backend ingestion engine**, preventing client-side bypass. |
| **Option A (Hardened JS)** | AST Transformation | String array rotation (RC4/Base64), control flow flattening, and anti-tamper traps. |
| **Option B (WASM Engine)** | Binary Bytecode | Kinematic mouse/keyboard entropy, canvas pixel hashing, and floating-point precision divergence compiled into WebAssembly. |
| **Storage Sanitization** | `StorageScrubber` | Automatically purges unencrypted JWTs and access tokens leaked in `localStorage`/`sessionStorage`. |
| **DOM Hardening** | `TabBlurShield` | Automatically blurs sensitive screen contents when the browser window loses focus. |
| **Remote Remediation** | Dynamic Policy Dispatch | Executes real-time OTA actions (`BLOCK`, `CHALLENGE`, `PAUSED`, `WIPE_LOCAL_KEYS`) returned by the security gateway. |

---

## 📖 Full Documentation

For detailed step-by-step guides for **React**, **Next.js (App & Pages Router)**, **Vue 3**, and **Angular**, refer to [`INTEGRATION_GUIDE.md`](./INTEGRATION_GUIDE.md).
