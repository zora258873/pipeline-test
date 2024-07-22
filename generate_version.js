const fs = require('fs');
const path = './src/environments/';

function getBuildNumber() {
  const buildNumber = process.env.BUILD_BUILDNUMBER;
  if (!buildNumber) {
    throw new Error('BUILD_BUILDNUMBER environment variable is not set.');
  }
  console.log(`Build number: ${buildNumber}`);
  return buildNumber;
}

function getBuildType() {
  const buildType = process.env.BUILD_SOURCEBRANCH;
  if (!buildType) {
    throw new Error('BUILD_SOURCEBRANCH environment variable is not set.');
  }
  console.log(`Build type: ${buildType}`);
  return buildType;
}

//Only update the version in the dev environment
function updateVersion(newVersion) {
  let fileName = ['environment.ts', 'environment.dev.ts'];
  isProduction
    ? (fileName = ['environment.ts', 'environment.prod.ts'])
    : (fileName = ['environment.ts', 'environment.dev.ts']);
  fileName.forEach((fileName) => {
    const filePath = `${path}${fileName}`;
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/version: '\d+'/g, `version: '${newVersion}'`);
    fs.writeFileSync(filePath, content, 'utf8');
  });
  console.log(`Version updated to ${newVersion}`);
}

const isProduction = getBuildType();
const newVersion = getBuildNumber();
updateVersion(newVersion);