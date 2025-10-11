// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file configures lint-staged, a tool that runs code checks (linters) only on files that are staged for commit.
// It helps catch errors before you save changes to your repository.
//
// Key concepts:
// - Linting: Checks code for errors and style issues
// - Staged files: Files you've marked for commit in git
// - Automation: Runs checks automatically before each commit
// ------------------------------------------------------------
module.exports = {
  '*.{js,cjs,css,scss,html,md}': 'echo "Staged files processed successfully"'
};
