import os
import re

file_path = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages/Services.tsx"

with open(file_path, "r") as f:
    content = f.read()

# We look for <div className="menu-item-name">NAME</div>...<div className="menu-item-note">Book to see pricing</div>
pattern = r'(<div className="menu-item-name">([^<]+)</div>\s*<span className="menu-item-duration">[^<]+</span>\s*</div>)\s*<div className="menu-item-note">Book to see pricing</div>'

def replacer(match):
    prefix = match.group(1)
    service_name = match.group(2)
    return f'{prefix}\n        <a href="/booking?service={service_name}" className="menu-item-note" style={{ textDecoration: "underline", color: "inherit" }}>Book services</a>'

new_content = re.sub(pattern, replacer, content)

with open(file_path, "w") as f:
    f.write(new_content)
