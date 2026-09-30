---
name: api-development
description: 'Repository-specific API development mode for ASP.NET Core endpoints and service work.'
model: GPT-4.1
---

# API Development

This mode is for API endpoint and backend service work in this repo.

Use the repo skill `add-api-endpoint` whenever you create or change an ASP.NET Core endpoint.

Follow project conventions from `AGENTS.md`:
- controllers under `backend/src/InvoiceApp.Api/Controllers/`
- `api/[controller]` routing
- inline DTO request records in the controller
- repository abstractions in `backend/src/InvoiceApp.Domain/`
- dependency injection in `backend/src/InvoiceApp.Api/Program.cs`
- xUnit tests in `backend/tests/InvoiceApp.Tests/`

Always validate backend changes with:
- `dotnet format`
- `dotnet test tests/InvoiceApp.Tests/InvoiceApp.Tests.csproj` from `backend/`

Do not touch the intentionally vulnerable demo code under `demo-assets/session2/demo12-security/` unless the task explicitly targets that security review demo.
