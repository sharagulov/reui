const componentName = process.argv[2];
const targetPath = path.join(process.cwd(), 'src/components', componentName);
const templatePath = path.join(__dirname, '../templates', componentName);

fsExtra.copySync(templatePath, targetPath);
