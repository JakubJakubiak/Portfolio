# Time-series off the API — own machine, no vendor cloud

Public note. No hostnames, no IPs, no provider account names.

## In one sentence

The live time-series store no longer sits on the API box and no longer writes to the vendor’s cloud. API on one machine, history on the other. Production ingest to that cloud: **zero**.

## What changed

| Before | After |
|--------|--------|
| Time-series next to the API (same box, extra load) | Store on a **second machine** |
| Dual-write / failover into the vendor cloud | Cloud write **off** |
| API competing with the database for CPU/RAM | API box **lighter** — store does not steal the node |

Backup of the store stays under our control (not “the SaaS is the backup”).

## Why it belongs next to the 71× case

Two different wins:

1. **Overview paint** — ~19 s → ~0.26 s (queries + UI). See [02-performance.md](02-performance.md).
2. **Split** — API and time-series do not share a box; we do not depend on the vendor cloud for live data.

Do not merge them into one sentence as if the split *is* the 71×. They shipped together in the same production stretch.

## How to say it on the site

> Time-series on its own machine, not on the API. Faster API box. Vendor cloud writes: 0.

## Never publish

Machine names, IPs, VPN, which cloud product, dual-write flags, tunnel details.
