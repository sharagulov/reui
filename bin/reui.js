#!/usr/bin/env node

const fsExtra = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const templatesDir = path.join(__dirname, '../templates');

const getComponentsList = () => fsExtra.readdirSync(templatesDir);

(async () => {
  const { components } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'components',
      message: 'Select components to add:',
      choices: getComponentsList(),
    },
  ]);

  components.forEach((componentName) => {
    const targetPath = path.join(process.cwd(), 'src/components', componentName);
    const templatePath = path.join(templatesDir, componentName);

    if (fsExtra.existsSync(targetPath)) {
      console.log(`❌ ${componentName} already exists. Skipping.`);
      return;
    }

    fsExtra.copySync(templatePath, targetPath);
    console.log(`✅ ${componentName} added successfully!`);
  });

  console.log(`🛠 Formatting code...`);
  execSync('npx prettier --write src/components', { stdio: 'inherit' });

  console.log(`🚀 All components installed and formatted!`);
})();
