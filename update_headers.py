import os
import glob
import re

pages_dir = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages"
files = glob.glob(os.path.join(pages_dir, "*.tsx"))

logo_html = '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "40px" }} />'

old_nav = """        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/membership">Membership</a></li>
        <li><a href="/gift-cards">Gift Cards</a></li>
        <li><a href="/contact">Contact</a></li>"""

new_nav = """        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/membership">Membership</a></li>
        <li><a href="/gift-cards">Gift Cards</a></li>
        <li><a href="/contact">Contact</a></li>"""

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Replace logo in header
    content = re.sub(r'<span>Grisel Beauty Spa</span>', logo_html, content)
    
    # Replace nav links
    content = content.replace(old_nav, new_nav)
    
    # Also fix footer logo if applicable
    footer_logo_html = '<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "40px", filter: "brightness(0) invert(1)" }} />'
    
    # The footer brand span replacement (a bit tricky, let's just do it broadly)
    content = re.sub(r'<div className="brand">\s*<img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "40px" }} />\s*</div>', 
                     r'<div className="brand">\n          ' + footer_logo_html + '\n        </div>', content)

    with open(file, 'w') as f:
        f.write(content)
        
print("Headers updated successfully!")
