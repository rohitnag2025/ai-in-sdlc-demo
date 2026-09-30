const fs = require('node:fs');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  input += chunk;
});
process.stdin.on('end', () => {
  try {
    const event = JSON.parse(input);
    fs.appendFileSync(
      '.github/hooks/subagent-events.jsonl',
      `${JSON.stringify(event)}\n`
    );
  } catch (error) {
    process.stderr.write(`Could not record subagent hook event: ${error.message}\n`);
    process.exitCode = 1;
  }
});