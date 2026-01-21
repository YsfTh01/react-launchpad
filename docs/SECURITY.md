# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@example.com** (replace with your email)

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

## What to Include

Please include the following information in your report:

- **Type of issue** (e.g., XSS, CSRF, SQL injection, authentication bypass, etc.)
- **Full paths** of source file(s) related to the manifestation of the issue
- **Location** of the affected source code (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact** of the issue, including how an attacker might exploit it

## Security Best Practices

This project follows these security best practices:

### ✅ Implemented

- **Content Security Policy (CSP)** - Configured in nginx.conf
- **Type-safe environment variables** - Zod validation in src/config/env.ts
- **Secure HTTP client** - Axios with interceptors, automatic token refresh
- **Input validation** - Zod schemas for all forms and API responses
- **Error tracking** - Sentry integration for production error monitoring
- **Dependency auditing** - Automated via Renovate/Dependabot
- **HTTPS enforcement** - Production deployments use HTTPS only
- **XSS protection** - React's built-in escaping, no dangerouslySetInnerHTML
- **Authentication** - Token-based auth with secure storage

### 🔒 Security Headers

```nginx
# Example from nginx.conf
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 🛡️ Environment Variables

Never commit sensitive data:

```bash
# ❌ DO NOT commit .env files with secrets
.env.local
.env.production

# ✅ Use .env.example as template
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=your-sentry-dsn
```

## Disclosure Policy

When we receive a security bug report, we will:

1. **Confirm receipt** within 48 hours
2. **Assess severity** and determine priority
3. **Develop and test a fix**
4. **Release a security patch** (within 7 days for critical issues)
5. **Publish a security advisory** on GitHub
6. **Credit the reporter** in release notes (unless you prefer anonymity)

## Security Updates

Subscribe to security advisories:

1. Watch this repository on GitHub
2. Enable "Security alerts" in your notification settings
3. Check the [Security Advisories](https://github.com/Aybavs/react-launchpad/security/advisories) page

## Known Issues

No known security vulnerabilities at this time.

## Security Tools

We recommend using these tools:

- **npm audit** / **pnpm audit** - Check for vulnerable dependencies
- **Snyk** - Continuous security monitoring
- **OWASP ZAP** - Web application security scanner
- **Lighthouse** - Security audits in Chrome DevTools

## Contact

For security concerns: **security@example.com** (replace with your email)

For general questions: Open a [Discussion](https://github.com/Aybavs/react-launchpad/discussions)

---

Thank you for helping keep this project secure! 🔒
