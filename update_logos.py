import os
import glob

pages_dir = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages"
files = glob.glob(os.path.join(pages_dir, "*.tsx"))

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Increase header logo size. It was set to 40px height.
    content = content.replace('<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "40px" }} />',
                              '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "80px" }} />')
                              
    # Remove filter from footer logo and maybe also increase size slightly or keep it.
    content = content.replace('<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "40px", filter: "brightness(0) invert(1)" }} />',
                              '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "60px" }} />')

    with open(file, 'w') as f:
        f.write(content)
        
print("Logos updated successfully!")
