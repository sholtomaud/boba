#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUDED_FILES = [
  'node_modules',
  'dist',
  '.git',
  'bin',
];

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

  EXCLUDED_FILES.push(projectName);

  const projectPath = path.resolve(process.cwd(), projectName);
  const templatePath = path.resolve(__dirname, '..');

  if (fs.existsSync(projectPath)) {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new Boba app in ${projectPath}...`);

  try {
    await fs.promises.mkdir(projectPath);

    const files = await fs.promises.readdir(templatePath);

    for (const file of files) {
        if (!EXCLUDED_FILES.includes(file) && !file.startsWith('.')) {
            await fs.promises.cp(path.join(templatePath, file), path.join(projectPath, file), { recursive: true });
        }
    }

    // Also copy dotfiles
    await fs.promises.cp(path.join(templatePath, '.github'), path.join(projectPath, '.github'), { recursive: true });
    await fs.promises.cp(path.join(templatePath, '.gitignore'), path.join(projectPath, '.gitignore'));
    await fs.promises.cp(path.join(templatePath, '.prettierrc.cjs'), path.join(projectPath, '.prettierrc.cjs'));


    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    packageJson.name = projectName;
    // remove bin entry from the created app's package.json
    if(packageJson.bin) delete packageJson.bin;
    // remove prompts from dependencies
    if(packageJson.dependencies && packageJson.dependencies.prompts) delete packageJson.dependencies.prompts;
    await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log('Success! Your new Boba app is ready.');
    console.log(`To get started, run the following commands:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
  } catch (error) {
    console.error('Error creating the app:', error);
    fs.rmSync(projectPath, { recursive: true, force: true }); // Clean up the created directory on error
    process.exit(1);
  }
}

main();
