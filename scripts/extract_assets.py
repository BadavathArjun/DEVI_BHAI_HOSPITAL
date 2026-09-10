import os
from PIL import Image

RAW_DIR = r"C:\Users\badav\.gemini\antigravity-ide\brain\8e8b6406-8e76-4d60-a34f-6c84600f9d6c\raw_assets"
PUBLIC_DIR = r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\public\assets"

os.makedirs(os.path.join(PUBLIC_DIR, "branding"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_DIR, "doctors"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_DIR, "insurance"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_DIR, "facilities"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_DIR, "gallery"), exist_ok=True)

# 1. Process 1.38.20 - Hospital Board & Logos
p_board = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.38.20 PM.jpeg")
if os.path.exists(p_board):
    img_board = Image.open(p_board)
    img_board.save(os.path.join(PUBLIC_DIR, "branding", "hospital-board.jpg"), quality=95)
    img_board.save(os.path.join(PUBLIC_DIR, "gallery", "hospital-board-main.jpg"), quality=95)
    
    # DB logo crop
    db_logo = img_board.crop((170, 70, 620, 390))
    db_logo.save(os.path.join(PUBLIC_DIR, "branding", "db-logo.jpg"), quality=95)

    # Mother & Child C emblem
    c_emblem = img_board.crop((30, 440, 330, 810))
    c_emblem.save(os.path.join(PUBLIC_DIR, "branding", "fertility-emblem.jpg"), quality=95)

    # Header full logo mark
    header_logo = img_board.crop((30, 60, 1420, 400))
    header_logo.save(os.path.join(PUBLIC_DIR, "branding", "hospital-header-brand.jpg"), quality=95)
    print("Hospital board & branding extracted successfully.")

# 2. Process 1.39.05 - Doctors
p_doctors = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.39.05 PM.jpeg")
if os.path.exists(p_doctors):
    img_doc = Image.open(p_doctors)
    img_doc_rot = img_doc.rotate(90, expand=True) # Upright (1600, 742)
    img_doc_rot.save(os.path.join(PUBLIC_DIR, "gallery", "all-doctors-team.jpg"), quality=95)

    # Doctor 1: Dr. K. Chandrika (OBGY, Fertility & IVF)
    d1 = img_doc_rot.crop((20, 15, 320, 460))
    d1.save(os.path.join(PUBLIC_DIR, "doctors", "dr-k-chandrika.jpg"), quality=95)
    d1_card = img_doc_rot.crop((10, 10, 335, 680))
    d1_card.save(os.path.join(PUBLIC_DIR, "doctors", "dr-k-chandrika-full.jpg"), quality=95)

    # Doctor 2: Dr. K. Avinash Kasamwar (General & Laparoscopic Surgery)
    d2 = img_doc_rot.crop((330, 50, 640, 470))
    d2.save(os.path.join(PUBLIC_DIR, "doctors", "dr-k-avinash-kasamwar.jpg"), quality=95)
    d2_card = img_doc_rot.crop((320, 40, 645, 680))
    d2_card.save(os.path.join(PUBLIC_DIR, "doctors", "dr-k-avinash-kasamwar-full.jpg"), quality=95)

    # Doctor 3: Dr. Prashant Kumar Waghmare (General Medicine, Diabetology & Critical Care)
    d3 = img_doc_rot.crop((650, 80, 940, 480))
    d3.save(os.path.join(PUBLIC_DIR, "doctors", "dr-prashant-kumar-waghmare.jpg"), quality=95)
    d3_card = img_doc_rot.crop((640, 70, 955, 680))
    d3_card.save(os.path.join(PUBLIC_DIR, "doctors", "dr-prashant-kumar-waghmare-full.jpg"), quality=95)

    # Doctor 4: Dr. Sudheer Kumar G (Pediatrics & Neonatology)
    d4 = img_doc_rot.crop((970, 90, 1250, 490))
    d4.save(os.path.join(PUBLIC_DIR, "doctors", "dr-sudheer-kumar-g.jpg"), quality=95)
    d4_card = img_doc_rot.crop((955, 80, 1265, 680))
    d4_card.save(os.path.join(PUBLIC_DIR, "doctors", "dr-sudheer-kumar-g-full.jpg"), quality=95)

    # Doctor 5: Dr. K. Ravichandra (Visiting Consultant Urologist)
    d5 = img_doc_rot.crop((1280, 95, 1560, 500))
    d5.save(os.path.join(PUBLIC_DIR, "doctors", "dr-k-ravichandra.jpg"), quality=95)
    d5_card = img_doc_rot.crop((1265, 85, 1580, 680))
    d5_card.save(os.path.join(PUBLIC_DIR, "doctors", "dr-k-ravichandra-full.jpg"), quality=95)

    print("All 5 doctor portraits extracted successfully.")

# 3. Process 1.44.05 - Insurance Logos & Urology/Laser Section
p_ins = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.44.05 PM.jpeg")
if os.path.exists(p_ins):
    img_ins = Image.open(p_ins) # (1600, 574)
    img_ins.save(os.path.join(PUBLIC_DIR, "gallery", "insurance-brochure-banner.jpg"), quality=95)

    # 8 Insurance logos (horizontal strip y: 260..510)
    y1, y2 = 260, 510
    logos = [
        ("aarogyasri", 70, 270),
        ("aditya-birla", 270, 470),
        ("ericson", 470, 670),
        ("akna", 665, 840),
        ("galaxy", 835, 1025),
        ("volo", 1025, 1205),
        ("icici-lombard", 1205, 1400),
        ("telangana-ehs", 1400, 1580),
    ]
    for name, x1, x2 in logos:
        crop_logo = img_ins.crop((x1, y1, x2, y2))
        crop_logo.save(os.path.join(PUBLIC_DIR, "insurance", f"{name}.jpg"), quality=95)

    # Urology feature
    uro_crop = img_ins.crop((40, 20, 350, 250))
    uro_crop.save(os.path.join(PUBLIC_DIR, "facilities", "urology-care.jpg"), quality=95)
    print("Insurance logos and urology assets extracted successfully.")

# 4. Process 1.42.21 - Infertility & Maternal Care Brochure
p_inf = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.42.21 PM.jpeg")
if os.path.exists(p_inf):
    img_inf = Image.open(p_inf).rotate(90, expand=True)
    img_inf.save(os.path.join(PUBLIC_DIR, "gallery", "infertility-maternal-brochure.jpg"), quality=95)
    maternal_photo = img_inf.crop((120, 20, 1200, 400))
    maternal_photo.save(os.path.join(PUBLIC_DIR, "facilities", "maternal-fetal-monitoring.jpg"), quality=95)
    print("Infertility and maternal brochure assets extracted.")

# 5. Process 1.42.43 - Surgical & Laparoscopic Care Brochure
p_surg = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.42.43 PM.jpeg")
if os.path.exists(p_surg):
    img_surg = Image.open(p_surg).rotate(90, expand=True)
    img_surg.save(os.path.join(PUBLIC_DIR, "gallery", "surgical-laparoscopy-brochure.jpg"), quality=95)
    ot_photo = img_surg.crop((120, 20, 1200, 410))
    ot_photo.save(os.path.join(PUBLIC_DIR, "facilities", "laparoscopic-surgery-ot.jpg"), quality=95)
    print("Surgical and laparoscopic brochure assets extracted.")

# 6. Process 1.43.07 - Emergency & Medical Brochure
p_em = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.43.07 PM.jpeg")
if os.path.exists(p_em):
    img_em = Image.open(p_em).rotate(90, expand=True)
    img_em.save(os.path.join(PUBLIC_DIR, "gallery", "emergency-medical-brochure.jpg"), quality=95)
    em_photo = img_em.crop((120, 20, 1200, 410))
    em_photo.save(os.path.join(PUBLIC_DIR, "facilities", "emergency-trauma-care.jpg"), quality=95)
    print("Emergency brochure assets extracted.")

# 7. Process 1.43.42 - Pediatric & Neonatal Brochure
p_ped = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.43.42 PM.jpeg")
if os.path.exists(p_ped):
    img_ped = Image.open(p_ped).rotate(90, expand=True)
    img_ped.save(os.path.join(PUBLIC_DIR, "gallery", "pediatric-neonatal-brochure.jpg"), quality=95)
    ped_photo = img_ped.crop((120, 20, 1200, 420))
    ped_photo.save(os.path.join(PUBLIC_DIR, "facilities", "pediatric-neonatal-care.jpg"), quality=95)
    print("Pediatric brochure assets extracted.")

# 8. Process 1.37.49 - Vertical Hospital Board
p_vert = os.path.join(RAW_DIR, "WhatsApp Image 2026-09-10 at 1.37.49 PM.jpeg")
if os.path.exists(p_vert):
    img_v = Image.open(p_vert).rotate(90, expand=True)
    img_v.save(os.path.join(PUBLIC_DIR, "branding", "hospital-sign-strip.jpg"), quality=95)
    print("Vertical sign extracted.")

print("\n--- ALL ASSETS EXTRACTED SUCCESSFULLY ---")
