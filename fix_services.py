import os
import re

file_path = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages/Services.tsx"

with open(file_path, "r") as f:
    content = f.read()

new_content = content.replace('style={ textDecoration: "underline", color: "inherit" }', 'style={{ textDecoration: "underline", color: "inherit" }}')

with open(file_path, "w") as f:
    f.write(new_content)
