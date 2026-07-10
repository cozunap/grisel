import os
import glob

pages_dir = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/src/pages"
files = glob.glob(os.path.join(pages_dir, "*.tsx"))

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # The footer logo is currently something like:
    # <div className="brand">
    #   <img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "60px" }} />
    # </div>
    # We want to wrap the img in an <a> tag.
    
    old_footer_brand = """<div className="brand">
          <img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "60px" }} />
        </div>"""
        
    new_footer_brand = """<div className="brand">
          <a href="/"><img src="/assets/grisel-logo.svg" alt="Grisel Beauty Spa" style={{ height: "60px" }} /></a>
        </div>"""

    content = content.replace(old_footer_brand, new_footer_brand)

    with open(file, 'w') as f:
        f.write(content)
        
print("Footer logos made clickable successfully!")
