const { spawnSync } = require('node:child_process');
const os = require('node:os');
const path = require('node:path');

let event;
try {
  event = JSON.parse(require('node:fs').readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const toolName = String(event.tool_name || '').replace(/[^a-z]/gi, '').toLowerCase();
const fileEditTools = new Set([
  'applypatch',
  'createfile',
  'editfile',
  'writefile',
  'editfiles',
  'writefiles',
  'replacestring',
  'multireplacestring',
  'insertedit',
  'editnotebookfile',
  'createnewjupyternotebook',
]);

if (!fileEditTools.has(toolName)) {
  process.exit(0);
}

const backendRoot = path.resolve(__dirname, '..', '..', 'backend');
const isolatedOutput = path.join(os.tmpdir(), 'AiWorkshopNagp-dotnet-validation', 'bin');
const commands = [
  ['format', 'src/InvoiceApp.Domain/InvoiceApp.Domain.csproj', '--no-restore'],
  ['format', 'src/InvoiceApp.Api/InvoiceApp.Api.csproj', '--no-restore'],
  ['format', 'tests/InvoiceApp.Tests/InvoiceApp.Tests.csproj', '--no-restore'],
  ['test', 'tests/InvoiceApp.Tests/InvoiceApp.Tests.csproj', `-p:BaseOutputPath=${isolatedOutput}${path.sep}`],
];

for (const args of commands) {
  const result = spawnSync('dotnet', args, {
    cwd: backendRoot,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.error || result.status !== 0) {
    process.stderr.write(result.stdout || '');
    process.stderr.write(result.stderr || '');
    process.stderr.write(`Validation failed: dotnet ${args.join(' ')}\n`);
    process.exit(2);
  }
}
