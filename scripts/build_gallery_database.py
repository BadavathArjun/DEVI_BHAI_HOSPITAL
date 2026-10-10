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

print(f"Total unique photos: {len(unique_photos)}")

# Define metadata rules and patterns for each index (0 to 371)
def get_metadata(idx, filename):
    # Determine slug, title, category, caption based on idx
    # Default category
    cat = "Hospital"
    title = ""
    caption = ""
    slug_prefix = f"devi-photo-{idx+1:03d}"
    
    # 0
    if idx == 0:
        cat = "Events & Celebrations"
        title = "Vennela Dance Academy Cultural & Youth Talent Event"
        caption = "Dr. K. Chandrika felicitating and encouraging young classical dancers in traditional attire at Vennela Dance Academy in Nirmal."
        slug_prefix = "vennela-dance-academy-felicitation"
    # 1 - 7: Dr. Chandrika's Fertility (IVF) & Laparoscopic Centre Opening
    elif idx in [1, 2, 3, 4, 5, 6]:
        cat = "Events & Celebrations"
        titles = [
            "Inauguration Gathering at Dr. Chandrika's Fertility & IVF Centre",
            "Dr. K. Chandrika Welcoming Community Guests at Opening Ceremony",
            "Dignitaries and Political Leaders at Fertility Centre Inauguration",
            "Traditional Shawl Felicitation by Community Leaders at Opening",
            "BRS & Regional Leaders Honoring Dr. Chandrika and Dr. Avinash",
            "Supporters & Well-Wishers Gathered at Dr. Chandrika's Fertility Centre"
        ]
        captions = [
            "Distinguished guests, doctors, and community leaders gathered at the grand inauguration of Dr. Chandrika’s Fertility (IVF) & Laparoscopic Centre in Nirmal.",
            "Dr. K. Chandrika cordially welcoming local dignitaries and community elders during the inaugural celebrations.",
            "Elected representatives and regional leaders extending warm congratulations to Dr. Chandrika and Dr. Avinash Kasamwar.",
            "Elders and community members conferring celebratory silk shawls upon Dr. Chandrika and Dr. Avinash Kasamwar.",
            "Local political representatives and community leaders expressing appreciation for bringing advanced reproductive healthcare to Nirmal.",
            "Auspicious gathering of well-wishers and medical colleagues celebrating the state-of-the-art fertility clinic launch."
        ]
        title = titles[idx - 1]
        caption = captions[idx - 1]
        slug_prefix = f"fertility-centre-inauguration-{idx}"
    elif idx == 7:
        cat = "Facilities"
        title = "Specialized Nursery & Clinical Unit Facility Inspection"
        caption = "Dr. Chandrika and visiting leaders inspecting the newly established clinical unit and infant recovery beds at Devibai Hospital."
        slug_prefix = "nursery-clinical-unit-inspection"
    elif idx in [8, 9]:
        cat = "Hospital"
        titles = [
            "Well-Wishers and Citizens Gathered in Hospital Reception",
            "Dr. Chandrika Interacting with Visitors at Opening Celebration"
        ]
        captions = [
            "Large community gathering in the spacious hospital lobby for the formal opening of specialized hospital wings.",
            "Dr. K. Chandrika discussing women’s reproductive health initiatives with attendees and community representatives."
        ]
        title = titles[idx - 8]
        caption = captions[idx - 8]
        slug_prefix = f"hospital-reception-gathering-{idx-7}"
    elif idx in [10, 11]:
        cat = "Hospital"
        title = f"Floral Bouquet Welcome at Reception Lobby (Part {idx-9})"
        caption = "Devibai Super Speciality Hospital reception team welcoming honored guests and doctors with celebratory floral bouquets."
        slug_prefix = f"reception-floral-welcome-{idx-9}"
    elif idx == 12:
        cat = "Doctors"
        title = "Clinical Consultation with Gynecologist Dr. K. Chandrika"
        caption = "Dr. K. Chandrika conducting in-depth clinical consultation in the outpatient chamber at Devibai Hospital Nirmal."
        slug_prefix = "dr-chandrika-consultation-chamber"
    elif idx in [13, 14, 15, 16]:
        cat = "Events & Celebrations"
        titles = [
            "Felicitation with Commemorative Memento at Fertility Centre",
            "Community Honor Ceremony for Dr. Avinash & Dr. Chandrika",
            "Mementos of Appreciation Presented by Nirmal Leaders",
            "Dr. Avinash Kasamwar Honored with Silk Shawl & Memento"
        ]
        captions = [
            "Regional leaders presenting an engraved memento of appreciation to Dr. K. Avinash Kasamwar and Dr. K. Chandrika.",
            "Community elders honoring the doctor couple for their relentless healthcare service to families across united Adilabad district.",
            "Community representatives congratulating the founders on establishing world-class medical facilities in Nirmal.",
            "Dr. K. Avinash Kasamwar receiving commemorative honors from prominent citizens and grateful patient families."
        ]
        title = titles[idx - 13]
        caption = captions[idx - 13]
        slug_prefix = f"inaugural-felicitation-memento-{idx-12}"
    # 17 - 20: Former Minister Allola Indrakaran Reddy News & Media Coverage
    elif idx in [17, 18, 19]:
        cat = "Awards & Recognition"
        titles = [
            "Andhra Prabha Feature — Former Minister Indrakaran Reddy Visits Hospital",
            "Print Press Feature — Former Minister Allola Indrakaran Reddy at Devibai Hospital",
            "Digital News Report — Former Minister Tours Devibai Hospital Facilities"
        ]
        captions = [
            "Andhra Prabha newspaper coverage on Former Minister Allola Indrakaran Reddy visiting Devibai Super Speciality Hospital and praising its cutting-edge facilities.",
            "Prominent newspaper article highlighting Former Minister Indrakaran Reddy appreciating the advanced IVF center and specialized surgical units in Nirmal.",
            "Special media report documenting the Former Minister’s comprehensive visit to Devibai Hospital's critical care and fertility wings."
        ]
        title = titles[idx - 17]
        caption = captions[idx - 17]
        slug_prefix = f"minister-indrakaran-reddy-news-{idx-16}"
    # 20 - 26: Former Minister Indrakaran Reddy Visit & IVF Lab Tour
    elif idx == 20:
        cat = "Hospital"
        title = "Welcoming Former Minister Allola Indrakaran Reddy with Floral Bouquet"
        caption = "Dr. K. Avinash Kasamwar and Dr. K. Chandrika warmly welcoming Former Minister Allola Indrakaran Reddy at the hospital campus entrance."
        slug_prefix = "minister-indrakaran-reddy-floral-welcome"
    elif idx == 21:
        cat = "Surgery"
        title = "Operation Theatre Scrub Team and Surgical Technicians"
        caption = "Modular OT staff, scrub nurses, and theatre technicians gathered with Dr. Avinash and Dr. Chandrika in the surgical wing."
        slug_prefix = "surgical-ot-scrub-technicians-team"
    elif idx == 22:
        cat = "Fertility & IVF"
        title = "State-of-the-Art IVF & ICSI Micromanipulator Lab Inspection"
        caption = "Former Minister Allola Indrakaran Reddy observing the advanced ICSI micromanipulator microscope and embryology workstation alongside Dr. Avinash and Dr. Chandrika."
        slug_prefix = "advanced-ivf-icsi-lab-inspection-minister"
    elif idx in [23, 24, 25]:
        cat = "Fertility & IVF"
        titles = [
            "Former Minister Allola Indrakaran Reddy with Dr. Avinash & Dr. Chandrika",
            "Fertility Centre Reception Gathering with Former Minister",
            "Ministerial Felicitation of Dr. Chandrika & Dr. Avinash"
        ]
        captions = [
            "Former Minister Indrakaran Reddy commending Dr. Avinash Kasamwar and Dr. K. Chandrika for bringing metropolitan-standard IVF technology to rural Nirmal.",
            "Dignitaries, doctors, and hospital administrators in the dedicated Dr. Chandrika's Fertility Centre lobby.",
            "Former Minister Allola Indrakaran Reddy honoring Dr. Avinash and Dr. Chandrika with celebratory shawls and floral tributes."
        ]
        title = titles[idx - 23]
        caption = captions[idx - 23]
        slug_prefix = f"minister-indrakaran-reddy-fertility-{idx-22}"
    elif idx in [26, 27]:
        cat = "Hospital"
        titles = [
            "Presenting Plant Sapling Memento to Dignitaries",
            "Dignitaries Walking Through Hospital Inpatient Corridors"
        ]
        captions = [
            "Dr. Avinash presenting an eco-friendly plant sapling memento welcoming prominent guests to Devibai Hospital.",
            "Former Minister and community delegates touring the patient corridors and modern clinical rooms."
        ]
        title = titles[idx - 26]
        caption = captions[idx - 26]
        slug_prefix = f"hospital-tour-dignitaries-{idx-25}"
    elif idx == 28:
        cat = "Hospital"
        title = "Devibai Super Speciality Hospital Main Entrance Stairway"
        caption = "Grand entrance staircase and facade of Devibai Super Speciality Hospital during inaugural celebrations."
        slug_prefix = "hospital-entrance-stairway-inauguration"
    elif idx in [29, 30]:
        cat = "Events & Celebrations"
        titles = [
            "Presenting Rose Bouquet to Dr. Avinash & Dr. Chandrika",
            "Photo Wall Felicitation at Dr. Chandrika's Fertility Centre"
        ]
        captions = [
            "Supporters presenting fresh bouquets honoring the leadership of Devibai Hospital.",
            "Guests and community elders posing at the official logo wall of Dr. Chandrika's Fertility Centre."
        ]
        title = titles[idx - 29]
        caption = captions[idx - 29]
        slug_prefix = f"reception-honors-photowall-{idx-28}"
    elif idx == 31:
        cat = "Facilities"
        title = "Hospital Inpatient Room & Ward Corridor"
        caption = "Clean, air-conditioned patient corridor leading to deluxe private rooms and general wards."
        slug_prefix = "hospital-inpatient-corridor-view"
    # 32: Modular OT Demonstration
    elif idx == 32:
        cat = "Surgery"
        title = "Demonstrating Modular Operation Theatre & Surgical Table"
        caption = "Dr. K. Avinash Kasamwar explaining the multi-position motorized OT table, shadowless LED lights, and sterile airflow system to visitors."
        slug_prefix = "modular-ot-surgical-table-demonstration"
    elif idx == 33:
        cat = "Hospital"
        title = "Doctor Discussion in Clinical Conference Room"
        caption = "Medical team and community representatives discussing healthcare accessibility in the consultation chamber."
        slug_prefix = "doctor-discussion-conference-chamber"
    elif idx == 34:
        cat = "Fertility & IVF"
        title = "Inspection of IVF Clean Room & Laminar Flow Cabinet"
        caption = "Visitors observing the sterile IVF laminar airflow cabinet and embryology workstation ensuring optimal culture conditions."
        slug_prefix = "ivf-clean-room-laminar-flow-inspection"
    elif idx == 35:
        cat = "Events & Celebrations"
        title = "Shawl Felicitation by Elders at Fertility Wing"
        caption = "Senior community elders conferring blessings upon Dr. Avinash Kasamwar with traditional silk shawls."
        slug_prefix = "shawl-felicitation-elders-fertility-wing"
    # 36: Grand Ribbon Cutting with Former Minister
    elif idx == 36:
        cat = "Events & Celebrations"
        title = "Grand Ribbon Cutting Ceremony with Former Minister Indrakaran Reddy"
        caption = "Former Minister Allola Indrakaran Reddy officially cutting the ceremonial ribbon to inaugurate Dr. Chandrika's Fertility (IVF) Centre alongside Dr. Chandrika and Dr. Avinash."
        slug_prefix = "grand-ribbon-cutting-minister-indrakaran-reddy"
    elif idx == 37:
        cat = "Hospital"
        title = "Former Minister Arriving at Devibai Hospital Premises"
        caption = "Former Minister Allola Indrakaran Reddy arriving with entourage at the flower-decorated hospital entrance."
        slug_prefix = "minister-arrival-hospital-premises"
    elif idx in [38, 40]:
        cat = "Hospital"
        titles = [
            "Former Minister Indrakaran Reddy Interacting with Doctors",
            "Healthcare Strategy Discussion with Regional Dignitaries"
        ]
        captions = [
            "Former Minister Indrakaran Reddy discussing medical facilities and patient care standards with Dr. Avinash and Dr. Chandrika.",
            "Community leaders discussing how Devibai Hospital eliminates the need for patients to travel to Hyderabad for IVF and advanced surgery."
        ]
        title = titles[(0 if idx == 38 else 1)]
        caption = captions[(0 if idx == 38 else 1)]
        slug_prefix = f"minister-interaction-discussion-{idx}"
    elif idx == 39:
        cat = "Fertility & IVF"
        title = "Dignitaries Assembled at Dr. Chandrika's Fertility Centre"
        caption = "Prominent political figures and community elders gathered at the inauguration of Dr. Chandrika's Fertility & Laparoscopic Centre."
        slug_prefix = "dignitaries-assembled-fertility-centre"
    elif idx in [41, 42, 43, 44]:
        cat = "Events & Celebrations"
        titles = [
            "Commemorative Plaque Presentation by Community Leaders",
            "Presenting Special Memento to Dr. Avinash & Dr. Chandrika",
            "Felicitation on Dias at Fertility Centre Launch",
            "Congratulatory Shawl Honors by Regional Dignitaries"
        ]
        captions = [
            "Hospital supporters presenting a golden commemorative plaque celebrating the launch of advanced specialty departments.",
            "Distinguished memento conferred upon Dr. Avinash Kasamwar and Dr. K. Chandrika for pioneering infertility care in Nirmal.",
            "Ceremonial felicitation on the main stage surrounded by family members, doctors, and civic leaders.",
            "Respected elders wrapping celebratory silk shawls around Dr. Avinash and Dr. Chandrika."
        ]
        title = titles[idx - 41]
        caption = captions[idx - 41]
        slug_prefix = f"commemorative-plaque-presentation-{idx-40}"
    # 45 - 56: Extensive Press & Newspaper Coverage
    elif idx in range(45, 57):
        cat = "Awards & Recognition"
        press_details = {
            45: ("Digital Media Feature — Fertility Centre Launch in Nirmal", "Special digital press report detailing the comprehensive infertility and laparoscopic surgical care launched at Devibai Hospital."),
            46: ("Community Leaders Praising Healthcare Services", "Media feature on community elders and representatives commending Dr. Avinash and Dr. Chandrika for selfless public health efforts."),
            47: ("Newspaper Report — Quality Healthcare for Rural Families", "Daily newspaper column emphasizing that advanced surgical and fertility services are now available locally for rural Nirmal residents."),
            48: ("Press Coverage — Affordable Critical & Fertility Care", "News article highlighting the hospital's mission to deliver corporate-standard healthcare at affordable costs."),
            49: ("Peace Urdu News Daily — IVF Centre Inauguration Report", "Peace Urdu News Daily report celebrating the establishment of Dr. Chandrika's Fertility Centre in Nirmal district."),
            50: ("Nava Telangana Headline — IVF Centre Opened at Devibai Hospital", "Nava Telangana front-page coverage: 'దేవిబాయి ఆస్పత్రిలో ఐవీఎఫ్ సెంటర్ ప్రారంభం'."),
            51: ("Online News Clip — Devibai Hospital Launches Advanced IVF", "E-paper digital clip highlighting the state-of-the-art reproductive medicine laboratory."),
            52: ("The Hans India — 'MLAs inaugurate IVF centre at Devibai Hospital'", "The Hans India feature: Nirmal MLA A. Maheshwar Reddy and Mudhole MLA Rama Rao Patel inaugurate Dr. Chandrika's Fertility Centre."),
            53: ("Nava Telangana — Infertility Relief for Childless Couples", "Newspaper report detailing how modern IUI and IVF facilities at Devibai Hospital bring hope to childless couples in rural Telangana."),
            54: ("Namasthe Telangana — 'హైదరాబాద్ తరహాలో వైద్యసేవలు అందించడం అభినందనీయం'", "Namasthe Telangana article: Political leaders praising Devibai Hospital for providing Hyderabad-level healthcare right in Nirmal."),
            55: ("Press Feature — Community Appreciation for Medical Founders", "Newspaper article documenting public appreciation for Dr. Avinash Kasamwar and Dr. Chandrika."),
            56: ("Praja Paksha Report — Senior BRS Leaders Attend Inauguration", "Praja Paksha coverage: 'ఫెర్టిలిటీ సెంటర్ ప్రారంభోత్సవానికి హాజరైన బీఆర్ఎస్ అగ్రనేతలు'.")
        }
        title, caption = press_details[idx]
        slug_prefix = f"newspaper-press-coverage-{idx-44}"
    # 57 - 58: Media Press Releases with MLAs
    elif idx in [57, 58]:
        cat = "Events & Celebrations"
        titles = [
            "Press Statement — Senior Leaders at Fertility Centre Opening",
            "Press Media — Nirmal & Mudhole MLAs Inaugurate IVF Centre"
        ]
        captions = [
            "Official press release: Koripelli Ramkishan Reddy, Marugonda Ramu, Akram Ali, Mohammad Naeem, and Jagruti President express best wishes.",
            "Official press release: Nirmal MLA A. Maheshwar Reddy and Mudhole MLA Rama Rao Patel inaugurate Dr. Chandrika's Fertility (IVF) Centre."
        ]
        title = titles[idx - 57]
        caption = captions[idx - 57]
        slug_prefix = f"press-statement-mla-inauguration-{idx-56}"
    # 59 - 72: Felicitation Series
    elif idx in range(59, 73):
        cat = "Events & Celebrations"
        title = f"Community Felicitation & Memento Presentation (Moment {idx-58})"
        caption = f"Community leaders, doctors, and family members honoring Dr. K. Avinash Kasamwar and Dr. K. Chandrika during inaugural celebrations in Nirmal."
        slug_prefix = f"community-felicitation-moment-{idx-58}"
    # 73: Ribbon cutting for clinical ward
    elif idx == 73:
        cat = "Facilities"
        title = "Ceremonial Ribbon Cutting for Clinical Inpatient Ward"
        caption = "Dignitaries and doctors cutting the green ribbon to officially open the new inpatient care ward at Devibai Hospital."
        slug_prefix = "ribbon-cutting-clinical-inpatient-ward"
    # 74: Festive balloon release
    elif idx == 74:
        cat = "Events & Celebrations"
        title = "Festive Balloon Release Celebrating Hospital Opening"
        caption = "Joyous balloon release ceremony outside the hospital building attended by doctors, staff, leaders, and enthusiastic citizens."
        slug_prefix = "festive-balloon-release-opening"
    # 75: Memento presentation
    elif idx == 75:
        cat = "Events & Celebrations"
        title = "Memento Presentation to Dr. Avinash & Dr. Chandrika"
        caption = "Distinguished guests presenting a commemorative award plaque honoring the medical couple's vision."
        slug_prefix = "memento-presentation-doctor-couple"
    # 76, 77: Department Ribbon Cutting
    elif idx == 76:
        cat = "Surgery"
        title = "Ribbon Cutting for Advanced Operation Theatre Suite"
        caption = "Surgical department ribbon cutting with Dr. Avinash Kasamwar, fellow surgeons, and distinguished community guests."
        slug_prefix = "ribbon-cutting-operation-theatre-suite"
    elif idx == 77:
        cat = "Fertility & IVF"
        title = "Ribbon Cutting for Dr. Chandrika's Fertility Outpatient Wing"
        caption = "Official ribbon cutting opening the dedicated consultation and counseling chambers of Dr. Chandrika's Fertility Centre."
        slug_prefix = "ribbon-cutting-fertility-opd-wing"
    # 78: Grand Rose Bouquet
    elif idx == 78:
        cat = "Hospital"
        title = "Grand Rose Bouquet Presentation by Hospital Team"
        caption = "Devibai Hospital staff and supporters presenting a massive crimson rose bouquet to Dr. Chandrika and Dr. Avinash."
        slug_prefix = "grand-rose-bouquet-presentation"
    # 79: Ganesha Pooja
    elif idx == 79:
        cat = "Events & Celebrations"
        title = "Traditional Ganesha Pooja & Jyothi Prajwalana"
        caption = "Auspicious ceremonial lamp lighting and prayer before Lord Ganesha seeking divine blessings for hospital patients and healing."
        slug_prefix = "traditional-ganesha-pooja-jyothi-prajwalana"
    # 80 - 83: Dignitary Welcomes
    elif idx in range(80, 84):
        cat = "Events & Celebrations"
        title = f"Dignitary Welcome & Floral Felicitation (Part {idx-79})"
        caption = f"Esteemed community representatives and political leaders presenting bouquets and shawls to Dr. Avinash and Dr. Chandrika."
        slug_prefix = f"dignitary-welcome-felicitation-{idx-79}"
    # 84: Magnificent Night View of Illuminated Hospital Building
    elif idx == 84:
        cat = "Hospital"
        title = "Devibai Super Speciality Hospital — Illuminated Night Elevation"
        caption = "Spectacular night photograph of the entire Devibai Hospital and Dr. Chandrika's Fertility Centre building illuminated with festive lighting, displaying 24/7 Emergency signage."
        slug_prefix = "illuminated-hospital-building-night-view"
    # 85 - 87: Stage felicitations
    elif idx in range(85, 87):
        cat = "Events & Celebrations"
        title = f"Stage Felicitation with Community Elders (Part {idx-84})"
        caption = f"Community elders and well-wishers presenting ceremonial shawls to Dr. Avinash and Dr. Chandrika on the main dais."
        slug_prefix = f"stage-felicitation-elders-{idx-84}"
    # 87: Grand Ribbon Cutting with Rose Petals
    elif idx == 87:
        cat = "Events & Celebrations"
        title = "Grand Ribbon Cutting Moment with Rose Petal Shower"
        caption = "Emotional and joyous ribbon-cutting moment as rose petals shower upon Dr. Chandrika, Dr. Avinash, and distinguished leaders."
        slug_prefix = "ribbon-cutting-rose-petal-shower"
    # 88, 89: Jyothi Prajwalana & Aarti
    elif idx in [88, 89]:
        cat = "Events & Celebrations"
        titles = [
            "Ceremonial Jyothi Prajwalana by Doctors & Leaders",
            "Traditional Aarti & Prayer Ceremony"
        ]
        captions = [
            "Lighting the ceremonial oil lamps symbolizing the dispelling of illness and the ushering in of health and wellness.",
            "Doctors and community leaders participating in traditional Vedic blessings and Aarti during hospital opening."
        ]
        title = titles[idx - 88]
        caption = captions[idx - 88]
        slug_prefix = f"jyothi-prajwalana-aarti-{idx-87}"
    # 90 - 95: Felicitation moments
    elif idx in range(90, 96):
        cat = "Events & Celebrations"
        title = f"Inaugural Ceremony Felicitation & Honors (Part {idx-89})"
        caption = f"Community representatives, political leaders, and hospital well-wishers presenting mementos and congratulations to the founders."
        slug_prefix = f"inaugural-ceremony-honors-{idx-89}"
    # 96: Hospital Exterior Decorated with Floral Arches
    elif idx == 96:
        cat = "Hospital"
        title = "Devibai Hospital Main Facade Decorated with Floral Arches"
        caption = "Daytime view of the hospital exterior adorned with grand yellow and orange marigold floral arches, showcasing 24/7 Pharmacy and Emergency wings."
        slug_prefix = "hospital-exterior-floral-arches-daytime"
    elif idx == 97:
        cat = "Hospital"
        title = "Leadership Interaction with Hospital Visitors"
        caption = "Hospital administrators and doctors meeting with citizens and discussing specialized healthcare services."
        slug_prefix = "leadership-interaction-visitors"
    # 98: Framed SIWAA & Suman TV Awards
    elif idx == 98:
        cat = "Awards & Recognition"
        title = "Showcase of SIWAA 2025 & Suman TV Doctor Awards"
        caption = "Framed certificates and award citations of the South Indian Women Achievers Award (SIWAA) and Suman TV Doctor Award on display at Devibai Hospital."
        slug_prefix = "framed-siwaa-suman-tv-awards-showcase"
    elif idx == 99:
        cat = "Events & Celebrations"
        title = "Visiting Delegates Congratulating Dr. Avinash & Dr. Chandrika"
        caption = "Delegation of community leaders congratulating the doctor couple in the administrative conference room."
        slug_prefix = "visiting-delegates-congratulations"
    # 100: Grand Trophy & Mementos Table
    elif idx == 100:
        cat = "Awards & Recognition"
        title = "Devibai Hospital Trophy & Recognition Showcase Table"
        caption = "Collection of prestigious trophies, state awards, medals, and certificates won by Dr. K. Chandrika and Dr. K. Avinash Kasamwar."
        slug_prefix = "trophy-recognition-showcase-table"
    elif idx in [101, 103]:
        cat = "Events & Celebrations"
        title = f"Youth & Community Leaders Felicitating Dr. Avinash (Part {1 if idx==101 else 2})"
        caption = "Youth representatives honoring Dr. Avinash Kasamwar for his active patronage of youth sports, education, and community welfare."
        slug_prefix = f"youth-leaders-felicitating-dr-avinash-{idx}"
    elif idx == 102:
        cat = "Hospital"
        title = "Release of Hospital Information Guide with Community Elders"
        caption = "Dr. Avinash Kasamwar formally releasing informative patient healthcare literature with community elders in the hospital."
        slug_prefix = "hospital-information-guide-release"
    # 104: Youth badminton championship
    elif idx == 104:
        cat = "Events & Celebrations"
        title = "Felicitation of Junior Badminton Champions with Trophies"
        caption = "Dr. Avinash Kasamwar presenting championship trophies and certificates to student badminton winners at indoor stadium in Nirmal."
        slug_prefix = "badminton-champions-trophies-presentation"
    # 105 - 127: SIWAA 2025 (South Indian Women Achievers Award) at Chennai & Reception Celebrations
    elif idx in range(105, 128):
        siwaa_titles = {
            105: ("English Press: 'Rare honor for Nirmal doctor Dr. Chandrika gets SIWAA'", "English daily article celebrating Dr. Chandrika Kasamwar winning the prestigious South Indian Women Achievers Award (SIWAA 2025) in Chennai."),
            106: ("SIWAA Award Celebration Cake at Devibai Hospital Reception", "Devibai Hospital doctors and reception team celebrating the SIWAA 2025 award with ceremonial cake and fresh flowers."),
            107: ("Staff Cake Cutting Celebrating Dr. Chandrika's SIWAA Honor", "Hospital clinical and nursing staff feeding celebration cake to Dr. Chandrika in honor of her state-level recognition."),
            108: ("Dr. K. Chandrika on Stage with SIWAA Golden Wings in Chennai", "Dr. K. Chandrika holding the glittering SIWAA award trophy on stage in Chennai with golden wings backdrop."),
            109: ("Elderly Patients & Community Members Congratulating Dr. Chandrika", "Elderly women and thankful patients greeting Dr. Chandrika with heartfelt blessings for her compassionate maternal care."),
            110: ("Entire Devibai Hospital Healthcare & Administrative Team", "Grand group portrait of doctors, nurses, pharmacists, lab technicians, and security staff assembled at Devibai Hospital reception."),
            111: ("Hospital Clinical Staff Celebrating Together at Reception Desk", "Full staff gathering expressing pride in Devibai Hospital's regional and state awards."),
            112: ("Nursing Staff & Doctors with SIWAA Award Trophy", "Hospital nurses and medical team proudly displaying the SIWAA Excellence in Medical Services award."),
            113: ("Official Certificate of Excellence — SIWAA 2025", "Official citation conferred upon Dr. Chandrika Kasamwar by South Indian Women Achievers Awards 2025 in Chennai."),
            114: ("Reception Floral Tribute for SIWAA Award Achievement", "Dr. Avinash and Dr. Chandrika celebrating medical excellence awards alongside clinical colleagues."),
            115: ("Vijayakranthi News: 'నిర్మల్ వైద్యురాలికి అరుదైన ఘనత — సౌత్ ఇండియా విమెన్ అవార్డు'", "Vijayakranthi newspaper coverage on Dr. Chandrika's state award for maternal health and infertility treatment."),
            116: ("Andhra Prabha News: 'డాక్టర్ చంద్రిక కాశంవార్ కు విశిష్ట పురస్కారం'", "Andhra Prabha feature commending Dr. Chandrika's relentless service to childless couples across northern Telangana."),
            117: ("Nava Telangana: 'ఎక్సలెన్స్ ఇన్ మెడికల్ సర్వీసెస్ అవార్డు'", "Nava Telangana report highlighting the Chennai award conferment on Dr. Chandrika for exceptional clinical dedication."),
            118: ("Digital E-Paper Coverage — SIWAA Chennai Award", "Digital news article reporting on the glittering awards ceremony held in Chennai celebrating women pioneers in medicine."),
            119: ("Media Feature on SIWAA 2025 Award Presentation", "Media report describing Dr. Chandrika's dedication to high-risk pregnancy and modern fertility care."),
            120: ("Andhra Prabha Special Article — Maternal Wellness Pioneer", "Newspaper article praising Devibai Hospital's role in advancing maternal and infant healthcare in Nirmal."),
            121: ("Dr. K. Chandrika — SIWAA 2025 Golden Wings Portrait", "Portrait of Dr. Chandrika Kasamwar holding the SIWAA Award trophy at the national convention in Chennai."),
            122: ("Regional Newspaper Feature on Medical Achievements", "Press profile detailing the milestones and accolades earned by Dr. Chandrika and Dr. Avinash."),
            123: ("Official Press Meet 2025 — Dr. Chandrika Addressing Media in Chennai", "Dr. K. Chandrika speaking at the official SIWAA 2025 press meet on increasing accessibility to modern fertility therapies in rural areas."),
            124: ("Hospital Founders & Leadership at Reception Celebration", "Dr. Avinash and Dr. Chandrika with colleagues celebrating hospital milestones at reception."),
            125: ("India's Largest Women Empowerment Program SIWAA 2025", "Dr. Chandrika Kasamwar honored on stage at the nation's premier women empowerment conclave in Chennai."),
            126: ("Reception Cake Cutting Ceremony with Healthcare Team", "Hospital administrators and doctors cutting celebration cake at the central reception counter."),
            127: ("Newspaper Feature: 'మహిళలకు మెరుగైన వైద్య సేవలు'", "Telugu daily article highlighting Devibai Super Speciality Hospital's specialized women's healthcare services.")
        }
        title, caption = siwaa_titles.get(idx, ("SIWAA 2025 Award Celebration", "Celebration of South Indian Women Achievers Award."))
        slug_prefix = f"siwaa-award-celebration-{idx-104}"
    # 128 - 145: Suman TV Doctor Award 2025 in Hyderabad & Press Coverage
    elif idx in range(128, 146):
        suman_titles = {
            128: ("Hospital Healthcare Team at Reception Celebration Table", "Medical team gathered around the decorated celebration table at Devibai Hospital reception."),
            129: ("Dr. Chandrika Receiving Suman TV Doctor Award at Novotel Hyderabad", "Dr. K. Chandrika receiving the Suman TV Doctor Award at HICC Novotel, Hyderabad, celebrating clinical excellence."),
            130: ("Garland & Shawl Felicitation for Dr. Avinash & Dr. Chandrika", "Devibai Hospital leadership team felicitating Dr. Avinash and Dr. Chandrika with garlands and shawls."),
            131: ("Dr. Avinash Kasamwar & Dr. Chandrika — Celebration Portrait", "Portrait of the doctor couple wearing celebratory garlands in front of the hospital brand emblem."),
            132: ("Administrative & Nursing Team Congratulating Doctors", "Hospital ward staff and nursing team expressing joy and gratitude to their medical directors."),
            133: ("Hospital Reception Felicitation with Well-Wishers", "Community elders and patients presenting floral greetings to Dr. Avinash and Dr. Chandrika."),
            134: ("Andhra Prabha: 'డాక్టర్ చంద్రికకు రాష్ట్రస్థాయి అవార్డు'", "Andhra Prabha article: State-level Suman TV Doctor Award conferred upon Dr. Chandrika in Hyderabad."),
            135: ("Urdu Daily Feature — Dr. Chandrika Kasamwar Praised for Medical Service", "Urdu daily newspaper feature highlighting Dr. Chandrika’s compassionate healthcare and fertility treatments."),
            136: ("English Press: 'Suman TV Award for Dr. Chandrika Kasamwar of Nirmal'", "English news clipping: Suman TV honors Dr. Chandrika for bringing happiness to childless couples."),
            137: ("Namasthe Telangana: 'డా. చంద్రిక కాశంవర్ కు సుమన్ టీవీ అవార్డు'", "Namasthe Telangana coverage of the high-profile awards ceremony at Hyderabad."),
            138: ("Urdu Press Coverage — State Level Medical Recognition", "Urdu press report on Dr. Chandrika Kasamwar receiving accolades for gynecological excellence."),
            139: ("Suman TV Doctor Award Ceremony Feature in Daily Press", "Detailed report on medical dignitaries and celebrities honoring Dr. Chandrika at Hyderabad."),
            140: ("Vijayakranthi: 'నిర్మల్ డాక్టర్ చంద్రిక కాశంవార్ కు సుమన్ టీవీ అవార్డ్'", "Vijayakranthi report on the state award presented for exemplary healthcare service."),
            141: ("Urdu Daily News — Fertility Success Stories Celebrated", "Press coverage highlighting high success rates in IUI and fertility treatments at Devibai Hospital."),
            142: ("Vijayakranthi E-Paper Page Feature on Doctor Honor", "E-paper screenshot detailing the felicitation program held at HICC Novotel Hyderabad."),
            143: ("Praja Jyothi: 'డాక్టర్ చంద్రిక కాశంవార్ కి సుమన్ టీవీ అవార్డ్'", "Praja Jyothi article on the prestigious doctor excellence recognition conferred in Hyderabad."),
            144: ("Nava Telangana: 'ప్రముఖ గైనకాలజిస్ట్ కు సుమన్ టీవీ అవార్డ్'", "Nava Telangana feature: Prominent Nirmal gynecologist honored with state doctor award."),
            145: ("Sahafi Deccan Daily Urdu Feature on Hospital Achievements", "Sahafi Deccan Daily covering Dr. Chandrika’s medical awards and public health contributions.")
        }
        title, caption = suman_titles.get(idx, ("Suman TV Doctor Award Feature", "Suman TV Doctor Award coverage."))
        slug_prefix = f"suman-tv-doctor-award-{idx-127}"
    # 146: Hospital Exterior Daytime
    elif idx == 146:
        cat = "Hospital"
        title = "Devibai Super Speciality Hospital — Bustling Daytime Campus"
        caption = "Exterior daytime photograph of the multi-storey Devibai Hospital campus with parked ambulances, patient vehicles, and active casualty entrance."
        slug_prefix = "hospital-exterior-daytime-bustling-campus"
    elif idx == 147:
        cat = "Awards & Recognition"
        title = "Press Feature on Suman TV Doctor Award for Dr. Chandrika"
        caption = "Printed media article praising the compassionate healthcare delivered by Devibai Hospital's medical specialists."
        slug_prefix = "press-feature-suman-tv-award"
    # 148, 149: Temple blessings
    elif idx in [148, 149]:
        cat = "Events & Celebrations"
        titles = [
            "Temple Darshan & Blessings with Dr. Avinash & Family",
            "Offering Prayers for Community Health at Sacred Temple"
        ]
        captions = [
            "Dr. Avinash Kasamwar and family offering prayers and receiving sacred temple blessings.",
            "Temple visit seeking divine protection and well-being for hospital patients and Nirmal town."
        ]
        title = titles[idx - 148]
        caption = captions[idx - 148]
        slug_prefix = f"temple-darshan-blessings-{idx-147}"
    # 150: Wide hospital exterior daytime
    elif idx == 150:
        cat = "Hospital"
        title = "Devibai Hospital & Fertility Centre Campus — Wide Frontage"
        caption = "Panoramic daytime view of Devibai Super Speciality Hospital, Dr. Chandrika’s Fertility Centre, and 24/7 Pharmacy on Mancherial Road."
        slug_prefix = "hospital-fertility-centre-wide-frontage"
    # 151 - 155: Temple Chariot Festival & Community Celebrations
    elif idx in range(151, 156):
        cat = "Events & Celebrations"
        fest_titles = {
            151: ("Community Floral Bouquet Presentation to Doctors", "Community leaders presenting fresh flower bouquets honoring Dr. Avinash and Dr. Chandrika."),
            152: ("Sri Temple Chariot (Ratham) Festival Night Celebration", "Dr. Avinash and Dr. Chandrika attending the illuminated temple ratham chariot festival at night."),
            153: ("Illuminated Temple Chariot Procession in Nirmal", "Dr. Avinash Kasamwar with devotees beside the decorated temple chariot during the annual religious festival."),
            154: ("Temple Ceremony with Trishul & Damru Spiritual Backdrop", "Dr. Avinash, Dr. Chandrika, and community elders offering prayers before Lord Shiva's divine symbols."),
            155: ("Floral Welcome by Devotees at Temple Celebrations", "Community elders and temple trustees honoring Dr. Avinash and Dr. Chandrika with floral garlands.")
        }
        title, caption = fest_titles[idx]
        slug_prefix = f"temple-chariot-festival-{idx-150}"
    # 156, 157: Staff recognition at reception
    elif idx in [156, 157]:
        cat = "Hospital"
        titles = [
            "Hospital Staff Felicitation Ceremony at Reception",
            "Presenting Merit Certificates to Dedicated Healthcare Staff"
        ]
        captions = [
            "Dr. Avinash and Dr. Chandrika presenting awards and certificates of appreciation to hospital employees for outstanding patient care.",
            "Devibai Hospital management rewarding dedicated nurses, technicians, and front-desk staff for clinical excellence."
        ]
        title = titles[idx - 156]
        caption = captions[idx - 156]
        slug_prefix = f"staff-recognition-certificates-{idx-155}"
    elif idx == 158:
        cat = "Events & Celebrations"
        title = "Temple Committee Felicitating Dr. Avinash Kasamwar"
        caption = "Temple committee elders presenting traditional saffron shawls to Dr. Avinash Kasamwar for supporting community festivities."
        slug_prefix = "temple-committee-felicitating-dr-avinash"
    # 159 - 169: Doctors Excellence Award 2025 (Minister Konda Surekha & MP Raghunandan Rao)
    elif idx in range(159, 170):
        cat = "Awards & Recognition"
        award_titles = {
            159: ("Nava Bharat: 'దేవిబాయి సూపర్ స్పెషాలిటీ హాస్పిటల్ డాక్టర్ల రాష్ట్ర స్థాయి అవార్డు'", "Nava Bharat report on Devibai Hospital doctors winning state-level awards in Hyderabad."),
            160: ("Andhra Prabha: 'రాష్ట్రస్థాయిలో డాక్టర్స్ ఎక్సలెన్స్ అవార్డు అందుకున్న డాక్టర్ చంద్రిక'", "Andhra Prabha coverage: Hon'ble Minister Konda Surekha presenting Doctors Excellence Award to Dr. Chandrika."),
            161: ("Namasthe Telangana: 'రాష్ట్ర స్థాయి అవార్డు అందుకున్న నిర్మల్ వైద్యులు'", "Namasthe Telangana reporting on Medak MP Raghunandan Rao and Minister Konda Surekha conferring honors."),
            162: ("Doctors Excellence Award Presentation by MP Raghunandan Rao", "Dr. Chandrika receiving the prestigious trophy on stage from Medak MP Raghunandan Rao and State Women's Commission Chairperson."),
            163: ("Digital News Coverage — State Level Doctor Excellence Award", "Online news coverage celebrating Devibai Hospital's award in gynecological and laparoscopic healthcare."),
            164: ("Sakshi News: 'డాక్టర్ చంద్రికకు ఎక్సలెన్స్ అవార్డు'", "Sakshi News report: Dr. Chandrika Avinash recognized for state-level excellence in women's reproductive health."),
            165: ("Andhra Prabha Feature — State Level Doctors Excellence 2025", "Special newspaper article highlighting the medical achievements of Dr. Chandrika in Nirmal."),
            166: ("News Report on State Healthcare Honors Conferred at Hyderabad", "Press report documenting the state doctor awards ceremony attended by prominent legislators and healthcare dignitaries."),
            167: ("Doctors Excellence Awards 2025 — Stage Presentation Backdrop", "Stage view with official banner: 'Congratulations DOCTORS EXCELLENCE AWARDS @ 2025'."),
            168: ("State Dignitaries Presenting Award Trophy to Dr. Chandrika", "Hon'ble Minister and dignitaries presenting the golden trophy and certificate of excellence on stage."),
            169: ("Dignitaries Honoring Dr. Chandrika on Stage at Hyderabad", "Dr. Chandrika on the dais with VIP dignitaries after receiving the prestigious state healthcare trophy.")
        }
        title, caption = award_titles[idx]
        slug_prefix = f"doctors-excellence-award-2025-{idx-158}"
    # 170: Ugadi Samburalu
    elif idx == 170:
        cat = "Events & Celebrations"
        title = "Ugadi Samburalu Cultural Invitation & Felicitation Poster"
        caption = "Ugadi Samburalu cultural poster featuring Dr. Chandrika as Chief Guest and healthcare patron in Nirmal."
        slug_prefix = "ugadi-samburalu-poster"
    # 171 - 175: Plaques, celebrations, Holi
    elif idx in [171, 172]:
        cat = "Hospital"
        title = f"Appreciation Plaque Handover at Hospital (Part {idx-170})"
        caption = "Visitors and civic leaders presenting celebratory plaques to the hospital leadership team."
        slug_prefix = f"appreciation-plaque-handover-{idx-170}"
    elif idx == 173:
        cat = "Events & Celebrations"
        title = "Dr. Chandrika in Festive Attire on Stage"
        caption = "Dr. K. Chandrika addressing audience during festive cultural celebrations in Nirmal."
        slug_prefix = "dr-chandrika-festive-stage"
    elif idx == 174:
        cat = "Events & Celebrations"
        title = "Joyous Holi Festival Celebrations with Hospital Healthcare Team"
        caption = "Doctors, clinical technicians, and staff joyfully celebrating Holi with colorful gulal at the hospital entrance."
        slug_prefix = "holi-festival-celebrations-hospital-team"
    elif idx == 175:
        cat = "Hospital"
        title = "Dignitaries Presenting Commemorative Plaque in Hospital"
        caption = "Community leaders and doctors holding commemorative plaque inside Devibai Hospital."
        slug_prefix = "commemorative-plaque-hospital-corridor"
    # 176 - 179: International Women's Day & Mrs. World Peace Honors
    elif idx in range(176, 180):
        cat = "Awards & Recognition"
        wp_titles = {
            176: ("International Women's Day Tribute to Dr. K. Chandrika", "Official poster: 'అంతర్జాతీయ మహిళా దినోత్సవ శుభాకాంక్షలు' honoring Dr. K. Chandrika’s exemplary achievements."),
            177: ("Dr. K. Chandrika Crowned with Tiara & Trophies", "Portrait of Dr. Chandrika holding achievement trophies wearing coronation tiara."),
            178: ("Mrs. World Peace Crown & Achievement Trophy Portrait", "Dr. K. Chandrika in scarlet evening gown holding Mrs. World Peace achievement trophy and sash."),
            179: ("Commemorative Women's Day Banner Honoring Dr. Chandrika", "Devibai Hospital tribute poster celebrating Dr. Chandrika's international laurels and community healthcare impact.")
        }
        title, caption = wp_titles[idx]
        slug_prefix = f"womens-day-mrs-world-peace-{idx-175}"
    # 180 - 183: Hospital Brand Wall & Community Congrats
    elif idx in [180, 182]:
        cat = "Events & Celebrations"
        title = f"Community Congratulations for Founders (Part {1 if idx==180 else 2})"
        caption = "Well-wishers honoring Dr. Avinash and Dr. Chandrika for bringing laurels to Nirmal district."
        slug_prefix = f"community-congratulations-founders-{idx}"
    elif idx == 181:
        cat = "Doctors"
        title = "Dr. Avinash Kasamwar & Dr. Chandrika at Hospital Brand Wall"
        caption = "Founders portrait in front of the illuminated 'DEVIBHAI CRITICAL CARE SUPER SPECIALITY HOSPITAL' reception insignia."
        slug_prefix = "founders-hospital-brand-wall-portrait"
    elif idx == 183:
        cat = "Events & Celebrations"
        title = "Temple Darshan & Saffron Shawl Honors"
        caption = "Temple priests honoring Dr. Avinash Kasamwar with saffron shawls during auspicious puja."
        slug_prefix = "temple-darshan-saffron-shawl-honors"
    elif idx == 184:
        cat = "Hospital"
        title = "Health Insurance & LIC TPA Pre-Authorization Portal"
        caption = "Devibai Hospital's digital health insurance desk: online cashless insurance processing and LIC TPA authorization interface."
        slug_prefix = "health-insurance-lic-tpa-portal"
    # 185, 186: Sports Jersey Sponsorship
    elif idx in [185, 186]:
        cat = "Events & Celebrations"
        titles = [
            "Sponsoring Player Cricket Jersey (Nadeem 03)",
            "Sponsoring 'NIRMAL SUPER KINGS' Cricket Tournament Jerseys"
        ]
        captions = [
            "Dr. Avinash Kasamwar unveiling personalized cricket jersey for local sports talent Nadeem.",
            "Dr. Avinash sponsoring official team jerseys for Nirmal Super Kings in the regional cricket championship."
        ]
        title = titles[idx - 185]
        caption = captions[idx - 185]
        slug_prefix = f"cricket-jersey-sponsorship-{idx-184}"
    elif idx == 187:
        cat = "Events & Celebrations"
        title = "Temple Committee Felicitating Dr. Avinash at Shrine"
        caption = "Temple committee members presenting deity blessings and commemorative shawls to Dr. Avinash."
        slug_prefix = "temple-committee-felicitation-shrine"
    elif idx == 188:
        cat = "Awards & Recognition"
        title = "Full Newspaper Page Feature on Devibai Hospital Services"
        caption = "Comprehensive regional press feature on free health camps and specialized medical treatments in Nirmal."
        slug_prefix = "newspaper-feature-hospital-services"
    # 189 - 198: Free Medical Camps (Senior Citizens & TSRTC Employees)
    elif idx in range(189, 199):
        cat = "Medical Care"
        camp_titles = {
            189: ("Newspaper Report: 'ఉచిత వైద్య శిబిరం — దేవిబాయి ఆసుపత్రి'", "Newspaper coverage on Devibai Critical Care Hospital organizing free health camp in Shastri Nagar, Nirmal."),
            190: ("Free Geriatric Medical Camp — 200+ Senior Citizens Screened", "Over 200 elderly individuals provided free blood sugar, BP, ECG, and general health evaluations with free medicines."),
            191: ("Community Gathering for Free Healthcare Camp", "Doctors and community volunteers organizing free medical checkup counters for local citizens."),
            192: ("Newspaper Report: 'వృద్ధులకు ఉచిత వైద్య శిబిరం'", "Newspaper report highlighting specialized geriatric consultations and medicines provided without charge."),
            193: ("Doctors Conducting Comprehensive Clinical Evaluations", "Devibai Hospital medical team examining elderly patients and prescribing targeted therapies."),
            194: ("Newspaper Report: 'ఆర్టీసీ డిపోలో వైద్య పరీక్షలు'", "Newspaper feature on Devibai Hospital conducting free health screening camp at Nirmal TSRTC bus depot."),
            195: ("Mega Medical Camp (మెగా వైద్య శిబిరం) by Devibai Hospital", "Specialist medical camp providing free diagnostics, consultation, and medications for transport workers."),
            196: ("Media Feature: 'ఆర్టీసీ ఉద్యోగులకు ఆరోగ్య పరీక్షలు'", "Press report highlighting heart health, diabetes, and vision tests conducted for RTC drivers and conductors."),
            197: ("TSRTC Staff Health Screening Camp in Nirmal Depot", "Medical team conducting blood pressure, sugar, and cardiac checkups for bus drivers to ensure safe transit."),
            198: ("Free Diagnostic Tests for Transport Corporation Employees", "Detailed news column praising Devibai Hospital for providing vital medical care to public transport staff.")
        }
        title, caption = camp_titles[idx]
        slug_prefix = f"free-health-camp-{idx-188}"
    # 199, 202, 203: Critical Care & Dialysis
    elif idx in [199, 202, 203]:
        cat = "Facilities"
        titles = [
            "Inpatient Dialysis & Critical Patient Care Unit",
            "Specialist Nursing Care in Intensive Care Ward",
            "Round-the-Clock Critical Care Vital Signs Monitoring"
        ]
        captions = [
            "Clinical team attending to patient undergoing medical treatment in the well-equipped critical care unit.",
            "Dedicated ICU nurse administering medications and providing attentive bedside patient support.",
            "Physician and nursing staff reviewing multipara monitor readings and patient recovery status."
        ]
        idx_map = {199: 0, 202: 1, 203: 2}
        title = titles[idx_map[idx]]
        caption = captions[idx_map[idx]]
        slug_prefix = f"critical-care-icu-dialysis-{idx_map[idx]+1}"
    elif idx == 200:
        cat = "Medical Care"
        title = "Doctor Explaining Clinical Prognosis to Family"
        caption = "Devibai Hospital lead intensivist discussing diagnosis and recovery plan with patient's family members."
        slug_prefix = "doctor-clinical-explanation-family"
    elif idx == 201:
        cat = "Medical Care"
        title = "Press Feature on TSRTC Depot Health Camp Success"
        caption = "Newspaper article summarizing health parameters screened during the Nirmal depot medical camp."
        slug_prefix = "press-feature-tsrtc-camp-success"
    # 204 - 207: Staff Celebrations
    elif idx in range(204, 208):
        cat = "Hospital"
        title = f"Hospital Reception Milestone Celebration (Moment {idx-203})"
        caption = "Devibai Hospital doctors, administrative managers, and nursing staff celebrating healthcare milestones at reception."
        slug_prefix = f"reception-milestone-celebration-{idx-203}"
    # 208 - 218: Mrs. World Peace Celebrations
    elif idx in range(208, 219):
        cat = "Awards & Recognition" if idx in [208, 209, 210, 211, 212] else "Events & Celebrations"
        mrs_titles = {
            208: ("Dr. Avinash & Dr. Chandrika with Mrs. World Peace Trophy", "The doctor couple proudly holding the Mrs. World Peace achievement trophy and congratulatory sash."),
            209: ("Hospital Staff Felicitation for Mrs. World Peace Laurels", "Devibai Hospital team gathering around Dr. Chandrika to celebrate her international title."),
            210: ("Congratulatory Banner: 'మిస్సెస్ వరల్డ్ పీస్ డా॥ చంద్రిక గారికి శుభాకాంక్షలు'", "Devibai Hospital staff tribute banner honoring Dr. Chandrika Kasamwar for international recognition."),
            211: ("Tribute Banner Featuring Devibai Hospital Staff Members", "Hospital staff members presenting honorary tribute poster celebrating Dr. Chandrika."),
            212: ("Celebration Portrait of Dr. Avinash & Dr. Chandrika", "Founders portrait with celebratory balloons and congratulations."),
            213: ("Women Community Leaders Congratulating Dr. Chandrika", "Distinguished women leaders and colleagues felicitating Dr. Chandrika on her achievement."),
            214: ("Dignitaries Presenting Floral Tribute in Conference Hall", "Community elders presenting congratulations during the civic reception ceremony."),
            215: ("Women Healthcare Staff Posing with Dr. Chandrika", "Hospital female nursing and administrative staff cheering with Dr. Chandrika."),
            216: ("Dr. Chandrika Addressing Audience from the Podium", "Dr. K. Chandrika delivering an inspiring keynote speech on women empowerment, mental wellness, and health."),
            217: ("Civic Leaders Listening to Dr. Chandrika's Keynote Address", "Community leaders and guests in attendance as Dr. Chandrika addresses the gathering."),
            218: ("Staff Presenting Deity Frame Honoring Dr. Chandrika", "Hospital staff presenting a sacred deity frame wishing continued blessings for the hospital leadership.")
        }
        title, caption = mrs_titles[idx]
        slug_prefix = f"mrs-world-peace-event-{idx-207}"
    # 219 - 222: Life-Saving Care & Ekta Welfare Society Honor
    elif idx in [219, 220, 221, 222]:
        cat = "Emergency" if idx in [221, 222] else "Medical Care"
        life_titles = {
            219: ("Telangana Ekta Welfare Society Honors Devibai Hospital Doctors", "Ekta Welfare Society leaders honoring Dr. Avinash Kasamwar and Dr. Prashant Waghmare for reviving a critical patient."),
            220: ("Qasid-e-Hind Daily: 'Devibai Hospital Revives Critical Heart Attack Patient'", "Qasid-e-Hind Urdu daily report on the miraculous recovery of a patient who suffered two heart attacks on ventilator."),
            221: ("Telangana Ekta Welfare Society Official Press Release", "Press release: Patient Habib was in critical respiratory failure; Devibai Hospital intensivists saved his life on ventilator."),
            222: ("Global Express Urdu Daily: 'Exceptional Life-Saving Critical Care in Nirmal'", "Global Express daily coverage commending Devibai Hospital's 24/7 ICU for successfully managing severe cardiac emergencies.")
        }
        title, caption = life_titles[idx]
        slug_prefix = f"life-saving-critical-care-honor-{idx-218}"
    # 223 - 230: Nighttime Blanket & Clothes Distribution Drive
    elif idx in range(223, 231):
        cat = "Events & Celebrations"
        blanket_titles = {
            223: ("Night Outreach: Distributing Blankets to Homeless Citizens", "Dr. Avinash Kasamwar and volunteers walking the streets of Nirmal at night to distribute warm blankets."),
            224: ("Handing Winter Blankets to Destitute Elderly Men", "Dr. Avinash personally handing thick winter blankets to poor roadside elders on cold winter nights."),
            225: ("Official Banner: Hospital Shifting to New Facility Beside D.S. Mart", "Official announcement banner: 'దేవిబాయి హాస్పిటల్ త్వరలో మా నూతన భవనంలోకి మార్చబడును - డి.ఎస్. మార్ట్ ప్రక్కన, మంచీర్యాల్ రోడ్'."),
            226: ("Winter Relief Drive on Nirmal Streets", "Devibai Hospital social outreach team distributing warm blankets to elderly vendors and homeless citizens."),
            227: ("Providing Warm Clothes to Destitute Elderly Woman", "Dr. Avinash and team handing winter garments and blankets to an elderly woman sleeping on the sidewalk."),
            228: ("Dr. Avinash & Volunteers Assisting Needy Citizens at Night", "Community welfare drive ensuring vulnerable citizens stay warm and protected during winter."),
            229: ("Late-Night Street Outreach Drive in Nirmal Town", "Hospital volunteers distributing blankets to homeless citizens across street corners in Nirmal."),
            230: ("Devibai Hospital Winter Relief & Blanket Donation Campaign", "Social service initiative by Devibai Hospital delivering winter warmth and food packets to needy citizens.")
        }
        title, caption = blanket_titles[idx]
        slug_prefix = f"blanket-distribution-drive-{idx-222}"
    # 231 - 237: Vennela Dance Academy & Cultural Support
    elif idx in range(231, 238):
        cat = "Events & Celebrations"
        dance_titles = {
            231: ("Dr. Chandrika at Vennela Dance Academy Cultural Night", "Dr. K. Chandrika as Chief Guest encouraging youth talent in fine arts and classical dance in Nirmal."),
            232: ("Encouraging Child Performing Artists with Awards", "Dr. Chandrika congratulating young dance performers and presenting talent participation certificates."),
            233: ("Sri Krishna Physiotherapy & Dance Academy Felicitation", "Cultural organizers honoring Dr. Chandrika for patronizing children's physical fitness and fine arts."),
            234: ("Dr. Chandrika with Cultural Program Organizers", "Organizers thanking Dr. Chandrika for her encouragement and support of Nirmal's young cultural performers."),
            235: ("Dignitaries on Dais at Cultural Youth Showcase", "Community elders and doctors gathered on stage to celebrate talented students."),
            236: ("Newspaper Report on Youth Performing Arts Festival", "Press clipping highlighting Dr. Chandrika's inspirational message to students on discipline and well-being."),
            237: ("Sakshi News Broadcast on Nirmal Talent Encouragement Program", "Sakshi TV video news coverage showing Dr. Chandrika felicitating young dance achievers.")
        }
        title, caption = dance_titles[idx]
        slug_prefix = f"cultural-youth-encouragement-{idx-230}"
    # 238, 239: Community gatherings
    elif idx in [238, 239]:
        cat = "Events & Celebrations"
        title = f"Community Gathering with Elders & Citizens (Part {idx-237})"
        caption = "Dr. Avinash Kasamwar interacting with community elders and discussing public health initiatives in Nirmal."
        slug_prefix = f"community-gathering-elders-{idx-237}"
    # 240: Joyous Newborn Baby Blessed
    elif idx == 240:
        cat = "Fertility & IVF"
        title = "Joyous Newborn Baby Delivered at Devibai Hospital"
        caption = "Happy parents and family holding their precious newborn baby delivered safely at Devibai Hospital, joined by Dr. Avinash Kasamwar and doctors."
        slug_prefix = "joyous-newborn-baby-delivered"
    # 241, 246, 248, 249: Advanced IVF Lab Technology
    elif idx in [241, 246, 248, 249]:
        cat = "Fertility & IVF"
        ivf_tech_titles = {
            241: ("Advanced IVF Embryology Workstation & Incubation Lab", "Medical delegates inspecting the laminar cleanroom and specialized incubators at Dr. Chandrika’s Fertility Centre."),
            246: ("High-Precision ICSI Micromanipulator Workstation Tour", "Demonstrating the laser-assisted ICSI micromanipulator microscope used for single-sperm microinjection."),
            248: ("Microscope & Embryo Micromanipulation Equipment", "Specialized fertility equipment enabling high success rates for couples with severe male or female factor infertility."),
            249: ("Demonstrating Real-Time Embryology Lab Monitoring", "Visiting medical professionals viewing the environmental control and cryopreservation equipment in the IVF lab.")
        }
        title, caption = ivf_tech_titles[idx]
        slug_prefix = f"advanced-ivf-lab-workstation-{idx}"
    # 242, 243, 251: Wall of Success & Awards Wall
    elif idx == 242:
        cat = "Hospital"
        title = "Devibai Hospital Awards Wall & Trophies Showcase"
        caption = "Visiting delegates viewing the wall of framed state honors, doctor awards, and commendations received by Devibai Hospital."
        slug_prefix = "hospital-awards-wall-showcase"
    elif idx in [243, 251]:
        cat = "Fertility & IVF"
        titles = [
            "Wall of Success — Couples Blessed with Babies through IVF",
            "Visitors Admiring Joyful Baby Photos on Wall of Success"
        ]
        captions = [
            "Heartwarming display of photographs of hundreds of babies born through Dr. Chandrika's fertility and IVF treatments: 'హాస్పిటల్ లో సంతానం పొందిన దంపతులు'.",
            "Visitors and hopeful couples inspired by the real-life parenthood success stories achieved at Devibai Hospital."
        ]
        title = titles[0 if idx == 243 else 1]
        caption = captions[0 if idx == 243 else 1]
        slug_prefix = f"fertility-wall-of-success-babies-{idx}"
    # 244, 245: Doctor Consultation Room
    elif idx in [244, 245]:
        cat = "Doctors"
        titles = [
            "Visitors Greeting Dr. Avinash in Consultation Chamber",
            "Dr. K. Avinash Kasamwar in Outpatient Consultation Room"
        ]
        captions = [
            "Visitors presenting festive sweets and congratulating Dr. Avinash in his clinical chamber.",
            "Dr. K. Avinash Kasamwar at his desk in the surgical outpatient consultation room at Devibai Hospital."
        ]
        title = titles[0 if idx == 244 else 1]
        caption = captions[0 if idx == 244 else 1]
        slug_prefix = f"dr-avinash-consultation-room-{idx}"
    elif idx == 247:
        cat = "Doctors"
        title = "Dr. K. Avinash Kasamwar & Dr. K. Chandrika — Director Couple"
        caption = "Dr. K. Avinash Kasamwar and Dr. K. Chandrika in celebratory festive attire at Devibai Hospital."
        slug_prefix = "directors-dr-avinash-dr-chandrika-portrait"
    elif idx in range(250, 258):
        cat = "Events & Celebrations"
        title = f"Congratulatory Felicitation at Fertility Centre (Part {idx-249})"
        caption = "Well-wishers, community elders, and youth leaders presenting silk shawls and bouquets to Dr. Avinash and Dr. Chandrika."
        slug_prefix = f"congratulatory-felicitation-fertility-{idx-249}"
    # 258 - 267: Healthcare Literature Releases
    elif idx in range(258, 268):
        cat = "Hospital"
        title = f"Health Awareness Booklet Release with Citizens (Moment {idx-257})"
        caption = "Dr. Avinash Kasamwar presenting patient health education brochures and informative medical guides to community members."
        slug_prefix = f"health-awareness-booklet-release-{idx-257}"
    # 268 - 276: Yonex-Sunrise Telangana State Junior Badminton Championship 2025
    elif idx in range(268, 277):
        cat = "Events & Celebrations"
        badminton_titles = {
            268: ("Dignitaries Seated at Yonex-Sunrise Junior Badminton Championship", "Dr. Avinash Kasamwar and sports patrons seated at the state junior championship in Nirmal."),
            269: ("Sports Officials & Tournament Organizers at Indoor Stadium", "Organizing committee and referees gathered for the state-level junior badminton tournament."),
            270: ("Yonex-Sunrise Telangana State Junior Championship Opening", "Official banner: 'YONEX-SUNRISE TELANGANA STATE JUNIOR BADMINTON CHAMPIONSHIP 2025' with participating student athletes and NCC cadets."),
            271: ("Badminton Court Inspection with Players & Coaches", "Dr. Avinash Kasamwar inspecting the tournament court and wishing luck to junior athletes."),
            272: ("Opening Ceremony of Junior State Championship", "Ceremonial inaugural function at Nirmal Indoor Stadium with sports dignitaries on court."),
            273: ("Dr. Avinash Kasamwar Holding Championship Trophy as Chief Patron", "Dr. Avinash proudly holding the prestigious state championship trophy supporting youth athletics."),
            274: ("Awarding Sports Tournament Coordinators with Shawls", "Tournament organizers thanking Dr. Avinash Kasamwar for major sponsorship and healthcare support."),
            275: ("Junior Badminton Champions Displaying Trophies & Certificates", "Young sports champions from across Telangana proudly showing their medals and trophies won in Nirmal."),
            276: ("Presenting Winner Trophy to Junior Badminton Champion", "Dr. Avinash Kasamwar presenting the winner trophy to young badminton player on the victory podium.")
        }
        title, caption = badminton_titles[idx]
        slug_prefix = f"yonex-badminton-championship-2025-{idx-267}"
    # 277 - 280: Reception Honors
    elif idx in range(277, 281):
        cat = "Hospital"
        title = f"Felicitation Ceremony at Devibai Hospital Reception (Part {idx-276})"
        caption = "Community leaders and well-wishers wrapping silk shawls around Dr. Avinash and Dr. Chandrika at the reception desk."
        slug_prefix = f"reception-shawl-felicitation-{idx-276}"
    elif idx == 281:
        cat = "Events & Celebrations"
        title = "Women Community Gathering & Reproductive Health Awareness"
        caption = "Dr. Chandrika interacting with women from the community and discussing preventive health and maternal care."
        slug_prefix = "women-community-health-awareness"
    # 282, 283, 286: Eco-Friendly Clay Ganesha Workshop
    elif idx in [282, 283, 286]:
        cat = "Events & Celebrations"
        titles = [
            "Eco-Friendly Clay Ganesha Idol Workshop for School Children",
            "Dr. Chandrika Guiding School Children in Clay Idol Sculpting",
            "Children Proudly Displaying Handcrafted Eco-Friendly Clay Ganeshas"
        ]
        captions = [
            "Devibai Hospital hosting an eco-friendly clay Vinayaka making workshop to encourage environmental sustainability among children.",
            "Dr. K. Chandrika interacting warmly with young students and demonstrating clay modeling techniques.",
            "Children happily holding up their finished eco-friendly clay idols promoting green festival celebrations."
        ]
        idx_c = {282: 0, 283: 1, 286: 2}
        title = titles[idx_c[idx]]
        caption = captions[idx_c[idx]]
        slug_prefix = f"eco-friendly-clay-ganesha-workshop-{idx_c[idx]+1}"
    elif idx == 284:
        cat = "Awards & Recognition"
        title = "Founders with Doctor Excellence Trophy and Celebration Cake"
        caption = "Dr. Avinash and Dr. Chandrika posing with award trophy, celebration cake, and fresh floral bouquets."
        slug_prefix = "founders-doctor-excellence-trophy-cake"
    elif idx in [285, 287]:
        cat = "Hospital"
        titles = [
            "Nursing & Ward Care Team Celebrating Doctor Awards",
            "Hospital Clinical Nurses Cheering with Award Citation"
        ]
        captions = [
            "Nursing staff and healthcare assistants gathered at the reception table celebrating hospital achievements.",
            "Devibai Hospital nurses posing with the award memento and celebrating their shared dedication to patient healing."
        ]
        title = titles[0 if idx == 285 else 1]
        caption = captions[0 if idx == 285 else 1]
        slug_prefix = f"nursing-team-celebrating-awards-{idx}"
    # 288 - 291: Team Spirit & Holi
    elif idx == 288:
        cat = "Doctors"
        title = "Dr. Avinash & Dr. Chandrika — Celebration Cake & Floral Bouquet"
        caption = "Celebratory portrait of Dr. Avinash Kasamwar and Dr. Chandrika with festive cake and red roses."
        slug_prefix = "dr-avinash-chandrika-celebration-cake"
    elif idx == 289:
        cat = "Hospital"
        title = "Hospital Leadership & Administrative Staff at Reception"
        caption = "Hospital administrators and nursing coordinators at the central reception counter."
        slug_prefix = "leadership-administrative-staff-reception"
    elif idx == 290:
        cat = "Hospital"
        title = "Hospital Staff Camaraderie & Dedicated Healthcare Team"
        caption = "Young hospital support staff and technicians sharing moments of camaraderie at Devibai Hospital."
        slug_prefix = "hospital-support-staff-camaraderie"
    elif idx == 291:
        cat = "Events & Celebrations"
        title = "Holi Colors Celebration with Hospital Staff Team"
        caption = "Doctors and clinical technicians enjoying vibrant Holi festival celebrations at the hospital."
        slug_prefix = "holi-colors-celebration-staff"
    # 292: Live Surgery in Minor OT / Procedure Suite
    elif idx == 292:
        cat = "Surgery"
        title = "Live Surgical Procedure in Procedure Room / Minor OT"
        caption = "Surgical team and scrub nurse performing clinical intervention under sterile conditions with active vitals monitoring."
        slug_prefix = "live-surgical-procedure-minor-ot"
    elif idx == 293:
        cat = "Hospital"
        title = "Certificate Awarding to Nursing Trainees & Medical Staff"
        caption = "Dr. Avinash Kasamwar and Dr. Chandrika awarding clinical completion certificates to nursing trainees."
        slug_prefix = "nursing-trainees-certificate-awarding"
    elif idx in [294, 295]:
        cat = "Events & Celebrations"
        titles = [
            "Temple Committee Honoring Dr. Avinash with Saffron Shawls",
            "Devotional Aarti & Puja with Temple Priests"
        ]
        captions = [
            "Temple trustees conferring traditional honors upon Dr. Avinash Kasamwar.",
            "Dr. Avinash and Dr. Chandrika participating in temple puja for patient welfare and regional harmony."
        ]
        title = titles[idx - 294]
        caption = captions[idx - 294]
        slug_prefix = f"temple-blessings-puja-{idx-293}"
    # 296 - 307: Women's Badminton Championship & Achiever Coronation
    elif idx in range(296, 308):
        cat = "Awards & Recognition" if idx in [299, 301] else "Events & Celebrations"
        w_titles = {
            296: ("Women's Badminton Tournament on Court in Nirmal", "Dr. Chandrika and women players holding racquets on the indoor badminton court."),
            297: ("Women Badminton Doubles Players Ready for Match", "Women participants in vibrant sports sarees and sports gear before the friendly tournament."),
            298: ("Tournament Organizers & Female Athletes at Stadium", "Organizers and participants gathered on the indoor wooden badminton court."),
            299: ("Coronation Ceremony: Dr. Chandrika Crowned on Royal Chair", "Dr. K. Chandrika felicitated with a golden crown and title memento seated on the coronation chair."),
            300: ("Group Photo of Women Participants at Sports Conclave", "Dozens of young women and student athletes participating in the wellness tournament."),
            301: ("Coronation Honor & Plaque Presentation for Dr. Chandrika", "Organizers presenting achievement plaque to Dr. Chandrika for inspiring women across northern Telangana."),
            302: ("Dr. Chandrika at Women Empowerment Sports Tournament Backdrop", "Dr. Chandrika posing at the official tournament backdrop celebrating female leadership."),
            303: ("Tournament Celebration Cake Cutting on Badminton Court", "Dr. Chandrika and participants cutting the tournament cake celebrating fitness and sportsmanship."),
            304: ("Cake Cutting Moment with All Tournament Participants", "Cheerful sports players celebrating tournament success together."),
            305: ("Presenting Special Recognition Memento to Dr. Chandrika", "Badminton tournament coordinators presenting honor memento to Dr. Chandrika."),
            306: ("Cheering Sports Participants Group Photo", "Enthusiastic gathering of women athletes and community members in Nirmal."),
            307: ("Awarding Championship Trophy to Badminton Winners", "Dr. Chandrika presenting the winner trophy to young badminton champion.")
        }
        title, caption = w_titles[idx]
        slug_prefix = f"womens-badminton-coronation-{idx-295}"
    # 308 - 311: Hospital calendar & sports
    elif idx == 308:
        cat = "Events & Celebrations"
        title = "Community Meeting with Dr. Avinash Kasamwar"
        caption = "Dr. Avinash Kasamwar meeting with local youth and community members in Nirmal."
        slug_prefix = "community-meeting-dr-avinash"
    elif idx in [309, 311]:
        cat = "Hospital"
        title = f"Annual Healthcare Planner & Calendar Release (Part {1 if idx==309 else 2})"
        caption = "Releasing official hospital health planner and calendar with civic leaders in the doctor's office."
        slug_prefix = f"hospital-planner-calendar-release-{idx}"
    elif idx == 310:
        cat = "Events & Celebrations"
        title = "Trophy Presentation to Outstanding Female Athletes"
        caption = "Presenting merit trophies to women sports participants encouraging health and active lifestyle."
        slug_prefix = "trophy-presentation-female-athletes"
    # 312: Patient Financial Assistance Cheque Handover
    elif idx == 312:
        cat = "Medical Care"
        title = "Handing Over Medical Financial Assistance Cheque to Patient Family"
        caption = "Dr. K. Avinash Kasamwar presenting a medical aid subsidy cheque to an underprivileged patient's family to support treatment costs."
        slug_prefix = "medical-financial-aid-cheque-handover"
    # 313 - 321: Patient Recoveries & Discharge Celebrations
    elif idx in range(313, 322):
        cat = "Medical Care" if idx in [313, 314, 315] else "Hospital"
        rec_titles = {
            313: ("Recovered Patient Expressing Deep Gratitude to Dr. Chandrika", "Grateful patient and family thanking Dr. Chandrika at reception after successful treatment."),
            314: ("Patient Discharge Celebration with Doctor & Nursing Team", "Happy recovered patient family celebrating healthy discharge with Dr. Chandrika and ward nurses."),
            315: ("Patient Family Sharing Smiles and Blessings with Staff", "Smiles of relief and joy as patient returns home fully cured from Devibai Hospital."),
            316: ("Celebration Cake Cutting with Recovered Patient Family", "Dr. Chandrika cutting celebratory cake with patient family at reception counter."),
            317: ("Medical Team and Thankful Patient Family Group Photo", "Doctors, nurses, and patient relatives posing together at reception desk."),
            318: ("Cake Cutting Celebrating Successful Patient Healing", "Devibai Hospital doctors and nurses sharing celebration cake after complex recovery."),
            319: ("Cake Distribution Among Hospital Clinical Staff", "Joyful celebration of clinical milestones and life-saving interventions."),
            320: ("Dr. Chandrika Sharing Celebration Cake with Nurses", "Dr. Chandrika feeding cake to nursing staff expressing appreciation for their tireless bedside care."),
            321: ("Hospital Milestone Celebration with Patients & Staff", "Warm group celebration in the reception lobby with recovered patients and healthcare team.")
        }
        title, caption = rec_titles[idx]
        slug_prefix = f"patient-recovery-discharge-celebration-{idx-312}"
    # 322 - 326: Cricket Tournament Sponsorship & Trophies
    elif idx in range(322, 327):
        cat = "Events & Celebrations"
        crick_titles = {
            322: ("Presenting Championship Trophy to Sunrisers Nirmal Cricket Team", "Dr. Avinash Kasamwar presenting the winner trophy to captain and players of Sunrisers Nirmal."),
            323: ("Awarding Runners-Up Trophy to Nirmal Titans Cricket Team", "Dr. Avinash handing the glittering trophy to Nirmal Titans team in the regional cricket championship."),
            324: ("Dr. Avinash Consulting with Visiting Medical Colleagues", "Dr. Avinash in discussion with specialist medical practitioners in clinical chamber."),
            325: ("Clinical Consultation Room Strategy Discussion", "Doctors reviewing treatment modalities and surgical scheduling."),
            326: ("Dr. Avinash Presenting Player of the Tournament Trophy", "Dr. Avinash Kasamwar awarding Player of the Tournament trophy to star all-rounder.")
        }
        title, caption = crick_titles[idx]
        slug_prefix = f"cricket-tournament-trophy-{idx-321}"
    # 327 - 330: Live Major Operation Theatre Surgeries
    elif idx in [327, 328, 330]:
        cat = "Surgery"
        ot_titles = {
            327: ("Major Surgical Intervention in Sterile Modular OT", "Dr. K. Avinash Kasamwar and surgical team in sterile scrubs performing advanced operation under shadowless lights."),
            328: ("Laparoscopic & Open Surgery in Progress with OT Team", "Dedicated surgical team, scrub nurse, and anaesthesiologist operating with precision in the modular OT."),
            330: ("Operation Theatre Suite with Ultrasound & Monitoring Towers", "Advanced intraoperative monitoring and surgical instrumentation setup in Devibai Hospital OT.")
        }
        title, caption = ot_titles[idx]
        slug_prefix = f"modular-ot-live-surgery-{idx}"
    # 329, 331 - 335: Hanuman Temple Blessings
    elif idx in [329, 331, 332, 333, 334, 335]:
        cat = "Events & Celebrations"
        title = f"Hanuman Temple Committee Honors & Deity Blessings (Part {idx-328})"
        caption = f"Temple committee elders and priests conferring sacred saffron shawls and Lord Hanuman deity idols upon Dr. Avinash Kasamwar."
        slug_prefix = f"hanuman-temple-committee-honors-{idx-328}"
    # 336 - 341, 346 - 348: Nirmal Premier League (NPL Season 4)
    elif idx in [336, 337, 339, 346, 347, 348]:
        cat = "Events & Celebrations"
        npl_titles = {
            336: ("Nirmal Premier League (NPL Season 4) Jersey Launch on Stage", "Dr. Avinash Kasamwar and organizers launching official team jerseys for Nirmal Premier League Season 4."),
            337: ("Unveiling Official Player Jersey (Nadeem 03) on Dais", "Dr. Avinash unveiling player jerseys alongside sports patron committee."),
            339: ("Dignitaries and Organizing Committee of NPL Season 4", "Sports committee and sponsors on stage at the Nirmal Premier League launch ceremony."),
            346: ("NPL Season 4 Organizing Committee Group Photo", "Full organizing committee, match referees, and sponsors on the official dais."),
            347: ("Tournament Sponsors & Patrons of Regional Cricket League", "Dr. Avinash Kasamwar with fellow patrons supporting grassroots sports in Nirmal."),
            348: ("Felicitation of Dr. Avinash Kasamwar at Cricket League Launch", "Organizers felicitating Dr. Avinash Kasamwar with silk shawl as key patron of youth sports.")
        }
        title, caption = npl_titles[idx]
        slug_prefix = f"nirmal-premier-league-sponsorship-{idx}"
    elif idx in [338, 340, 341]:
        cat = "Hospital"
        title = f"Health Awareness Booklet Distribution in Doctor's Chamber (Part {idx-337})"
        caption = "Dr. Avinash Kasamwar presenting hospital health education guides to visiting community representatives."
        slug_prefix = f"health-guide-distribution-chamber-{idx-337}"
    elif idx == 342:
        cat = "Events & Celebrations"
        title = "Vedam Global School Annual Day — Dr. Avinash as Guest of Honor"
        caption = "Dr. Avinash Kasamwar encouraging students, teachers, and parents at Vedam Global School annual day celebrations."
        slug_prefix = "vedam-global-school-annual-day"
    # 343, 345: Rural Women Healthcare Empowerment
    elif idx in [343, 345]:
        cat = "Medical Care"
        title = f"Dr. Chandrika with Rural Women Healthcare Group (Session {1 if idx==343 else 2})"
        caption = "Dr. K. Chandrika interacting with rural women and self-help group leaders, promoting antenatal care and cervical health awareness."
        slug_prefix = f"rural-women-healthcare-empowerment-{idx}"
    elif idx == 344:
        cat = "Events & Celebrations"
        title = "Community Leaders Honoring Dr. Avinash with Silk Shawl"
        caption = "Distinguished guests presenting celebratory silk shawl to Dr. Avinash Kasamwar."
        slug_prefix = "community-shawl-honor-dr-avinash"
    elif idx in [349, 350]:
        cat = "Hospital"
        title = f"Presenting Devotional Calendar & Literature in Office (Part {idx-348})"
        caption = "Community members and temple trustees visiting Dr. Avinash's consultation office."
        slug_prefix = f"devotional-literature-office-{idx-348}"
    elif idx in [351, 352, 353, 354]:
        cat = "Events & Celebrations"
        title = f"Spiritual Elders & Community Blessing Ceremony (Part {idx-350})"
        caption = "Spiritual elders, swamis, and committee members conferring traditional blessings upon Dr. Avinash Kasamwar."
        slug_prefix = f"spiritual-elders-blessing-ceremony-{idx-350}"
    # 355, 356: Sri Rama Navami Illuminated Lighting Display
    elif idx in [355, 356]:
        cat = "Events & Celebrations"
        titles = [
            "Sri Rama Navami Illuminated Lighting Display in Nirmal",
            "Community Devotees Gathered at Illuminated Sri Rama Display"
        ]
        captions = [
            "Magnificent illuminated decorative lighting display depicting Lord Sri Rama during festival celebrations in Nirmal.",
            "Dr. Avinash Kasamwar and devotees gathered at the illuminated Sri Rama Navami celebration site."
        ]
        title = titles[idx - 355]
        caption = captions[idx - 355]
        slug_prefix = f"sri-rama-navami-illuminated-display-{idx-354}"
    # 357 - 363: 68th School Games Federation (SGF) Nirmal District 2024-2025
    elif idx in range(357, 364):
        cat = "Events & Celebrations"
        sgf_titles = {
            357: ("68th School Games Federation (SGF) Nirmal District Banner", "Official banner: '68th SCHOOL GAMES FEDERATION OF TELANGANA STATE (SGF) NIRMAL DISTRICT 2024-2025' at NTR Mini Stadium."),
            358: ("SGF Sports Officials Honoring Dr. Avinash with Memento", "School Games Federation organizers presenting appreciation memento to Dr. Avinash Kasamwar."),
            359: ("Young Student Athletes at SGF Nirmal District Meet", "School sports participants in sports uniforms assembled for inter-school athletics competition."),
            360: ("Memento of Appreciation Presented by SGF Committee", "Sports federation officers expressing gratitude for Devibai Hospital's medical aid and sponsorship."),
            361: ("Sports Committee & Dignitaries Seated at NTR Mini Stadium", "Elected sports representatives, coaches, and guests overseeing the school tournament."),
            362: ("SGF Championship Certificate & Trophy Presentation", "Dr. Avinash Kasamwar presenting medals and certificates to victorious student athletes."),
            363: ("Awarding Championship Trophy to Girls Sports Team", "Dr. Avinash Kasamwar and organizers presenting the coveted district championship trophy to girls sports team.")
        }
        title, caption = sgf_titles[idx]
        slug_prefix = f"sgf-school-games-federation-2025-{idx-356}"
    elif idx == 364:
        cat = "Events & Celebrations"
        title = "Family & Community Blessing with Sacred Deity Portrait"
        caption = "Devotees and community members presenting framed deity portrait to Dr. Avinash and family."
        slug_prefix = "family-community-blessing-deity-portrait"
    elif idx == 365:
        cat = "Events & Celebrations"
        title = "Karthika Deepotsavam — Lighting Traditional Earthen Oil Lamps"
        caption = "Dr. Avinash Kasamwar lighting rows of auspicious clay lamps during Karthika Deepotsavam celebrations in Nirmal."
        slug_prefix = "karthika-deepotsavam-oil-lamps-lighting"
    elif idx == 366:
        cat = "Doctors"
        title = "Celebration Moment with Dr. K. Chandrika & Dr. Avinash"
        caption = "Warm celebration portrait of Dr. Chandrika and Dr. Avinash Kasamwar."
        slug_prefix = "celebration-moment-dr-chandrika-dr-avinash"
    # 367 - 371: Nirmal Badminton Tournament Opening Ceremony
    elif idx in range(367, 372):
        cat = "Events & Celebrations"
        bt_titles = {
            367: ("Nirmal Badminton Tournament Opening Ceremony on Court", "Sports patrons and organizers gathered on the indoor court for the tournament opening ceremony."),
            368: ("Community Gathering with Dr. Avinash at Sports Arena", "Local youth and badminton enthusiasts interacting with Dr. Avinash Kasamwar."),
            369: ("Felicitating Tournament Organizer with Silk Shawl on Court", "Dr. Avinash Kasamwar honoring tournament coordinator with celebratory shawl."),
            370: ("Badminton Tournament Guests of Honor Seated on Dais", "Dignitaries and sports patrons seated on stage overlooking the tournament courts."),
            371: ("Honoring Badminton Referee & Officials with Silk Shawls", "Presenting commemorative shawls to match referees and tournament officials.")
        }
        title, caption = bt_titles[idx]
        slug_prefix = f"nirmal-badminton-tournament-opening-{idx-366}"
        
    return {
        "slug": f"{slug_prefix}-{idx+1:03d}",
        "title": title,
        "category": cat,
        "caption": caption
    }

# Process all 372 unique photos
new_gallery_items = []

for idx, filename in enumerate(unique_photos):
    meta = get_metadata(idx, filename)
    slug = meta["slug"]
    clean_filename = f"{slug}.jpg"
    src_path = os.path.join(PHOTOS_DIR, filename)
    dst_path = os.path.join(PUBLIC_PHOTOS_DIR, clean_filename)
    
    # Copy file if not exists or update
    if not os.path.exists(dst_path) or os.path.getsize(dst_path) == 0:
        shutil.copy2(src_path, dst_path)
        
    new_gallery_items.append({
        "id": slug,
        "title": meta["title"],
        "category": meta["category"],
        "image": f"/photos/{clean_filename}",
        "caption": meta["caption"]
    })

print(f"Generated {len(new_gallery_items)} new gallery items.")
print(f"Sample item 0: {new_gallery_items[0]}")
print(f"Sample item 84: {new_gallery_items[84]}")
print(f"Sample item 371: {new_gallery_items[-1]}")

# Save json for inspection
with open(r"c:\Users\badav\Desktop\2026\DEVI_BHAI_HOSPITAL\scripts\generated_gallery_items.json", "w", encoding="utf-8") as f:
    json.dump(new_gallery_items, f, indent=2)

print("JSON saved successfully.")
