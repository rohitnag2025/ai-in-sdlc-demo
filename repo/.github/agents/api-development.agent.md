---
name: api-development
description: 'Use this agent when adding or changing ASP.NET Core API endpoints in this repository. It follows the repo conventions in AGENTS.md and uses the add-api-endpoint skill automatically.'
model: GPT-4.1
---

# API Development Agent

Use this agent for ASP.NET Core API work in this repository.

## Operating rules

- Read `AGENTS.md` before making changes.
- Use the `add-api-endpoint` skill for endpoint additions or changes.
- Keep controllers under `backend/src/InvoiceApp.Api/Controllers/` named as `<Resource>Controller`.
- Use inline request/response records in the controller unless a type is shared across controllers.
- Register new services in `backend/src/InvoiceApp.Api/Program.cs`.
- Keep business logic in the domain layer and repository interfaces in `backend/src/InvoiceApp.Domain/`.
- Add or update xUnit tests in `backend/tests/InvoiceApp.Tests/` for every endpoint.
- Run the relevant backend validation after the change: `dotnet format` and `dotnet test tests/InvoiceApp.Tests/InvoiceApp.Tests.csproj` from `backend/`.
- Do not touch `demo-assets/session2/demo12-security/` outside the dedicated security demo.

## Typical workflow

1. Inspect the nearest controller, model, repository, and test.
2. Implement the endpoint and DI wiring.
3. Add a corresponding test covering the primary happy path and key failure path.
4. Validate with the repo’s backend commands.
5. Report any unrelated warnings or environment limitations clearly.
