#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your project?',
      initial: 'my-boba-app',
    });
    projectName = response.projectName;
  }

  if (!projectName) {
    console.error('Project name is required.');
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), projectName);
  const templatePath = path.resolve(__dirname, '../template');

  if (fs.existsSync(projectPath)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new Boba app in ${projectPath}...`);

  try {
    await fs.mkdir(projectPath);
    await fs.copy(templatePath, projectPath);

    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log('Success! Your new Boba app is ready.');
    console.log(`To get started, run the following commands:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
  } catch (error) {
    console.error('Error creating the app:', error);
    fs.removeSync(projectPath); // Clean up the created directory on error
    process.exit(1);
  }
}

main();
