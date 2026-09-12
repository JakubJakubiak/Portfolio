# Industrial energy dashboard — public notes

Sanitized notes for the portfolio. Rewritten from internal work logs. **Not a copy of production docs.**

Use these files on the site. Do not paste from the original work brain.

| File | Use on the site |
|------|-----------------|
| [01-overview.md](01-overview.md) | One short intro. What it is — not how it is wired. |
| [02-performance.md](02-performance.md) | Main case: overview charts **~19 s → ~0,26 s** and empty series **35 s → ~0,6 s**. |
| [03-split.md](03-split.md) | Time-series on a **second machine**, not on the API. Vendor cloud write **0**. |

## Never publish

- Client / site / company names, plant IDs, kWh from a real installation
- IPs, hostnames, VPN, ports, how services connect
- API paths, endpoint names, socket event names, payloads
- Screenshots of the live product

Public numbers only: **~19 s → ~0,26 s (~71×)** and **35 s → ~0,6 s (~58×)**.
