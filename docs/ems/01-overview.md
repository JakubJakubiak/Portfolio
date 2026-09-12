# Real-time energy dashboard

High-level intro only. No topology, no wiring, no hosts.

## What it is

A production web panel for energy storage and industrial sites. Operators open one screen and see live status, overview charts (rings + lines), and device service — instead of waiting on a slow report.

Cloud panel for day-to-day use. The same product also runs as an offline kiosk on site when the wide-area link is down.

## What I worked on

Full stack on a live system: API, React/TypeScript UI, time-series history, and live telemetry. The story worth putting on the site is not the stack list — it is that **overview went from unusable to instant**. That write-up is [02-performance.md](02-performance.md).

## What this page is not

Not a diagram. Not MQTT / cache / websocket internals. Not firmware paths. Not client names.
