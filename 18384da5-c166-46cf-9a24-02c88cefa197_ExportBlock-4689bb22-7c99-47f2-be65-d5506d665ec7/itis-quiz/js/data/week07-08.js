// Week 7-8 — Computer Security (Attack Results, Threat Modelling, Kill Chain, Recon) และ DoS Attack Defenses
QUIZ.addQuestions("w7", [
  {
    id: "w7-01", type: "R", topic: "Attack Results (RFC 2828)",
    q: "ตาม RFC 2828 ผลกระทบจากภัยคุกคาม (Threat Consequences) แบ่งเป็น 4 ประเภทใด",
    c: [
      "Spoofing, Tampering, Repudiation, Disclosure",
      "Unauthorized Disclosure, Deception, Disruption, Usurpation",
      "Prevent, Detect, Correct, Recover",
      "Interception, Interruption, Modification, Fabrication"
    ],
    a: 1,
    why: "RFC 2828 แบ่งผลกระทบเป็น Unauthorized Disclosure (ข้อมูลรั่ว), Deception (หลอกลวง), Disruption (ขัดขวาง) และ Usurpation (ยึดครอง)",
    w: [
      "นี่คือบางส่วนของ STRIDE ซึ่งใช้จำแนกประเภทภัยคุกคาม ไม่ใช่ผลกระทบตาม RFC 2828",
      null,
      "นี่คือหน้าที่ของ Security Controls ไม่ใช่ผลกระทบของการโจมตี",
      "ชุดคำนี้ไม่ใช่การแบ่ง 4 ประเภทตาม RFC 2828 ที่ใช้ในบทเรียน"
    ]
  },
  {
    id: "w7-02", type: "U", topic: "Attack Results (RFC 2828)",
    q: "ผู้โจมตีแฮกบัญชีผู้ดูแลระบบได้สำเร็จ แล้วใช้เซิร์ฟเวอร์ขององค์กรเป็นฐานขุดเหมืองคริปโตโดยไม่มีสิทธิ์ ผลกระทบนี้ตรงกับประเภทใดตาม RFC 2828 มากที่สุด",
    c: [
      "Deception",
      "Unauthorized Disclosure",
      "Usurpation",
      "Disruption"
    ],
    a: 2,
    why: "Usurpation คือการยึดครองหรือใช้ทรัพยากรของระบบโดยไม่มีสิทธิ์ เช่น แฮกบัญชีผู้ดูแลแล้วนำทรัพยากรไปใช้",
    w: [
      "Deception คือทำให้ระบบ/ผู้ใช้เข้าใจผิดหรือได้รับข้อมูลปลอม เช่น ปลอมตัวเป็นผู้ใช้จริง",
      "Unauthorized Disclosure คือข้อมูลรั่วไหล แต่โจทย์เน้นการนำทรัพยากรไปใช้",
      null,
      "Disruption คือทำให้ระบบหยุดหรือทำงานผิดปกติ เช่น DDoS แต่จุดหลักของโจทย์คือการยึดใช้ทรัพยากร"
    ]
  },
  {
    id: "w7-03", type: "U", topic: "STRIDE vs DREAD",
    q: "ข้อใดอธิบายบทบาทของ STRIDE และ DREAD ใน Threat Modelling ได้ถูกต้อง",
    c: [
      "STRIDE ใช้จำแนกประเภทภัยคุกคาม ส่วน DREAD ใช้ประเมินระดับความเสี่ยงของภัยคุกคาม",
      "STRIDE ใช้ประเมินความเสี่ยงเป็นคะแนนหลายด้าน ส่วน DREAD ใช้จำแนกประเภทของภัยคุกคาม",
      "ทั้งสองเป็นขั้นตอนของ Cyber Kill Chain",
      "STRIDE ใช้กับ Network ส่วน DREAD ใช้กับ Application เท่านั้น"
    ],
    a: 0,
    why: "บทเรียนสรุปว่า STRIDE ใช้จำแนกประเภทภัยคุกคาม 6 แบบ ส่วน DREAD ใช้ประเมินความเสี่ยง 5 ด้าน",
    w: [
      null,
      "สลับบทบาทกัน",
      "Cyber Kill Chain คือลำดับขั้นการโจมตี 7 ขั้น ไม่เกี่ยวกับ STRIDE/DREAD",
      "บทเรียนไม่ได้แบ่งการใช้งานตามชั้น Network/Application"
    ]
  },
  {
    id: "w7-04", type: "A", topic: "STRIDE",
    q: "ลูกค้ารายหนึ่งปฏิเสธว่าไม่เคยสั่งโอนเงิน แต่ระบบไม่มี Log หรือหลักฐานยืนยันว่าใครเป็นผู้ทำรายการ ภัยคุกคามนี้ตรงกับ STRIDE ข้อใด และมาตรการใดช่วยลดความเสี่ยงได้ตรงจุดที่สุด",
    c: [
      "Spoofing — บังคับเพิ่มความยาวและความซับซ้อนของรหัสผ่าน",
      "Tampering — เข้ารหัสฐานข้อมูลธุรกรรมทั้งหมดด้วย AES",
      "Denial of Service — เพิ่ม Bandwidth และทำ Load Balancing ให้ระบบธุรกรรม",
      "Repudiation — เก็บ Audit Log ที่เชื่อถือได้ผูกการกระทำกับผู้ใช้"
    ],
    a: 3,
    why: "Repudiation คือการปฏิเสธว่าไม่ได้กระทำ การป้องกันคือมีหลักฐาน เช่น Audit Log ที่ผูกการกระทำกับตัวตนผู้ใช้อย่างน่าเชื่อถือ",
    w: [
      "Spoofing คือการปลอมตัวตน แต่โจทย์คือการปฏิเสธการกระทำโดยไม่มีหลักฐาน",
      "Tampering คือการแก้ไขข้อมูลโดยไม่ได้รับอนุญาต ไม่ใช่ประเด็นในโจทย์",
      "DoS คือทำให้บริการใช้งานไม่ได้ ไม่เกี่ยวกับการปฏิเสธธุรกรรม",
      null
    ]
  },
  {
    id: "w7-05", type: "A", topic: "STRIDE",
    q: "ผู้ใช้ทั่วไปในระบบ Web Application พบว่าการแก้ค่า role=user เป็น role=admin ในคำขอ ทำให้เข้าหน้าจัดการระบบได้ ภัยคุกคามนี้ตรงกับ STRIDE ข้อใด",
    c: [
      "Information Disclosure",
      "Elevation of Privilege",
      "Repudiation",
      "Denial of Service"
    ],
    a: 1,
    why: "ผู้ใช้ทั่วไปได้สิทธิ์ระดับ Admin คือ Elevation of Privilege (การยกระดับสิทธิ์)",
    w: [
      "Information Disclosure คือการเปิดเผยข้อมูล แต่จุดหลักคือได้สิทธิ์สูงขึ้น",
      null,
      "Repudiation คือการปฏิเสธว่าไม่ได้ทำ ไม่เกี่ยวกับการได้สิทธิ์เพิ่ม",
      "DoS คือการทำให้บริการใช้งานไม่ได้"
    ]
  },
  {
    id: "w7-06", type: "R", topic: "DREAD",
    q: "ในเกณฑ์ DREAD ตัวอักษร \"A\" หมายถึงข้อใด",
    c: [
      "Authentication — ความแข็งแรงของการยืนยันตัวตน",
      "Availability — ความพร้อมใช้งานของระบบ",
      "Affected Users — จำนวนผู้ใช้ที่ได้รับผลกระทบ",
      "Attack Vector — ช่องทางที่ใช้โจมตี"
    ],
    a: 2,
    why: "DREAD = Damage, Reproducibility, Exploitability, Affected Users, Discoverability",
    w: [
      "Authentication ไม่ได้อยู่ในเกณฑ์ DREAD",
      "Availability เป็นส่วนของ CIA Triad ไม่ใช่ตัว A ใน DREAD",
      null,
      "Attack Vector ไม่ใช่เกณฑ์ใน DREAD ตามบทเรียน"
    ]
  },
  {
    id: "w7-07", type: "R", topic: "Cyber Kill Chain",
    q: "ใน Cyber Kill Chain ขั้นตอนใดเกิดขึ้นถัดจาก Delivery",
    c: [
      "Exploitation",
      "Weaponization",
      "Installation",
      "Command and Control (C2)"
    ],
    a: 0,
    why: "ลำดับคือ Reconnaissance → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objectives",
    w: [
      null,
      "Weaponization เกิดก่อน Delivery (เตรียมเครื่องมือ/ไฟล์อันตรายก่อนส่ง)",
      "Installation เกิดหลัง Exploitation",
      "C2 เกิดหลัง Installation"
    ]
  },
  {
    id: "w7-08", type: "A", topic: "Cyber Kill Chain",
    q: "ทีม SOC พบว่าเครื่องพนักงานเครื่องหนึ่งส่ง HTTPS Request ไปยังโดเมนแปลก ๆ ทุก 5 นาทีเพื่อรอรับคำสั่ง การโจมตีอยู่ในขั้นใดของ Kill Chain และควรตอบสนองอย่างไรก่อน",
    c: [
      "Reconnaissance — สแกนพอร์ตเครื่องผู้โจมตีกลับ",
      "Weaponization — อัปเดต Signature ของอีเมลเกตเวย์เพียงอย่างเดียวก็เพียงพอ",
      "Command and Control — แยกเครื่องออกจากเครือข่ายและบล็อกโดเมนปลายทาง",
      "Delivery — แจ้งพนักงานไม่ให้เปิดอีเมลอีก"
    ],
    a: 2,
    why: "การติดต่อออกไปรับคำสั่งเป็นระยะคือขั้น C2 ซึ่งหมายความว่ามัลแวร์ติดตั้งแล้ว ควรตัดการสื่อสาร (บล็อกโดเมน) และแยกเครื่องเพื่อจำกัดความเสียหาย",
    w: [
      "Reconnaissance เป็นขั้นแรกของผู้โจมตี ไม่ใช่สิ่งที่เกิดบนเครื่องเหยื่อแล้ว",
      "Weaponization เกิดฝั่งผู้โจมตีก่อนส่ง และการอัปเดต Signature อย่างเดียวไม่หยุดเครื่องที่ติดแล้ว",
      null,
      "มัลแวร์ผ่านขั้น Delivery ไปแล้ว การแจ้งพนักงานไม่หยุดการสื่อสารที่กำลังเกิดขึ้น"
    ]
  },
  {
    id: "w7-09", type: "U", topic: "Cyber Kill Chain",
    q: "ผู้โจมตีสร้างไฟล์ Word ที่ฝัง Exploit ไว้ แล้วส่งเป็นไฟล์แนบในอีเมลฟิชชิง กิจกรรมทั้งสองตรงกับขั้นใดของ Kill Chain ตามลำดับ",
    c: [
      "Reconnaissance แล้ว Exploitation",
      "Weaponization แล้ว Delivery",
      "Delivery แล้ว Installation",
      "Exploitation แล้ว Command and Control"
    ],
    a: 1,
    why: "การเตรียมไฟล์อันตรายคือ Weaponization และการส่งไปยังเป้าหมายผ่านอีเมลคือ Delivery",
    w: [
      "Reconnaissance คือการรวบรวมข้อมูล ไม่ใช่การสร้างไฟล์ และ Exploitation คือการใช้ช่องโหว่เมื่อไฟล์ถูกเปิด",
      null,
      "การสร้างไฟล์ไม่ใช่ Delivery และการส่งอีเมลไม่ใช่ Installation",
      "ยังไม่มีการใช้ช่องโหว่หรือติดต่อ C2 ในสองกิจกรรมนี้"
    ]
  },
  {
    id: "w7-10", type: "U", topic: "Malware Attack: Carrier-dependent",
    q: "ข้อใดไม่ใช่ตัวอย่างของพาหะ (Carrier) ที่มัลแวร์แบบ Carrier-dependent ใช้แพร่กระจาย",
    c: [
      "ไฟล์โปรแกรมที่เรียกทำงานได้ (Executable Files)",
      "ส่วนเริ่มต้นการบูตของดิสก์ (Boot Sector)",
      "เอกสารที่มีสคริปต์ทำงานได้ (Script-enabled Files)",
      "ช่องโหว่บริการเครือข่ายที่ Worm ใช้แพร่โดยตรง"
    ],
    a: 3,
    why: "Carrier-dependent ต้องอาศัยไฟล์/โปรแกรมอื่น เช่น Executable, Boot Sector, เอกสารที่มีสคริปต์ ส่วน Worm ที่แพร่ผ่านช่องโหว่เครือข่ายโดยตรงจัดเป็นแบบไม่ต้องอาศัยพาหะ",
    w: [
      "ไฟล์โปรแกรมที่เรียกทำงานได้เป็นพาหะตามบทเรียน",
      "Boot Sector เป็นพาหะตามบทเรียน",
      "ไฟล์เอกสารที่มีสคริปต์ทำงานได้เป็นพาหะตามบทเรียน",
      null
    ]
  },
  {
    id: "w7-11", type: "U", topic: "DoS vs DDoS",
    q: "เหตุใด DDoS จึงป้องกันได้ยากกว่า DoS",
    c: [
      "เพราะ DDoS ใช้เฉพาะ ICMP ซึ่ง Firewall ทุกประเภทไม่สามารถกรองได้",
      "เพราะ DDoS เข้ารหัส Traffic ทั้งหมดด้วย TLS ทำให้ IDS/IPS มองไม่เห็นเนื้อหาเลย",
      "เพราะมาจากหลายเครื่องพร้อมกัน (มักเป็น Botnet) การบล็อกแหล่งเดียวจึงไม่พอ",
      "เพราะ DDoS ต้องอาศัยช่องโหว่ Zero-day ที่ยังไม่มี Patch ทุกครั้ง"
    ],
    a: 2,
    why: "DDoS มาจากหลายอุปกรณ์พร้อมกัน มักใช้ Botnet ทำให้ Traffic มีปริมาณมากและมาจากหลายแหล่ง การบล็อก IP เดียวจึงไม่ได้ผล",
    w: [
      "DDoS ใช้ได้หลาย Protocol ไม่ได้จำกัดที่ ICMP",
      "การเข้ารหัสไม่ใช่ลักษณะเฉพาะของ DDoS",
      null,
      "DDoS ส่วนใหญ่เน้นทำให้ทรัพยากรหมด ไม่จำเป็นต้องใช้ช่องโหว่ Zero-day"
    ]
  },
  {
    id: "w7-12", type: "A", topic: "DoS: Resource Exhaustion vs Vulnerability",
    q: "เซิร์ฟเวอร์ล่ม (Blue Screen) ทันทีเมื่อได้รับ Packet ที่ผิดรูปแบบเพียงไม่กี่ Packet ขณะที่ Bandwidth และ CPU ยังต่ำ แนวทางแก้ไขระยะยาวที่ตรงจุดที่สุดคือข้อใด",
    c: [
      "เพิ่ม Bandwidth ของลิงก์อินเทอร์เน็ตให้รองรับ Traffic ได้มากขึ้น",
      "แก้ไขช่องโหว่ด้วยการติดตั้ง Patch ของระบบ/Application ที่เกี่ยวข้อง",
      "ทำ Rate Limiting จำกัดจำนวน Request ต่อวินาทีที่เข้าสู่เซิร์ฟเวอร์ทุกช่องทาง",
      "เพิ่ม RAM และ CPU ของเซิร์ฟเวอร์ให้รับภาระได้มากขึ้น"
    ],
    a: 1,
    why: "เป็น DoS แบบ Exploiting Vulnerability (ใช้ช่องโหว่ทำให้ระบบ Crash) ไม่ใช่ Resource Exhaustion จึงต้องแก้ที่ช่องโหว่ (Fix Vulnerability)",
    w: [
      "ทรัพยากรยังต่ำ ปัญหาไม่ได้อยู่ที่ Bandwidth",
      null,
      "เพียงไม่กี่ Packet ก็ทำให้ล่มได้ Rate Limiting จึงไม่แก้ต้นเหตุ",
      "ปัญหาไม่ใช่หน่วยความจำไม่พอ แต่เป็นข้อบกพร่องในการประมวลผล Packet"
    ]
  },
  {
    id: "w7-13", type: "A", topic: "Security Controls",
    q: "หลังเหตุการณ์ Ransomware ทีมงานทำ 4 อย่าง: (1) วิเคราะห์ Log ว่าเครื่องใดได้รับผลกระทบ (2) ติดตั้ง Patch ช่องโหว่ที่ถูกใช้ (3) Restore ข้อมูลจาก Backup (4) ติดตั้ง IDS เพิ่ม ข้อใดจับคู่กับหน้าที่ของ Security Controls ได้ถูกต้อง",
    c: [
      "(1) Detect, (2) Recovery, (3) Correct, (4) Prevent",
      "(1) Prevent, (2) Identify, (3) Recovery, (4) Correct",
      "(1) Identify, (2) Correct, (3) Recovery, (4) Detect",
      "(1) Recovery, (2) Prevent, (3) Identify, (4) Detect"
    ],
    a: 2,
    why: "การวิเคราะห์ Log = Identify, การติดตั้ง Patch = Correct, การ Restore Backup = Recovery และ IDS = Detect ตามตัวอย่างในบทเรียน",
    w: [
      "Patch คือการแก้ไข (Correct) และ Restore คือการกู้คืน (Recovery) ไม่ใช่สลับกัน",
      "การวิเคราะห์ Log ไม่ใช่การป้องกัน และ IDS ทำหน้าที่ตรวจจับ ไม่ใช่แก้ไข",
      null,
      "การวิเคราะห์ Log ไม่ใช่การกู้คืน และ Restore ไม่ใช่การระบุเหตุการณ์"
    ]
  },
  {
    id: "w7-14", type: "U", topic: "Passive vs Active Reconnaissance",
    q: "ข้อใดเปรียบเทียบ Passive กับ Active Reconnaissance ได้ถูกต้อง",
    c: [
      "Passive ส่ง Probe ไปยังเป้าหมายโดยตรงเพื่อหาพอร์ต ส่วน Active ใช้เฉพาะข้อมูลสาธารณะที่เปิดเผยอยู่แล้ว",
      "Passive ไม่ติดต่อเป้าหมายโดยตรงจึงมักตรวจจับยากกว่า ส่วน Active ส่ง Probe จึงถูกตรวจจับง่ายกว่า",
      "ทั้งสองแบบได้ข้อมูลพอร์ต บริการ และช่องโหว่ในระดับเดียวกัน ต่างกันแค่เครื่องมือที่ใช้",
      "Active Reconnaissance เป็นขั้นสุดท้ายของ Kill Chain ส่วน Passive เป็นขั้นแรก"
    ],
    a: 1,
    why: "Passive เก็บข้อมูลโดยไม่ติดต่อเป้าหมายโดยตรง (ข้อมูลสาธารณะ) โอกาสถูกตรวจจับต่ำกว่า ส่วน Active ส่ง Probe เช่นสแกนพอร์ต ได้ข้อมูลพอร์ต/บริการ/ช่องโหว่ แต่ถูกตรวจจับได้ง่ายกว่า",
    w: [
      "สลับนิยามกัน",
      null,
      "Active ได้ข้อมูลพอร์ต บริการ และช่องโหว่ ส่วน Passive ได้ข้อมูลที่เปิดเผยอยู่แล้วเป็นหลัก",
      "Reconnaissance (ทั้งสองแบบ) เป็นขั้นแรกของ Kill Chain"
    ]
  },
  {
    id: "w7-15", type: "A", topic: "เครื่องมือ Reconnaissance",
    q: "ผู้ทดสอบเจาะระบบ (ที่ได้รับอนุญาต) ต้องการทราบว่าองค์กรเป้าหมายมีกล้อง IP หรืออุปกรณ์ IoT ที่เปิดออกสู่อินเทอร์เน็ตหรือไม่ โดยไม่ส่ง Packet ไปยังเครือข่ายเป้าหมายเลย เครื่องมือใดเหมาะสมที่สุด",
    c: [
      "Nmap",
      "Nessus",
      "Shodan",
      "Metasploit"
    ],
    a: 2,
    why: "Shodan เป็นเครื่องมือค้นหาอุปกรณ์ที่เชื่อมต่ออินเทอร์เน็ตจากข้อมูลที่รวบรวมไว้แล้ว จึงจัดเป็น Passive Recon ที่ไม่ต้องติดต่อเป้าหมายโดยตรง",
    w: [
      "Nmap สแกนพอร์ตโดยส่ง Packet ไปยังเป้าหมาย (Active)",
      "Nessus สแกนหาช่องโหว่โดยติดต่อเป้าหมายโดยตรง (Active)",
      null,
      "Metasploit ใช้ทดสอบ/โจมตีช่องโหว่ ต้องติดต่อเป้าหมาย"
    ]
  },
  {
    id: "w7-16", type: "R", topic: "เครื่องมือ Reconnaissance",
    q: "ข้อใดจับคู่เครื่องมือกับหน้าที่หลักได้ถูกต้องทั้งหมด",
    c: [
      "Nmap = Vulnerability Scanning, Nessus = Port Scanning, Nikto = Exploitation Framework",
      "Nmap = Port Scanning, Nessus/OpenVAS = Vulnerability Scanning, Metasploit = Exploitation Framework",
      "Nikto = Packet Analysis, Wireshark = Web Server Scanning, Shodan = Exploitation Framework สำหรับเจาะระบบ",
      "OpenVAS = Subdomain Finder, Nmap = Packet Capture, Metasploit = Port Scanning Tool"
    ],
    a: 1,
    why: "คู่ที่บทเรียนให้จำ: Nmap = Port Scanning, Nessus/OpenVAS = Vulnerability Scanning, Nikto = Web Server Scanning, Metasploit = Exploitation Framework",
    w: [
      "Nmap กับ Nessus สลับหน้าที่กัน และ Nikto ใช้ตรวจ Web Server ไม่ใช่ Exploitation",
      null,
      "Nikto ตรวจ Web Server ส่วน Wireshark วิเคราะห์แพ็กเก็ต (สลับกัน) และ Shodan ใช้ค้นหาอุปกรณ์",
      "OpenVAS สแกนช่องโหว่ และ Nmap ใช้สแกนพอร์ต ไม่ใช่จับแพ็กเก็ต"
    ]
  },
  {
    id: "w7-17", type: "A", topic: "เครื่องมือ Reconnaissance",
    q: "ทีมดูแลเว็บต้องการตรวจ Web Server ของตนเองว่ามีไฟล์ตัวอย่างที่ไม่ควรเปิด เวอร์ชันซอฟต์แวร์เก่า หรือการตั้งค่าที่ไม่ปลอดภัยหรือไม่ เครื่องมือใดตรงกับงานนี้ที่สุด",
    c: [
      "Wireshark",
      "FindSubDomains.com",
      "Nikto",
      "VirusTotal"
    ],
    a: 2,
    why: "Nikto ใช้ตรวจสอบช่องโหว่และการตั้งค่าที่ไม่ปลอดภัยของ Web Server โดยเฉพาะ",
    w: [
      "Wireshark ใช้วิเคราะห์แพ็กเก็ตที่จับได้ ไม่ได้สแกน Web Server",
      "FindSubDomains.com ใช้ค้นหา Subdomain ไม่ได้ตรวจการตั้งค่า Server",
      null,
      "VirusTotal ใช้ตรวจไฟล์หรือ URL ที่น่าสงสัย"
    ]
  },
  {
    id: "w7-18", type: "U", topic: "เครื่องมือ Reconnaissance",
    q: "เหตุใดบทเรียนจึงเตือนว่า Wireshark ไม่ได้เป็น Passive Reconnaissance โดยอัตโนมัติในทุกกรณี",
    c: [
      "เพราะ Wireshark จะส่งแพ็กเก็ตสแกนออกไปยังเป้าหมายทุกครั้งที่เปิดใช้",
      "เพราะ Wireshark เป็นเครื่องมือ Exploitation สำหรับโจมตีช่องโหว่โดยตรง",
      "เพราะ Wireshark ใช้ได้เฉพาะกับเครือข่ายไร้สายที่ไม่ได้เข้ารหัส",
      "เพราะการจัดประเภทขึ้นอยู่กับว่าทราฟฟิกที่วิเคราะห์นั้นได้มาอย่างไร"
    ],
    a: 3,
    why: "Wireshark เป็นเครื่องมือวิเคราะห์ทราฟฟิก การจะเป็น Passive หรือ Active ขึ้นอยู่กับวิธีได้มาซึ่งทราฟฟิกและวิธีใช้งาน",
    w: [
      "Wireshark ทำหน้าที่จับและวิเคราะห์แพ็กเก็ต ไม่ได้ส่งแพ็กเก็ตสแกนเอง",
      "เครื่องมือ Exploitation คือ Metasploit",
      "Wireshark ใช้ได้กับหลายประเภทเครือข่าย",
      null
    ]
  },
  {
    id: "w7-19", type: "U", topic: "Botnet",
    q: "ข้อใดอธิบายบทบาทของ Botnet ในการโจมตี DDoS ได้ถูกต้อง",
    c: [
      "Firewall ที่ผู้โจมตีแอบตั้งค่าให้ปล่อย Traffic ทุกชนิดผ่านเข้าสู่เครือข่ายเป้าหมาย",
      "เครือข่ายอุปกรณ์ที่ถูกยึด และถูกสั่งให้ส่ง Traffic ไปยังเป้าหมายพร้อมกัน",
      "เครื่องมือ Traceback ที่ ISP ใช้ระบุแหล่งที่มาของ Traffic โจมตี",
      "กลุ่มผู้ใช้จริงที่เข้าเว็บไซต์พร้อมกันจำนวนมากหลังมีโปรโมชัน"
    ],
    a: 1,
    why: "Botnet คือกองทัพเครื่อง (รวมถึง IoT) ที่ติดมัลแวร์และถูกควบคุม เมื่อสั่งให้ส่ง Traffic พร้อมกันจะทำให้เป้าหมายรับภาระไม่ไหว",
    w: [
      "Botnet ไม่ใช่ Firewall",
      null,
      "Traceback เป็นแนวทางป้องกัน ไม่ใช่ Botnet",
      "ผู้ใช้จริงที่เข้าพร้อมกันคือ Flash Crowd ไม่ใช่ Botnet"
    ]
  },
  {
    id: "w7-20", type: "R", topic: "Four Lines of Defense Against DDoS",
    q: "แนวป้องกัน DDoS แบบ \"Attack Source Traceback and Identification\" ดำเนินการในช่วงเวลาใด",
    c: [
      "ก่อนเกิดการโจมตีเท่านั้น",
      "ระหว่างและหลังการโจมตี",
      "หลังการโจมตีเท่านั้น",
      "ก่อนและระหว่างการโจมตี"
    ],
    a: 1,
    why: "ตามบทเรียน: Prevention = Before, Detection & Filtering = During, Traceback = During/After, Reaction = After",
    w: [
      "ก่อนการโจมตีคือ Attack Prevention and Preemption",
      null,
      "หลังการโจมตีอย่างเดียวคือ Attack Reaction",
      "Traceback ต้องมี Traffic โจมตีให้สืบ จึงไม่ได้ทำก่อนการโจมตี"
    ]
  },
  {
    id: "w7-21", type: "A", topic: "Flash Crowd vs DDoS",
    q: "เว็บไซต์ร้านค้าออนไลน์มี Traffic เพิ่มขึ้น 50 เท่าทันทีหลังโฆษณาทางโทรทัศน์ ผู้ใช้ส่วนใหญ่ล็อกอินและหยิบสินค้าลงตะกร้าตามปกติ แนวทางใดเหมาะสมที่สุด",
    c: [
      "บล็อก IP ทั้งหมดที่เข้ามาในช่วงนี้ทันที เพราะ Traffic ที่เพิ่ม 50 เท่าเป็น DDoS แน่นอน",
      "ปิดเว็บไซต์ชั่วคราวและเริ่ม Incident Response สำหรับ DDoS ทันที",
      "แจ้ง ISP ให้ Traceback ไปยังแหล่งโจมตีและเตรียมดำเนินคดี",
      "ประเมินว่าเป็น Flash Crowd และเพิ่มการรองรับโหลด แทนการบล็อกแบบเหมารวม"
    ],
    a: 3,
    why: "Traffic เยอะไม่ได้แปลว่าเป็น DDoS เสมอไป เหตุการณ์นี้เป็น Flash Crowd/Flash Event จากผู้ใช้จริง ต้องแยกให้ออกและรองรับผู้ใช้แทนการบล็อก",
    w: [
      "การบล็อกเหมารวมจะตัดลูกค้าจริงออกไป ซึ่งเท่ากับทำ DoS ตัวเอง",
      "ไม่มีหลักฐานการโจมตี การปิดเว็บกระทบธุรกิจโดยไม่จำเป็น",
      "ไม่มีแหล่งโจมตีให้ Traceback เพราะเป็นผู้ใช้จริง",
      null
    ]
  },
  {
    id: "w7-22", type: "U", topic: "Four Lines of Defense Against DDoS",
    q: "หลักการของ Attack Prevention and Preemption ที่ว่า \"ป้องกันให้ใกล้แหล่งที่มาของการโจมตีมากที่สุด\" มีเหตุผลสำคัญคือข้อใด",
    c: [
      "เพื่อกรอง Traffic โจมตีก่อนที่จะรวมกันจนท่วมเครือข่ายและระบบของเป้าหมาย",
      "เพื่อให้ผู้โจมตีรู้ตัวว่าถูกตรวจพบ แล้วหยุดการโจมตีด้วยตัวเอง",
      "เพื่อไม่ต้องเก็บ Log ของการโจมตีไว้ที่เครือข่ายของเป้าหมาย",
      "เพื่อให้ Flash Crowd จากผู้ใช้จริงถูกบล็อกไปพร้อมกับ Traffic โจมตีที่ต้นทาง"
    ],
    a: 0,
    why: "ยิ่งกรอง Traffic โจมตีได้ใกล้ต้นทาง Traffic ก็ยิ่งไม่ไปรวมกันจนเกินความสามารถของลิงก์และระบบปลายทาง",
    w: [
      null,
      "เป้าหมายของการป้องกันไม่ได้อยู่ที่ให้ผู้โจมตีหยุดเอง",
      "การเก็บ Log ยังจำเป็นสำหรับ Traceback และ Review",
      "Flash Crowd เป็นผู้ใช้จริง ไม่ควรถูกบล็อก"
    ]
  },
  {
    id: "w7-23", type: "U", topic: "Attack Source Traceback",
    q: "ข้อใดเป็นข้อจำกัดของการสืบย้อนกลับ (Traceback) ไปยังแหล่งโจมตี DDoS",
    c: [
      "ต้องใช้ Firewall แบบ Stateless ติดตั้งที่ต้นทางทุกจุดเท่านั้น จึงจะสืบย้อนกลับได้",
      "Source IP อาจถูกปลอม และการโจมตีอาจมาจาก Botnet จำนวนมาก ทำให้ใช้เวลานาน",
      "ISP ไม่มีส่วนเกี่ยวข้อง องค์กรต้องสืบย้อนกลับด้วยตนเองทั้งหมด",
      "Traceback ทำได้เฉพาะก่อนที่การโจมตีจะเริ่มต้นขึ้นเท่านั้น"
    ],
    a: 1,
    why: "Traceback ทำได้ยากและใช้เวลา เพราะ IP Spoofing และ DDoS มาจาก Botnet จำนวนมาก แม้จะสำคัญต่อการดำเนินคดี",
    w: [
      "บทเรียนไม่ได้กำหนดชนิด Firewall สำหรับ Traceback",
      null,
      "บทเรียนระบุให้ประสานงานกับ ISP เพื่อช่วย Traceback",
      "Traceback ทำระหว่างและหลังการโจมตี"
    ]
  },
  {
    id: "w7-24", type: "A", topic: "Responding to DoS Attacks",
    q: "ทีมรับมือเหตุการณ์ระบุได้แล้วว่ากำลังถูก ICMP Flood ขั้นตอนถัดไปตามแนวทาง Responding to DoS Attacks ควรเป็นข้อใด",
    c: [
      "Review — สรุปบทเรียนและปรับปรุงแผนรับมือทันทีหลังระบุประเภท",
      "Contingency Plan — ย้ายบริการทั้งหมดไปยัง Backup Server ทันทีก่อนวิเคราะห์",
      "Capture and Analyze — เก็บ Packet และวิเคราะห์ Traffic เพื่อออกแบบ Filter",
      "Traceback — ให้ ISP สืบหาแหล่งโจมตีให้ได้ก่อนทำขั้นตอนอื่น"
    ],
    a: 2,
    why: "ลำดับคือ Identify → Capture and Analyze → Design Filters → Fix Vulnerability → Traceback → Contingency Plan → Review การวิเคราะห์ Packet ช่วยให้ออกแบบ Filter ได้ถูกต้อง",
    w: [
      "Review เป็นขั้นสุดท้ายหลังเหตุการณ์",
      "Contingency Plan มาหลังจากพยายามกรองและแก้ไขแล้ว",
      null,
      "Traceback มาหลังการวิเคราะห์และกรอง Traffic"
    ]
  },
  {
    id: "w7-25", type: "A", topic: "Responding to DoS Attacks",
    q: "ลิงก์อินเทอร์เน็ตขององค์กรถูก Flood จนเต็ม การตั้ง Filter บน Firewall ภายในองค์กรไม่ช่วยให้ลิงก์ว่างขึ้น ควรทำอย่างไรจึงจะได้ผลที่สุด",
    c: [
      "เพิ่ม RAM ให้ Firewall ภายในเพื่อประมวลผล Packet ได้เร็วขึ้น",
      "ปิด Logging บน Firewall เพื่อลดภาระการประมวลผลระหว่างถูกโจมตี",
      "ขอให้ ISP (Upstream) กรอง Traffic โจมตีก่อนถึงลิงก์ขององค์กร",
      "ย้าย Web Server ไปไว้ใน Internal Network หลัง Firewall อีกชั้น"
    ],
    a: 2,
    why: "เมื่อลิงก์เต็มแล้ว การกรองที่ปลายทางสายเกินไป ต้อง Design Filters ที่ Upstream เช่น ISP ซึ่งอยู่ก่อนถึงเครือข่ายเรา",
    w: [
      "ปัญหาคือ Bandwidth ของลิงก์เต็ม การเพิ่ม RAM ให้ Firewall ไม่ทำให้ลิงก์ว่าง",
      "การปิด Log ทำให้เสียข้อมูลสำหรับวิเคราะห์และ Traceback และไม่แก้ปัญหาลิงก์เต็ม",
      null,
      "การย้ายตำแหน่ง Server ไม่ลด Traffic ที่ท่วมลิงก์"
    ]
  },
  {
    id: "w7-26", type: "A", topic: "Four Lines of Defense Against DDoS",
    q: "หลังเว็บไซต์หลักถูก DDoS จนใช้งานไม่ได้ บริษัทเปลี่ยนไปให้บริการผ่าน Backup Server และนัดประชุมเพื่อปรับปรุง Incident Response Plan การกระทำเหล่านี้อยู่ในแนวป้องกันใด",
    c: [
      "Attack Prevention and Preemption",
      "Attack Detection and Filtering",
      "Attack Source Traceback and Identification",
      "Attack Reaction"
    ],
    a: 3,
    why: "Attack Reaction (After attack) คือการตอบสนองและกู้คืนบริการ เช่น ใช้ Backup/Alternate Server และปรับปรุง Incident Response Plan",
    w: [
      "Prevention ทำก่อนการโจมตี เช่น อุดช่องโหว่และเตรียมระบบ",
      "Detection and Filtering ทำระหว่างการโจมตีเพื่อตรวจและกรอง Traffic",
      "Traceback เน้นสืบหาแหล่งโจมตี ไม่ใช่กู้คืนบริการ",
      null
    ]
  },
  {
    id: "w7-27", type: "R", topic: "Flash Crowd / Slashdotted",
    q: "เว็บไซต์ขนาดเล็กมีผู้เข้าชมจำนวนมหาศาลอย่างกะทันหัน เพราะถูกพูดถึงหรือแชร์ลิงก์บนเว็บไซต์ยอดนิยม ปรากฏการณ์นี้เรียกว่าอะไร",
    c: [
      "Slashdotted",
      "Smurf Attack",
      "Botnet Recruitment",
      "IP Spoofing"
    ],
    a: 0,
    why: "Slashdotted คือเว็บไซต์มีผู้เข้าชมจำนวนมากจากการถูกพูดถึง/เผยแพร่ผ่านเว็บไซต์ยอดนิยม เป็นตัวอย่างที่บทเรียนใช้อธิบายว่า Traffic เยอะไม่ได้แปลว่าเป็น DDoS เสมอไป",
    w: [
      null,
      "Smurf Attack ไม่ได้อยู่ในบทเรียนนี้ และเป็นการโจมตี ไม่ใช่ผู้ใช้จริงเข้าชม",
      "การรวบรวมเครื่องเข้า Botnet เป็นขั้นเตรียมการโจมตี ไม่ใช่ผู้ใช้จริงจำนวนมาก",
      "IP Spoofing คือการปลอม Source IP"
    ]
  }
]);
