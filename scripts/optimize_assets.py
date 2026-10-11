import os
from PIL import Image

ASSET_DIRS = [
    'public/assets/branding',
    'public/assets/doctors',
    'public/assets/facilities',
    'public/assets/insurance',
    'public/assets/gallery',
    'src/assets'
]

def optimize_image(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png']:
        return

    orig_size = os.path.getsize(filepath)
    webp_path = os.path.splitext(filepath)[0] + '.webp'

    try:
        with Image.open(filepath) as img:
            # Handle RGBA vs RGB
            is_rgba = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)

            # Generate WebP version
            if is_rgba:
                img.save(webp_path, 'WEBP', quality=85, method=6)
            else:
                rgb_img = img.convert('RGB')
                rgb_img.save(webp_path, 'WEBP', quality=82, method=6)

            # Also optimize original file in-place if possible
            if ext in ['.jpg', '.jpeg']:
                rgb_img = img.convert('RGB')
                # Resize if absurdly huge (over 1920 width)
                if rgb_img.width > 1920:
                    ratio = 1920 / rgb_img.width
                    new_size = (1920, int(rgb_img.height * ratio))
                    rgb_img = rgb_img.resize(new_size, Image.Resampling.LANCZOS)
                rgb_img.save(filepath, 'JPEG', quality=82, optimize=True, progressive=True)
            elif ext == '.png':
                # Re-save PNG with optimization
                if img.width > 1920:
                    ratio = 1920 / img.width
                    new_size = (1920, int(img.height * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                img.save(filepath, 'PNG', optimize=True)

        new_orig_size = os.path.getsize(filepath)
        webp_size = os.path.getsize(webp_path) if os.path.exists(webp_path) else 0

        print(f"Optimized {os.path.basename(filepath)}: Orig: {orig_size/1024:.1f}KB -> Compressed: {new_orig_size/1024:.1f}KB | WebP: {webp_size/1024:.1f}KB")
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

def main():
    print("Starting automated image optimization for high Core Web Vitals...")
    count = 0
    for folder in ASSET_DIRS:
        if not os.path.exists(folder):
            continue
        for root, dirs, files in os.walk(folder):
            for f in files:
                if f.lower().endswith(('.jpg', '.jpeg', '.png')):
                    fp = os.path.join(root, f)
                    optimize_image(fp)
                    count += 1
    print(f"\nCompleted optimization of {count} images across all asset directories!")

if __name__ == '__main__':
    main()
