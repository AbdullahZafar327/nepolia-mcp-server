# Napoli Pizzeria MCP Server

Generated draft MCP server skeleton for ASP spec `pizza-test-app-jade.vercel.app`.

This package is intentionally not a hosted deployment. It is a runnable skeleton that maps MCP tools back to reviewed ASP action IDs.

The generated server exposes Streamable HTTP MCP at `POST /mcp` and a health check at `GET /health`.
If `CUSTOMER_API_BASE_URL` is unset, runtime tool calls fall back to `https://pizza-test-app-jade.vercel.app`, the website root used during scanning.

## Tools

- `book_reservation` -> POST /api/reservations
- `place_order` -> POST /api/order
- `send_message` -> POST /api/contact
- `get_reservations` -> GET /api/reservations

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

## TODOs Before Production

- TODO: Override `CUSTOMER_API_BASE_URL` only if the runtime API origin differs from the scanned website root.
- TODO: Add customer auth, OAuth, API keys, or service-token handling where required.
- TODO: Replace the generic HTTP proxy with customer-specific SDK/API calls when available.
- TODO: Add human-confirmation flow before enabling mutation tools.
- TODO: Add integration tests against the real customer API.

## Notes

OpenAPI and direct HTTP routes are generated only when endpoint/method evidence exists. Placeholder tools are honest non-executable stubs and should not invent endpoints.
