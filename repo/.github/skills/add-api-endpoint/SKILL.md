---
name: add-api-endpoint
description: 'Use when adding or changing an ASP.NET Core Web API endpoint in this repository. Follows the resource-controller, request-record DTO, dependency-injection, repository, and xUnit test conventions.'
---

# Add an API Endpoint

## When to Use

- Add a route or operation to the InvoiceApp ASP.NET Core API.
- Extend an existing controller or introduce a new resource controller.
- Add request/response DTOs, service registration, or endpoint tests.

## Procedure

1. Read `AGENTS.md` and inspect the closest controller, domain contract, repository implementation, and corresponding tests before editing.
2. Put resource endpoints under `backend/src/InvoiceApp.Api/Controllers/` in a `<Resource>Controller`, using the existing `api/[controller]` route convention.
3. Declare endpoint-specific request and response records inline in the controller. Move a record to `InvoiceApp.Domain` only when it is shared across controllers or is part of a domain/repository contract.
4. Keep business rules in the domain/service layer where appropriate. Depend on repository interfaces from `InvoiceApp.Domain`; register new services in `Program.cs` and add an in-memory API implementation when the demo needs one.
5. Add tests for every new endpoint in `backend/tests/InvoiceApp.Tests/`. Use xUnit and one `<ClassUnderTest>Tests` class per class under test. Cover the successful response, relevant validation/not-found cases, and observable repository or service effects.
6. Run `dotnet format` for the affected backend projects and `dotnet test tests/InvoiceApp.Tests/InvoiceApp.Tests.csproj` from `backend/`. Report any unavailable checks or unrelated existing failures.

## Repository Guardrails

- Preserve established routes and public contracts unless the requested behavior requires changing them.
- Do not add credentials or real customer data.
- Do not touch `demo-assets/session2/demo12-security/` outside its security-review demo, and never wire that intentionally vulnerable code into `Program.cs`.
