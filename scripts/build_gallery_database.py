import os
import json
import shutil
import re

PHOTOS_DIR = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\photos"
PUBLIC_PHOTOS_DIR = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\public\photos"
GALLERY_TS_PATH = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\src\data\gallery.ts"
JSON_LIST = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\scripts\unique_photos.json"

os.makedirs(PUBLIC_PHOTOS_DIR, exist_ok=True)

with open(JSON_LIST, "r", encoding="utf-8") as f:
    unique_photos = json.load(f)

print(f"Loaded {len(unique_photos)} photos.")

# Let's write the detailed database of all 372 items
# We'll map each index (0 to 371) to its specific title, category, and caption.
