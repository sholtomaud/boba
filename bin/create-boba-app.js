#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

// Local install and build output of the template itself; never part of an app.
const SKIP = ['node_modules', 'dist', 'playwright-report', 'test-results'];

async function main() {
  let projectName = process.argv[2];

  if (!projectName) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    projectName =
      (await rl.question(
        'What is the name of your project? (default: my-boba-app) '
      )) || 'my-boba-app';
    rl.close();
  }

  const projectPath = path.resolve(process.cwd(), projectName);
  const templatePath = path.resolve(import.meta.dirname, '..', 'template');

  if (fs.existsSync(projectPath)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new Boba app in ${projectPath}...`);

  try {
    await fs.promises.cp(templatePath, projectPath, {
      recursive: true,
      filter: (source) => !SKIP.includes(path.basename(source)),
    });

    // npm leaves files named .gitignore out of packages, so the template
    // stores its one under another name.
    await fs.promises.rename(
      path.join(projectPath, 'gitignore'),
      path.join(projectPath, '.gitignore')
    );

    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(
      await fs.promises.readFile(packageJsonPath, 'utf-8')
    );
    packageJson.name = path.basename(projectPath);
    await fs.promises.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n'
    );

    console.log('Success! Your new Boba app is ready.');
    console.log(`To get started, run the following commands:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npm start`);
  } catch (error) {
    console.error('Error creating the app:', error);
    fs.rmSync(projectPath, { recursive: true, force: true }); // Clean up the created directory on error
    process.exit(1);
  }
}

main();
