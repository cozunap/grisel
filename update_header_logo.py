import os
import glob
import re

pages_dir = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages"
files = glob.glob(os.path.join(pages_dir, "*.tsx"))

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Increase the logo size in the header
    content = content.replace(
        '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "80px" }} />',
        '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "160px" }} />'
    )

    with open(file, 'w') as f:
        f.write(content)

print("Updated header logos.")
