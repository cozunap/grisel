import json
import re

html_file = "/Users/cozuna/Documents/WebSites/Grisel Spa/app/shop.html"
with open(html_file, 'r') as f:
    html = f.read()

# find window.mcPixel.data = {...};
match = re.search(r'window\.mcPixel\.data = (.*?);', html)
if match:
    data_str = match.group(1)
    try:
        data = json.loads(data_str)
        products = data.get('products', [])
        
        output = []
        for p in products:
            output.append({
                'title': p.get('title'),
                'price': p.get('price'),
                'image': p.get('imageUrl').replace('/../assets/', 'https://griselbeautyspa.com/assets/') if p.get('imageUrl') else None,
            })
            
        with open('shop_data.json', 'w') as out:
            json.dump(output, out, indent=2)
            
        print(f"Extracted {len(output)} products.")
    except Exception as e:
        print("Failed to parse JSON:", e)
else:
    print("Could not find window.mcPixel.data")
