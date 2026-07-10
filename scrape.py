import urllib.request
from bs4 import BeautifulSoup
import json

url = "https://griselbeautyspa.com/shop/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    
    products = []
    
    # WooCommerce default class is usually 'product'
    for li in soup.select('li.product'):
        title_elem = li.select_one('.woocommerce-loop-product__title')
        price_elem = li.select_one('.price')
        img_elem = li.select_one('img')
        link_elem = li.select_one('a.woocommerce-LoopProduct-link')
        
        title = title_elem.get_text(strip=True) if title_elem else "Unknown"
        price = price_elem.get_text(strip=True) if price_elem else "Unknown"
        img = img_elem['src'] if img_elem and img_elem.has_attr('src') else ""
        # Sometimes they use srcset or data-src, so let's try others if src is missing or placeholder
        if img_elem:
            if img_elem.has_attr('data-src'):
                img = img_elem['data-src']
            elif img_elem.has_attr('srcset'):
                img = img_elem['srcset'].split(' ')[0]
                
        link = link_elem['href'] if link_elem and link_elem.has_attr('href') else ""
        
        products.append({
            'title': title,
            'price': price,
            'image': img,
            'link': link
        })
        
    print(json.dumps(products, indent=2))
except Exception as e:
    print("Error:", e)
