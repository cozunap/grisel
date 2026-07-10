import os
import glob

pages_dir = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages"
files = glob.glob(os.path.join(pages_dir, "*.tsx"))

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Revert the logo size in the header back to 80px
    content = content.replace(
        '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "160px" }} />',
        '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "80px" }} />'
    )

    with open(file, 'w') as f:
        f.write(content)

print("Reverted header logos.")
