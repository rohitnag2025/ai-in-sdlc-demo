let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  input += chunk;
});
process.stdin.on('end', () => {
  try {
    const event = JSON.parse(input);
    if (!/plan/i.test(String(event.agent_type || ''))) {
      return;
    }

    process.stdout.write(`${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'SubagentStart',
        additionalContext: [
          'Plan the user story only; do not edit files or run commands.',
          'Return concise Markdown with these sections, in order:',
          '1. Goal and scope, including explicit exclusions',
          '2. Existing code and reuse points, naming relevant files and symbols',
          '3. Files to add/update: list every expected file, label it ADD or UPDATE, use a repository-relative path from the workspace root with / separators, and give its purpose; never use absolute paths; say None expected if there are no file changes',
          '4. Assumptions and open questions, clearly separated',
          '5. Ordered implementation steps mapped to acceptance criteria and dependencies',
          '6. Verification: focused tests, commands, and manual checks',
          '7. Risks and relevant edge cases, including non-functional needs',
          '8. Sprint fit and suggested story splits if the work is too large',
          'Do not claim implementation or test completion in a plan.'
        ].join('\n')
      }
    })}\n`);
  } catch (error) {
    process.stderr.write(`Could not format planning context: ${error.message}\n`);
    process.exitCode = 1;
  }
});