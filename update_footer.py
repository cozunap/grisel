import os
import glob

pages_dir = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages"
files = glob.glob(os.path.join(pages_dir, "*.tsx"))

old_link = 'Site by <a href="https://ariaria.ai/case-studies/grisel-case-study.html" style={{ color: "inherit", textDecoration: "underline" }}>Ariaria</a>'
new_link = 'Site by <a href="https://cozuna.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>cozuna.com</a>'

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Replace the footer link
    content = content.replace(old_link, new_link)

    with open(file, 'w') as f:
        f.write(content)
        
print("Footers updated successfully!")
