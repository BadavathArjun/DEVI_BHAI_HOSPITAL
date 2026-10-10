import json
import os
import re

GALLERY_TS_PATH = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\src\data\gallery.ts"
NEW_ITEMS_JSON = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\scripts\generated_gallery_items.json"

with open(NEW_ITEMS_JSON, "r", encoding="utf-8") as f:
    new_items = json.load(f)

# Read existing file to extract current items
with open(GALLERY_TS_PATH, "r", encoding="utf-8") as f:
    orig_content = f.read()

# Parse existing items
# Let's extract each object in GALLERY_ITEMS
pattern = re.compile(
    r"\{\s*id:\s*'([^']+)',\s*title:\s*(?:'([^']*)'|\"([^\"]*)\"),\s*category:\s*'([^']+)',\s*image:\s*'([^']+)',\s*caption:\s*(?:'([^']*)'|\"([^\"]*)\")\s*\}",
    re.MULTILINE | re.DOTALL
)

existing_items = []
for m in pattern.finditer(orig_content):
    gid = m.group(1)
    gtitle = m.group(2) if m.group(2) is not None else m.group(3)
    gcat = m.group(4)
    gimg = m.group(5)
    gcap = m.group(6) if m.group(6) is not None else m.group(7)
    existing_items.append({
        "id": gid,
        "title": gtitle,
        "category": gcat,
        "image": gimg,
        "caption": gcap
    })

print(f"Extracted {len(existing_items)} existing items.")

# Combine existing items with new items
all_items = existing_items + new_items
print(f"Total merged items: {len(all_items)}")

# Helper to escape single quotes
def esc(s):
    if not s:
        return ""
    return s.replace("\\", "\\\\").replace("'", "\\'")

# Generate TypeScript code
lines = [
    "import { GalleryItem } from '../types';",
    "",
    "export const GALLERY_ITEMS: GalleryItem[] = ["
]

for i, it in enumerate(all_items):
    comma = "," if i < len(all_items) - 1 else ""
    lines.append("  {")
    lines.append(f"    id: '{esc(it['id'])}',")
    lines.append(f"    title: '{esc(it['title'])}',")
    lines.append(f"    category: '{esc(it['category'])}',")
    lines.append(f"    image: '{esc(it['image'])}',")
    lines.append(f"    caption: '{esc(it['caption'])}'")
    lines.append(f"  }}{comma}")

lines.append("];")
lines.append("")

with open(GALLERY_TS_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Successfully wrote {len(all_items)} items to {GALLERY_TS_PATH}")
