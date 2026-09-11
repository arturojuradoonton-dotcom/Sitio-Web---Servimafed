const fs = require('fs');
const path = require('path');

const updateHeroImages = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      updateHeroImages(fullPath);
    } else if (file.name === 'page.tsx' || file.name === 'not-found.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Determine feature name
      let featureName = path.basename(dir);
      if (featureName === 'app') {
          if (file.name === 'not-found.tsx') featureName = '404';
          else featureName = 'inicio';
      }

      // Replace /images/block-bg-X.jpg with unique path
      if (content.match(/\/images\/block-bg-\d+\.jpg/)) {
        content = content.replace(
          /\/images\/block-bg-\d+\.jpg/g,
          `/images/fondos/hero-${featureName}.jpg`
        );
        fs.writeFileSync(fullPath, content);
        console.log(`Updated hero image in ${fullPath}`);
      }
    }
  }
};

updateHeroImages('src/app');
