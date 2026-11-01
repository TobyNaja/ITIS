// Week 14 — VPN: IPsec VPN และ SSL VPN
QUIZ.addQuestions("w14", [
  {
    id: "w14-01", type: "R", topic: "IPsec: ภาพรวม",
    q: "ข้อใดอธิบาย IPsec ได้ถูกต้อง",
    c: [
      "Protocol เดียวที่ทำงานที่ Transport Layer สำหรับเข้ารหัส Web Traffic",
      "Framework ของมาตรฐานหลายส่วนสำหรับปกป้อง IP Traffic ที่ Layer 3",
      "Application ที่ใช้เข้ารหัสไฟล์บนดิสก์ของเครื่องผู้ใช้แต่ละเครื่อง",
      "มาตรฐานความปลอดภัยของ Wireless LAN ที่ทำงานที่ Layer 2"
    ],
    a: 1,
    why: "IPsec ไม่ใช่ Protocol เดียว แต่เป็น Framework (AH, ESP, IKE ฯลฯ) ที่ปกป้องการสื่อสารบน IP Network ที่ Network Layer (Layer 3)",
    w: [
      "IPsec ไม่ใช่ Protocol เดียวและทำงานที่ Layer 3 ส่วน SSL/TLS ทำงานระดับ Transport",
      null,
      "IPsec ปกป้อง Traffic บนเครือข่าย ไม่ได้เข้ารหัสไฟล์บนดิสก์",
      "IPsec ไม่ใช่มาตรฐาน Wireless และไม่ได้ทำงานที่ Layer 2"
    ]
  },
  {
    id: "w14-02", type: "R", topic: "IPsec: AH vs ESP",
    q: "Protocol ใดใน IPsec ให้ Integrity และ Data Origin Authentication แต่ไม่เข้ารหัสข้อมูล",
    c: [
      "ESP (Encapsulating Security Payload)",
      "IKE (Internet Key Exchange)",
      "AH (Authentication Header)",
      "TLS (Transport Layer Security)"
    ],
    a: 2,
    why: "AH ให้ Integrity และ Data Origin Authentication แต่ไม่เข้ารหัส — จุดที่ข้อสอบชอบถาม",
    w: [
      "ESP รองรับการเข้ารหัส และเป็นกลไกหลักของ IPsec VPN ส่วนใหญ่",
      "IKE ใช้เจรจา ยืนยันตัวตน และจัดการ Key/SA ไม่ได้ปกป้อง Packet ข้อมูลเอง",
      null,
      "TLS ไม่ใช่ Protocol ของ IPsec"
    ]
  },
  {
    id: "w14-03", type: "U", topic: "IPsec: IKE, SA, ESP",
    q: "ข้อใดอธิบายบทบาทของ IKE, SA และ ESP ได้ถูกต้อง",
    c: [
      "IKE เข้ารหัสทุก Packet, SA คือชื่ออัลกอริทึม AES, ESP คือการแลกเปลี่ยน Key",
      "IKE คือ Certificate ของ Peer, SA คือ Firewall Rule, ESP คือ Routing Table ของ Gateway",
      "IKE เจรจา/จัดการ Key และ SA, SA คือชุดกติกาที่ตกลงกัน, ESP ปกป้อง Traffic จริง",
      "IKE และ ESP ทำหน้าที่เดียวกัน ส่วน SA ใช้เฉพาะกับ SSL VPN เท่านั้น"
    ],
    a: 2,
    why: "IKE = ผู้เจรจาและจัดเตรียมกติกา, SA = ชุดค่าความปลอดภัย (Algorithm, Key, พารามิเตอร์) ที่ตกลงกัน, ESP/AH = กลไกที่ปกป้อง Packet",
    w: [
      "IKE ไม่ได้เข้ารหัสข้อมูล Application ทุก Packet และ SA ไม่ใช่ชื่ออัลกอริทึม",
      "ไม่ตรงกับความหมายของทั้งสามคำ",
      null,
      "IKE กับ ESP ทำคนละหน้าที่ และ SA เป็นแนวคิดของ IPsec"
    ]
  },
  {
    id: "w14-04", type: "U", topic: "IPsec: Anti-Replay",
    q: "ผู้โจมตีดักจับ Packet คำสั่งที่ถูกเข้ารหัสไว้ แล้วนำกลับมาส่งซ้ำภายหลังโดยไม่ได้แก้ไขเนื้อหา บริการใดของ IPsec ป้องกันการโจมตีนี้ และอาศัยกลไกใด",
    c: [
      "Confidentiality — อาศัยการเข้ารหัสด้วย AES",
      "Anti-Replay — อาศัย Sequence Number และหน้าต่างตรวจสอบ Packet",
      "Peer Authentication — อาศัย PSK",
      "Traffic Analysis Protection — อาศัยการซ่อนขนาดและจังหวะของ Packet"
    ],
    a: 1,
    why: "Anti-Replay ตรวจจับ Packet เดิมที่ถูกนำกลับมาส่งซ้ำ โดยอาศัย Sequence Number และ Window",
    w: [
      "การเข้ารหัสทำให้อ่านไม่ได้ แต่ Packet ที่ถูกส่งซ้ำก็ยังเป็น Ciphertext ที่ถูกต้อง",
      null,
      "Peer Authentication ยืนยันตัวตนของคู่สื่อสาร ไม่ได้ตรวจ Packet ซ้ำ",
      "Traffic Analysis เกี่ยวกับการวิเคราะห์รูปแบบการสื่อสาร ไม่ใช่การส่งซ้ำ"
    ]
  },
  {
    id: "w14-05", type: "U", topic: "IPsec: Perfect Forward Secrecy (PFS)",
    q: "Session 1 ใช้ Key ชุด A และ Session 2 ใช้ Key ชุด B ต่อมา Key ชุด B รั่วไหล หากเปิดใช้ PFS อย่างเหมาะสม ผลที่คาดหวังคือข้อใด",
    c: [
      "ผู้โจมตีถอดรหัสได้ทั้ง Session 1 และ 2",
      "ผู้โจมตีถอดรหัสไม่ได้ทั้งสอง Session",
      "PFS ทำให้ Key ชุด B ไม่สามารถรั่วไหลออกไปได้ตั้งแต่แรก",
      "การรั่วของ Key ชุด B ไม่ควรทำให้ถอดรหัส Session 1 ได้ทันที"
    ],
    a: 3,
    why: "PFS ทำให้ Session Key แยกจากกัน (มักใช้ Diffie–Hellman สร้าง Key Material ใหม่) การรั่วของ Key บางชุดจึงไม่ทำให้ถอดรหัสข้อมูลเก่าได้โดยอัตโนมัติ",
    w: [
      "นี่คือสิ่งที่ PFS พยายามป้องกัน",
      "Session ที่ใช้ Key ชุด B ที่รั่วยังเสี่ยงต่อการถูกถอดรหัส",
      "PFS ไม่ได้ป้องกันการรั่วของ Key แต่จำกัดผลกระทบ",
      null
    ]
  },
  {
    id: "w14-06", type: "U", topic: "IPsec: Traffic Analysis",
    q: "แม้ VPN จะเข้ารหัสข้อมูลแล้ว ผู้โจมตียังอาจได้ข้อมูลใดจากการวิเคราะห์ Traffic",
    c: [
      "เนื้อหาของข้อความในรูป Plaintext ทั้งหมดที่ส่งผ่าน IPsec Tunnel",
      "Pre-Shared Key ที่ทั้งสองฝั่งใช้ยืนยันตัวตนกัน",
      "รูปแบบการสื่อสาร เช่น ความถี่ ขนาด Packet และช่วงเวลาที่ส่ง",
      "Private Key ของ Router ที่ใช้ลงลายเซ็นดิจิทัล"
    ],
    a: 2,
    why: "Encryption ป้องกันการอ่านเนื้อหา แต่ไม่ได้ซ่อนรูปแบบ Traffic ทั้งหมดเสมอไป จึงมีหัวข้อ Traffic Analysis Protection",
    w: [
      "เนื้อหาถูกเข้ารหัสจึงอ่านไม่ได้หากไม่มี Key",
      "PSK ไม่ได้ถูกส่งออกไปตรง ๆ ระหว่างการยืนยันตัวตน",
      null,
      "Private Key ถูกเก็บเป็นความลับ ไม่ได้อยู่ใน Traffic"
    ]
  },
  {
    id: "w14-07", type: "A", topic: "IPsec: Mobility",
    q: "พนักงานใช้ VPN บนโทรศัพท์ผ่าน Wi-Fi แล้วเดินออกนอกตึกจนเปลี่ยนไปใช้ Mobile Data ทำให้ Outer IP เปลี่ยน หากระบบรองรับ Mobility (เช่น IKEv2 MOBIKE) จะเกิดอะไรขึ้น",
    c: [
      "VPN ปรับการเชื่อมต่อให้ทำงานต่อได้โดยไม่ต้องสร้างใหม่ทั้งหมด และ Inner IP อาจคงเดิม",
      "Inner IP และ Outer IP จะเปลี่ยนพร้อมกันเสมอ และทุก Application ต้องเชื่อมต่อใหม่ทั้งหมด",
      "VPN ต้องหยุดและ Login ใหม่ทุกครั้งเพื่อความปลอดภัย",
      "โทรศัพท์จะใช้ Outer IP เดิมต่อไปได้แม้เปลี่ยนเครือข่าย"
    ],
    a: 0,
    why: "Mobility คือการรักษา VPN Session ขณะเปลี่ยนเครือข่าย Outer IP (ใช้ส่งผ่านเครือข่ายภายนอก) เปลี่ยนได้ ส่วน Inner IP (ใช้ใน VPN) อาจคงเดิม Application จึงอาจไม่รับรู้",
    w: [
      null,
      "Inner IP สามารถคงเดิมได้ เป็นจุดสำคัญของ Mobility",
      "ถ้ารองรับ Mobility ก็ไม่จำเป็นต้องสร้าง VPN ใหม่ทั้งหมด",
      "Outer IP ขึ้นกับเครือข่ายที่ใช้ จึงต้องเปลี่ยนเมื่อเปลี่ยนเครือข่าย"
    ]
  },
  {
    id: "w14-08", type: "U", topic: "Cryptographic Services: HMAC / AEAD",
    q: "ข้อใดถูกต้องเกี่ยวกับ HMAC และ AES-GCM",
    c: [
      "HMAC เข้ารหัสข้อความให้เป็นความลับ ส่วน AES-GCM ใช้ตรวจสอบได้เฉพาะ Integrity เท่านั้น",
      "ต้องใช้ HMAC แยกเสมอ แม้จะใช้ AES-GCM อยู่แล้ว เพื่อให้มี Integrity",
      "HMAC และ AES-GCM ใช้สร้าง Shared Secret ระหว่าง Router สองฝั่ง",
      "HMAC ตรวจ Integrity โดยไม่เข้ารหัส ส่วน AES-GCM เป็น AEAD ที่ให้ทั้งสองอย่าง"
    ],
    a: 3,
    why: "HMAC ใช้ Secret Key + Hash ตรวจ Integrity/ยืนยันแหล่งที่มา แต่ไม่เข้ารหัส ส่วน AES-GCM เป็น AEAD รวม Confidentiality และ Integrity จึงไม่จำเป็นต้องเพิ่ม HMAC แยกเสมอไป",
    w: [
      "สลับหน้าที่ — HMAC ไม่ได้เข้ารหัส และ AES-GCM ให้ทั้งการเข้ารหัสและ Integrity",
      "บทเรียนระบุว่าเมื่อใช้ AES-GCM แล้วไม่จำเป็นต้องเพิ่ม HMAC แยกเสมอไป",
      "การสร้าง Shared Secret เป็นหน้าที่ของ DH/ECDH",
      null
    ]
  },
  {
    id: "w14-09", type: "U", topic: "Key Establishment & Peer Authentication",
    q: "เหตุใดการใช้ Diffie–Hellman เพียงอย่างเดียวจึงยังไม่ปลอดภัยพอสำหรับ IPsec VPN",
    c: [
      "เพราะ DH ต้องส่ง Secret ของแต่ละฝ่ายออกไปผ่าน Internet ตรง ๆ",
      "เพราะ DH ไม่ได้ยืนยันตัวตนของคู่สื่อสาร จึงเสี่ยงต่อ Man-in-the-Middle",
      "เพราะ DH ใช้งานได้เฉพาะกับ AH ซึ่งไม่เข้ารหัสข้อมูล",
      "เพราะ DH ทำให้ Packet มีขนาดใหญ่เกินกว่า MTU จนส่งผ่าน Internet ไม่ได้"
    ],
    a: 1,
    why: "DH ช่วยให้สองฝ่ายสร้าง Shared Secret ร่วมกันได้ แต่ไม่รู้ว่ากำลังสร้างกับใคร ผู้โจมตีตรงกลางอาจสร้าง Key กับแต่ละฝั่งแยกกัน จึงต้องมี Peer Authentication (Certificate/PSK)",
    w: [
      "DH ไม่ได้ส่ง Secret ออกไปโดยตรง แลกเฉพาะข้อมูลที่เปิดเผยได้",
      null,
      "DH ไม่ได้ผูกกับ AH โดยเฉพาะ",
      "บทเรียนไม่ได้กล่าวถึงปัญหาขนาด Packet"
    ]
  },
  {
    id: "w14-10", type: "A", topic: "Peer Authentication: PSK vs Certificate",
    q: "บริษัทมี Router สาขา 200 ตัวที่ใช้ PSK ค่าเดียวกันทั้งหมด วันหนึ่ง Router สาขาหนึ่งถูกขโมย ข้อใดประเมินความเสี่ยงและแนวทางได้ถูกต้องที่สุด",
    c: [
      "ไม่มีความเสี่ยง เพราะ PSK ไม่เคยถูกส่งออกไปตรง ๆ ระหว่างการเจรจา IKE ของ Router ทุกตัว",
      "เปลี่ยนอัลกอริทึมเข้ารหัสจาก AES เป็น 3DES ทุก Router ก็เพียงพอ",
      "ผู้ได้ PSK อาจปลอมเป็น Peer และเปลี่ยน PSK ทั้งหมดยาก ระบบใหญ่ควรใช้ Certificate/PKI",
      "ปิด Anti-Replay เพื่อให้ Router ทดแทนเชื่อมต่อเข้ามาได้เร็วขึ้น"
    ],
    a: 2,
    why: "PSK ใช้ง่ายแต่เหมาะกับระบบเล็ก เมื่อมีอุปกรณ์มาก การจัดการ/เปลี่ยน Secret ยุ่งยาก และหาก PSK หลุดก็เสี่ยงต่อการปลอมตัว ระบบใหญ่จึงมักใช้ Certificate และ PKI",
    w: [
      "PSK ไม่ได้ถูกส่งตรง ๆ แต่ผู้ที่ได้อุปกรณ์ไปอาจได้ค่า PSK ที่ตั้งไว้ในเครื่อง",
      "3DES เป็นอัลกอริทึมเก่าที่ไม่ควรเลือก และไม่เกี่ยวกับปัญหาการยืนยันตัวตน",
      null,
      "Anti-Replay ไม่เกี่ยวกับปัญหา PSK รั่ว และการปิดลดความปลอดภัย"
    ]
  },
  {
    id: "w14-11", type: "R", topic: "Key Establishment: DH vs ECDH",
    q: "ข้อใดแยก Classic DH กับ ECDH ได้ถูกต้อง",
    c: [
      "ECDH ใช้ Elliptic Curve จึงใช้พารามิเตอร์เล็กกว่าที่ความปลอดภัยเทียบเท่า",
      "Classic DH ใช้ยืนยันตัวตนของ Peer ส่วน ECDH ใช้เข้ารหัสข้อมูลจริงแทน AES",
      "ECDH ส่ง Private Secret ออกไปตรง ๆ ส่วน Classic DH ไม่ส่งเลย",
      "Classic DH ใช้ได้เฉพาะ SSL VPN ส่วน ECDH ใช้ได้เฉพาะ IPsec"
    ],
    a: 0,
    why: "ทั้งสองมีเป้าหมายเดียวกันคือสร้าง Shared Secret โดย Classic DH ใช้ Finite Field ส่วน ECDH ใช้ Elliptic Curve ซึ่งใช้พารามิเตอร์เล็กกว่าที่ระดับความปลอดภัยเทียบเท่า",
    w: [
      null,
      "ทั้งสองใช้สร้าง Shared Secret ไม่ได้ใช้ยืนยันตัวตนหรือเข้ารหัสข้อมูลโดยตรง",
      "ทั้งสองไม่ส่ง Private Secret ออกไปตรง ๆ",
      "บทเรียนไม่ได้จำกัดการใช้งานเช่นนี้"
    ]
  },
  {
    id: "w14-12", type: "A", topic: "Cryptographic Services: การเลือกอัลกอริทึม",
    q: "ทีมกำลังออกแบบ IPsec VPN ใหม่ ตัวเลือกใดเหมาะสมที่สุดตามแนวทางในบทเรียน",
    c: [
      "3DES สำหรับเข้ารหัส + HMAC-SHA-1 สำหรับตรวจ Integrity",
      "AES-GCM (AEAD) สำหรับทั้งเข้ารหัสและตรวจ Integrity",
      "ไม่เข้ารหัส ใช้ AH อย่างเดียวเพื่อความเร็ว",
      "ใช้ DH อย่างเดียวโดยไม่ต้องยืนยันตัวตนของ Peer"
    ],
    a: 1,
    why: "AES-GCM เป็น AEAD ที่ให้ทั้ง Confidentiality และ Integrity และเป็นตัวเลือกที่มักพบในปัจจุบัน ขณะที่ 3DES และ HMAC-SHA-1 เป็นตัวเลือกเก่าที่ไม่ควรเลือกสำหรับระบบใหม่",
    w: [
      "บทเรียนระบุว่า 3DES และ HMAC-SHA-1 ไม่ควรเลือกสำหรับระบบใหม่",
      null,
      "AH ไม่เข้ารหัส ข้อมูลจึงถูกอ่านได้ระหว่างทาง",
      "DH อย่างเดียวเสี่ยงต่อ MITM ต้องมี Peer Authentication"
    ]
  },
  {
    id: "w14-13", type: "A", topic: "IPsec Architectures",
    q: "บริษัทต้องการเชื่อม LAN สำนักงานใหญ่กับ LAN สาขาผ่าน Internet โดยเครื่อง PC ในทั้งสองสำนักงานไม่ต้องติดตั้งซอฟต์แวร์ VPN ใด ๆ ควรใช้ Architecture แบบใด",
    c: [
      "Host-to-Host (End-to-End)",
      "Remote Access (Client-to-Gateway)",
      "Gateway-to-Gateway (Site-to-Site)",
      "Mesh (Host ↔ Host หลายคู่)"
    ],
    a: 2,
    why: "Gateway-to-Gateway ให้ Gateway ของแต่ละฝั่งสร้าง IPsec Tunnel และ Encrypt/Decrypt แทนเครื่องภายในทั้งหมด Client จึงไม่ต้องรู้เรื่อง VPN",
    w: [
      "Host-to-Host ให้ตัว Host สร้าง IPsec เอง ซึ่งต้องตั้งค่าที่ทุกเครื่อง",
      "Remote Access ใช้เชื่อมผู้ใช้รายบุคคลเข้า Corporate Network ไม่ใช่ LAN ↔ LAN",
      null,
      "Mesh เป็นหลาย Host สร้าง IPsec ระหว่างกันโดยตรง"
    ]
  },
  {
    id: "w14-14", type: "A", topic: "IPsec Architectures",
    q: "บริษัทต้องการให้ Server A ส่งข้อมูลถึง Server B แบบเข้ารหัสตลอดเส้นทาง แม้ระหว่างทางจะผ่าน Switch และ Router ภายในที่ไม่ไว้วางใจ ควรเลือก Architecture ใด",
    c: [
      "Gateway-to-Gateway เพราะ Gateway เข้ารหัสแทนทุกเครื่อง",
      "Remote Access เพราะ Server B เป็น VPN Gateway",
      "Leased Line เพราะเป็นวงจรเฉพาะ",
      "Host-to-Host เพราะ Host เข้ารหัสเองแบบ End-to-End"
    ],
    a: 3,
    why: "Host-to-Host ให้ Server เป็นผู้ Encrypt/Decrypt เอง ข้อมูลจึงถูกเข้ารหัสตั้งแต่ต้นทางถึงปลายทาง แม้ผ่าน Network ภายใน สอดคล้องกับ Zero Trust",
    w: [
      "ใน Gateway-to-Gateway Traffic ภายใน LAN ก่อนถึง Gateway เป็น Plaintext",
      "Remote Access เน้นให้อุปกรณ์ภายนอกเข้าถึง Resource ผ่าน VPN Gateway",
      "Leased Line เป็นทางเลือกระดับ Data Link และไม่ได้เข้ารหัสโดยตัวมันเอง",
      null
    ]
  },
  {
    id: "w14-15", type: "U", topic: "IPsec Architectures",
    q: "Remote Access กับ Host-to-Host อาจใช้ Host-based IPsec เหมือนกัน แต่ต่างกันที่จุดประสงค์อย่างไร",
    c: [
      "Remote Access ไม่มีการเข้ารหัสข้อมูลเลย ส่วน Host-to-Host เข้ารหัสข้อมูลทุก Packet ตลอดเส้นทางจากต้นทางถึงปลายทาง",
      "Remote Access ให้อุปกรณ์ภายนอกเข้าใช้ Resource ผ่าน VPN Gateway ส่วน Host-to-Host คือ Session ระหว่าง Endpoint สองตัว",
      "Host-to-Host ใช้เชื่อม LAN สองแห่งเข้าด้วยกัน ส่วน Remote Access ใช้เฉพาะใน Datacenter",
      "ทั้งสองเหมือนกันทุกประการ ต่างกันเพียงชื่อเรียกตามผู้ผลิตอุปกรณ์ VPN"
    ],
    a: 1,
    why: "วิธีแยกคือถามว่า \"ใครเป็น Endpoint ของ Tunnel\": Remote Host ↔ Gateway เพื่อเข้า Network บริษัท = Remote Access; Host ↔ Host = Host-to-Host",
    w: [
      "ทั้งสองแบบมีการเข้ารหัส",
      null,
      "การเชื่อม LAN สองแห่งคือ Gateway-to-Gateway และ Datacenter หลายเครื่องมักเป็น Mesh",
      "บทเรียนเตือนว่าอย่าสับสนสองแบบนี้"
    ]
  },
  {
    id: "w14-16", type: "A", topic: "Mesh Encryption",
    q: "Datacenter มี Server 100 เครื่อง ต้องการให้ทุกคู่สื่อสารกันแบบเข้ารหัสโดยตรง (Mesh) ข้อใดเป็นข้อพิจารณาที่สำคัญที่สุด",
    c: [
      "ต้องให้ Traffic ทั้งหมดวิ่งผ่าน VPN Gateway ตัวกลางเพียงตัวเดียว",
      "Mesh ใช้ไม่ได้กับ Cloud จึงต้องย้าย Server ทั้งหมดกลับมาไว้ที่ On-premise",
      "Mesh ไม่สอดคล้องกับ Zero Trust เพราะเชื่อถือ Network ภายในทั้งหมด",
      "จำนวน Tunnel เพิ่มขึ้นมากตามจำนวน Host จึงควรใช้ระบบจัดการกลาง/Controller"
    ],
    a: 3,
    why: "Mesh เหมาะกับ Datacenter/Cloud และ Zero Trust แต่เมื่อเครื่องเยอะ Tunnel เยอะจนจัดการยาก จึงต้องมีระบบจัดการกลาง/อัตโนมัติ",
    w: [
      "Mesh ไม่ต้องให้ Traffic ผ่าน Gateway ตัวกลาง แต่ละ Host คุยกันโดยตรง",
      "บทเรียนระบุว่า Mesh เหมาะกับ Datacenter และ Cloud",
      "Mesh สอดคล้องกับ Zero Trust เพราะไม่เชื่อว่า Network ภายในปลอดภัย",
      null
    ]
  },
  {
    id: "w14-17", type: "A", topic: "Case Study A: Tunnel Mode",
    q: "Workstation 192.0.0.10 (Remote Office) ส่ง Packet ไป Server 192.0.2.10 (Main Office) ผ่าน Gateway-to-Gateway VPN โดย Gateway ทั้งสองมี IP 203.0.113.1 และ 198.51.100.1 Router บน Internet จะเห็น IP ต้นทาง/ปลายทางใน Outer Header เป็นอะไร",
    c: [
      "192.0.0.10 → 192.0.2.10",
      "203.0.113.1 → 198.51.100.1",
      "192.0.0.10 → 198.51.100.1",
      "203.0.113.1 → 192.0.2.10"
    ],
    a: 1,
    why: "ใน Tunnel Mode Gateway A นำ Original IP Packet ทั้งก้อนไปเข้ารหัสแล้วสร้าง Outer IP Header ใหม่ระหว่าง Tunnel Endpoints (Gateway A → Gateway B) Router บน Internet จึงเห็นแค่ IP ของ Gateway",
    w: [
      "IP ภายในอยู่ใน Original Packet ที่ถูกเข้ารหัส Router บน Internet จึงมองไม่เห็น",
      null,
      "ต้นทางใน Outer Header ต้องเป็น Gateway A (203.0.113.1) ไม่ใช่ IP ของ Workstation ภายใน",
      "ปลายทางใน Outer Header ต้องเป็น Gateway B (198.51.100.1) ไม่ใช่ IP ของ Server ภายใน"
    ]
  },
  {
    id: "w14-18", type: "U", topic: "Case Study B: Remote Access & Corporate WiFi",
    q: "ใน Case Study B ทำไมผู้ใช้ที่เชื่อม Corporate WiFi ภายในบริษัทจึงยังต้องสร้าง IPsec ไปยัง VPN Gateway และ Traffic หลัง VPN Gateway เป็นอย่างไร",
    c: [
      "Wireless อาจถูกดัก จึงเข้ารหัสจาก Client ถึง VPN Gateway และหลัง Gateway เป็น Plaintext",
      "เพราะ WiFi ไม่รองรับ TCP/IP และหลัง Gateway ยังเข้ารหัสต่อจนถึง Server",
      "เพราะ VPN Gateway ทำหน้าที่แทน Access Point ของ WiFi และหลัง Gateway จะไม่มี Traffic ใดผ่าน",
      "เพราะต้องให้ Internet Router ถอดรหัส Traffic แทน Server ภายใน"
    ],
    a: 0,
    why: "ไม่ควรคิดว่าอยู่ในบริษัทแล้ว Network ปลอดภัย Wireless เสี่ยงต่อการถูกดัก IPsec จึงปกป้องช่วง Client → VPN Gateway ซึ่งเป็นจุด Terminate Tunnel หลังจากนั้นเป็น Plaintext ตามสไลด์",
    w: [
      null,
      "WiFi รองรับ TCP/IP และในสถาปัตยกรรมนี้หลัง Gateway เป็น Plaintext",
      "VPN Gateway ไม่ได้แทน Access Point",
      "Router บน Internet ไม่ได้เป็นส่วนหนึ่งของ Tunnel"
    ]
  },
  {
    id: "w14-19", type: "A", topic: "Case Study C: Cloud-Based Virtual Network",
    q: "ในการเชื่อม On-Premises กับ Cloud Network ผ่าน IPsec ฝั่ง Cloud มี \"Virtual Router + NAT\" และ \"VM VPN\" ส่วนประกอบใดเป็น Tunnel Endpoint ที่รับและถอดรหัส IPsec ฝั่ง Cloud",
    c: [
      "Virtual Router + NAT",
      "VM1 ที่เป็นปลายทางของข้อมูล",
      "VM VPN",
      "Internet Router ของผู้ให้บริการ"
    ],
    a: 2,
    why: "VM VPN ทำหน้าที่รับ/ถอดรหัส IPsec ส่วน Virtual Router + NAT ทำ Routing/NAT ภายใน Cloud — \"Virtual Router ≠ VPN Server\" และรูปแบบนี้เรียกว่า Hybrid Cloud Connectivity",
    w: [
      "Virtual Router + NAT จัดการ Routing/NAT ไม่ใช่ตัวทำ IPsec Tunnel ในรูปนี้",
      "VM1 รับข้อมูลหลังถูกถอดรหัสแล้ว",
      null,
      "Router บน Internet ทำหน้าที่ส่งต่อเท่านั้น ไม่ได้เป็นส่วนของ Tunnel"
    ]
  },
  {
    id: "w14-20", type: "U", topic: "Planning: Conceptual vs Logical Design",
    q: "ข้อใดแยก Conceptual Design กับ Logical Design ได้ถูกต้อง",
    c: [
      "Conceptual = พิมพ์คำสั่ง Config จริงบนอุปกรณ์ทุกตัว ส่วน Logical = วัดผลหลังเปิดใช้งานจริง",
      "Conceptual = ทดสอบ Prototype ในห้อง Lab ส่วน Logical = ระบุปัญหาขององค์กร",
      "ทั้งสองเป็นขั้นเดียวกัน ต่างกันเพียงว่าใครเป็นผู้รับผิดชอบเอกสาร",
      "Conceptual = เลือกแนวทาง (จะใช้อะไร) ส่วน Logical = ออกแบบว่าจะทำงานใน Network อย่างไร"
    ],
    a: 3,
    why: "Flow: Identify Needs/Conceptual (จะใช้อะไร) → Logical (ออกแบบยังไง) → Prototype (ลงมือทำ) → Analysis (ผลเป็นอย่างไร)",
    w: [
      "การ Config จริงคือ Prototype และการวัดผลคือ Analysis",
      "การทดสอบ Prototype และการระบุปัญหาเป็นขั้นอื่น",
      "บทเรียนแยกทั้งสองขั้นชัดเจน",
      null
    ]
  },
  {
    id: "w14-21", type: "A", topic: "Planning: ทางเลือกตาม Layer",
    q: "ในขั้น Identifying Needs บริษัทต้องการปกป้อง Traffic ทุกประเภทระหว่างสองสำนักงาน โดยใช้ Internet ที่มีอยู่แล้วเป็นเส้นทางและไม่ต้องแก้ไข Application ใด ๆ ทางเลือกใดตรงที่สุด",
    c: [
      "Network Layer VPN เช่น IPsec",
      "Leased Line ระดับ Data Link",
      "Web-Based Applications ผ่าน HTTPS",
      "Application Modification"
    ],
    a: 0,
    why: "Network Layer VPN (IPsec) เข้ารหัส Traffic ระดับ Network และใช้ Internet เดิมเป็น Transport ได้ ครอบคลุม Traffic หลายประเภทโดยไม่ต้องแก้ Application",
    w: [
      null,
      "Leased Line เป็นวงจรเช่าโดยตรง ไม่ได้ใช้ Internet ที่มีอยู่ และมีค่าใช้จ่ายสูง",
      "ป้องกันเฉพาะ Application ที่ใช้ Web ไม่ได้ป้องกัน Traffic ทุกประเภท",
      "ต้องแก้ไขตัว Application ซึ่งขัดกับความต้องการ"
    ]
  },
  {
    id: "w14-22", type: "U", topic: "SSL VPN: Portal vs Tunnel",
    q: "ข้อใดอธิบายความแตกต่างระหว่าง SSL Portal VPN กับ SSL Tunnel VPN ได้ถูกต้องที่สุด",
    c: [
      "Tunnel VPN เข้ารหัสแข็งแรงกว่า Portal VPN เสมอ จึงเหมาะกับข้อมูลลับมากกว่า",
      "Portal VPN ใช้ IPsec เป็นหลัก ส่วน Tunnel VPN ใช้ TLS เป็นหลักในการเข้ารหัส",
      "Portal ใช้ผ่านหน้า Web เข้าได้เฉพาะบริการที่รองรับ ส่วน Tunnel เข้าถึง Network Services ได้กว้างกว่า",
      "Portal ต้องติดตั้ง VPN Client เต็มรูปแบบบนเครื่อง ส่วน Tunnel ใช้งานผ่าน Web Browser ได้เพียงอย่างเดียว"
    ],
    a: 2,
    why: "ความต่างอยู่ที่รูปแบบและขอบเขตการเข้าถึง Resource ทั้งสองใช้ TLS ปกป้องการสื่อสาร Tunnel ไม่ได้เข้ารหัสแข็งแรงกว่าโดยอัตโนมัติ",
    w: [
      "บทเรียนย้ำว่าความต่างไม่ได้อยู่ที่ความแข็งแรงของการเข้ารหัส",
      "ทั้งสองแบบเป็น SSL VPN ที่ใช้ SSL/TLS",
      null,
      "กลับด้าน — Portal มักไม่ต้องใช้ Client เต็มรูปแบบ ส่วน Tunnel อาจต้องใช้ VPN Client"
    ]
  },
  {
    id: "w14-23", type: "A", topic: "SSL VPN: Portal / Clientless",
    q: "ที่ปรึกษาภายนอกต้องใช้ Web Mail และระบบเว็บภายในของบริษัทจากเครื่องที่ติดตั้งซอฟต์แวร์เพิ่มไม่ได้ ควรเลือกแนวทางใด",
    c: [
      "SSL Portal VPN แบบ Clientless ใช้บริการผ่าน Browser",
      "SSL Tunnel VPN พร้อมติดตั้ง VPN Client แบบเต็มรูปแบบ",
      "IPsec Host-to-Host ตั้งค่าบนเครื่องของที่ปรึกษา",
      "IPsec Mesh ระหว่างเครื่องที่ปรึกษากับทุก Server"
    ],
    a: 0,
    why: "Clientless/Portal VPN ใช้ผ่าน Browser ไม่ต้องติดตั้ง Client เต็มรูปแบบ เหมาะกับเครื่องชั่วคราวหรือเครื่องที่ติดตั้ง Software ไม่ได้ และความต้องการเป็นบริการแบบ Web",
    w: [
      null,
      "ต้องติดตั้ง Client ซึ่งทำไม่ได้บนเครื่องนี้",
      "ต้องตั้งค่า IPsec บนเครื่องของที่ปรึกษา",
      "ซับซ้อนเกินความจำเป็นและต้องตั้งค่าบนเครื่อง"
    ]
  },
  {
    id: "w14-24", type: "A", topic: "SSL VPN: Tunnel / Network Extension",
    q: "วิศวกรทำงานจากบ้านต้องเข้าถึง File Server, Application ภายในที่ใช้ Protocol เฉพาะ และระบบอื่นที่ไม่ใช่ Web ข้อใดเหมาะสมที่สุด",
    c: [
      "SSL Portal VPN ที่ปรับแต่งหน้า Portal ให้มีลิงก์ครบทุกระบบ",
      "SSL Tunnel VPN ที่ทำ Network Extension ตามสิทธิ์ที่กำหนด",
      "Clientless Operation ผ่าน Browser โดยไม่ติดตั้งอะไรเพิ่ม",
      "ใช้ HTTPS ของแต่ละระบบโดยตรงโดยไม่ต้องมี VPN"
    ],
    a: 1,
    why: "Tunnel VPN/Network Extension ให้ Remote User เข้าถึง Network Services ได้หลากหลายกว่า Portal (ตาม Policy) เหมาะกับ Application ที่ไม่ใช่ Web",
    w: [
      "Portal Customization ไม่ได้เพิ่มความสามารถเข้าถึง Application ที่ไม่ใช่ Web",
      null,
      "Clientless ความสามารถจำกัดกว่า อาจใช้ Application ที่ต้องการ Network Tunnel ไม่ได้",
      "HTTPS ปกป้องเฉพาะ Web Traffic ไม่ช่วยให้เข้าถึง File Server/Protocol เฉพาะ"
    ]
  },
  {
    id: "w14-25", type: "U", topic: "SSL VPN Functions",
    q: "SSL VPN Gateway รับคำขอจากผู้ใช้ผ่าน Web Interface แล้วแปลงให้เป็นรูปแบบ/Protocol ที่ Application ภายในเข้าใจได้ ฟังก์ชันนี้เรียกว่าอะไร",
    c: [
      "Proxying",
      "Network Extension",
      "Application Translation",
      "Portal Customization"
    ],
    a: 2,
    why: "Application Translation = Gateway แปลง Protocol/รูปแบบการสื่อสาร ต่างจาก Proxying ที่รับแล้วส่งต่อในฐานะตัวกลาง",
    w: [
      "Proxying คือ Gateway เป็นตัวกลางติดต่อ Server แทน Client โดยไม่ได้เน้นการแปลง Protocol",
      "Network Extension คือขยายการเข้าถึง Network ภายในให้ Remote User",
      null,
      "Portal Customization คือการปรับหน้าตา Portal"
    ]
  },
  {
    id: "w14-26", type: "U", topic: "SSL VPN Features: HA vs Scalability",
    q: "ข้อใดแยก High Availability กับ Scalability ของ SSL VPN ได้ถูกต้อง",
    c: [
      "HA เน้นรองรับจำนวนผู้ใช้ที่เพิ่มขึ้น ส่วน Scalability เน้นความต่อเนื่องเมื่อเครื่องเสีย",
      "HA เน้นให้บริการต่อได้เมื่อเครื่องขัดข้อง ส่วน Scalability เน้นขยายรับโหลดที่เพิ่มขึ้น",
      "HA และ Scalability หมายถึงสิ่งเดียวกัน คือการเพิ่มจำนวน Gateway",
      "HA ใช้ได้เฉพาะแบบ Active/Active ส่วน Scalability ใช้ได้เฉพาะแบบ Active/Passive"
    ],
    a: 1,
    why: "HA = เสียแล้วยังให้บริการต่อได้ (Active/Passive หรือ Active/Active) ส่วน Scalability = โหลดเพิ่มแล้วขยายระบบได้ เช่น เพิ่ม Gateway + Load Balancer",
    w: [
      "สลับนิยามกัน",
      null,
      "บทเรียนแยกเป้าหมายของทั้งสองชัดเจน",
      "HA ใช้ได้ทั้ง Active/Passive และ Active/Active และ Scalability ไม่ได้ผูกกับรูปแบบนี้"
    ]
  },
  {
    id: "w14-27", type: "A", topic: "SSL VPN Features: Scalability",
    q: "ผู้ใช้ SSL VPN เพิ่มจาก 500 เป็น 5,000 คน Gateway ไม่ได้เสียแต่ตอบสนองช้าจนใช้งานลำบากในช่วงเช้า แนวทางใดตรงกับปัญหาที่สุด",
    c: [
      "เพิ่ม Gateway และใช้ Load Balancer กระจายโหลด (Scalability)",
      "ปรับแต่ง Logo และสีของ Portal",
      "ตั้ง Gateway สำรองแบบ Active/Passive โดยให้ตัวสำรองรอรับงานเฉย ๆ",
      "ปิด Endpoint Security Check เพื่อลดภาระ"
    ],
    a: 0,
    why: "ปัญหาคือโหลดเพิ่ม ไม่ใช่เครื่องเสีย จึงเป็นเรื่อง Scalability — เพิ่ม Gateway และกระจายโหลดด้วย Load Balancer",
    w: [
      null,
      "Portal Customization ไม่ได้เพิ่มความสามารถรองรับโหลด",
      "Active/Passive เน้นรับช่วงเมื่อเครื่องหลักเสีย ตัวสำรองไม่ได้ช่วยแบ่งโหลด",
      "ลดความปลอดภัยและไม่ใช่แนวทางแก้ปัญหาโหลดตามบทเรียน"
    ]
  },
  {
    id: "w14-28", type: "U", topic: "SSL VPN Security Services",
    q: "พนักงานฝ่ายบัญชี Login SSL VPN สำเร็จ แต่เข้าฐานข้อมูลฝ่ายบุคคลไม่ได้ ข้อใดอธิบายได้ถูกต้อง",
    c: [
      "Authentication ล้มเหลว ผู้ใช้จึงเข้าระบบใดไม่ได้เลย",
      "Encryption ล้มเหลว ผู้ใช้จึงอ่านข้อมูลที่ได้รับไม่ได้",
      "Integrity Protection ตรวจพบว่าข้อมูลถูกแก้ไขระหว่างทางจึงตัดการเชื่อมต่อ",
      "Authentication ผ่านแล้ว แต่ Access Control จำกัดสิทธิ์ตามหน้าที่"
    ],
    a: 3,
    why: "Authentication ตอบว่า \"คุณเป็นใคร\" ส่วน Access Control ตอบว่า \"คุณมีสิทธิ์ทำอะไร\" Login ผ่านไม่ได้แปลว่าเข้าถึงทุกระบบได้",
    w: [
      "Login สำเร็จแล้ว แปลว่า Authentication ผ่าน",
      "ปัญหาไม่ได้อยู่ที่การเข้ารหัส",
      "ไม่มีข้อมูลว่าข้อมูลถูกแก้ไขระหว่างทาง",
      null
    ]
  },
  {
    id: "w14-29", type: "A", topic: "SSL VPN: Endpoint Security",
    q: "การเชื่อมต่อ SSL VPN ใช้ TLS 1.3 และ MFA อย่างถูกต้อง แต่ Laptop ของผู้ใช้ติดมัลแวร์และขาด Security Update ความเสี่ยงคืออะไร และควรใช้มาตรการใด",
    c: [
      "ไม่มีความเสี่ยง เพราะช่องทาง TLS 1.3 และ MFA ปกป้องทุกอย่างแล้ว",
      "Laptop อาจเป็นทางให้มัลแวร์เข้าเครือข่าย ควรตรวจสภาพเครื่องด้วย Endpoint Security",
      "ควรเปลี่ยนจาก TLS 1.3 กลับไปใช้ SSL รุ่นเก่า เพื่อให้เข้ากันได้กับเครื่องที่ไม่อัปเดต",
      "ควรปรับแต่ง Portal ให้แสดงคำเตือนเรื่องมัลแวร์แก่ผู้ใช้"
    ],
    a: 1,
    why: "VPN ปกป้องช่องทางสื่อสาร แต่ไม่ได้ทำให้อุปกรณ์ปลายทางปลอดภัยโดยอัตโนมัติ จึงต้องตรวจ Endpoint เช่น OS อัปเดต มี Endpoint Protection และผ่าน Policy",
    w: [
      "TLS ปกป้องข้อมูลระหว่างทาง แต่ไม่แก้ปัญหามัลแวร์บนเครื่อง",
      null,
      "SSL รุ่นเก่าไม่ปลอดภัยและไม่เกี่ยวกับปัญหามัลแวร์บนเครื่อง",
      "การปรับหน้าตาไม่ได้เพิ่มความปลอดภัยโดยตรง"
    ]
  },
  {
    id: "w14-30", type: "R", topic: "SSL Protocol Basics",
    q: "ในการสร้าง Secure Session ของ SSL VPN สิ่งที่ Client กับ Gateway ต้องเจรจา/กำหนดร่วมกันตามบทเรียนคือข้อใด",
    c: [
      "Protocol Version, Cryptography และ Authentication",
      "MAC Address, VLAN ID และ Port Number",
      "Username, Password และ Portal Theme",
      "Routing Table, DNS Server และ NAT Mapping ของทั้งสองฝั่ง"
    ],
    a: 0,
    why: "TLS Negotiation = Version + Cryptography + Authentication ผ่าน TLS Handshake แล้วจึงส่งข้อมูลผ่าน Secure Session",
    w: [
      null,
      "เป็นค่าระดับ Network ไม่ใช่สิ่งที่ TLS Handshake เจรจา",
      "Username/Password เป็นการยืนยันตัวตนผู้ใช้ของ VPN และ Theme ไม่เกี่ยวกับ TLS",
      "เป็นเรื่อง Network Configuration ไม่ใช่การเจรจา TLS"
    ]
  },
  {
    id: "w14-31", type: "A", topic: "SSL Protocol Basics: Certificate",
    q: "ผู้ใช้เห็นคำเตือนว่า Certificate ของ VPN Gateway ไม่ตรงกับชื่อโดเมนและออกโดย CA ที่ไม่รู้จัก แต่กด \"ดำเนินการต่อ\" เพื่อให้ใช้งานได้เร็ว ความเสี่ยงหลักคืออะไร",
    c: [
      "การเชื่อมต่อจะช้าลงเพราะต้องตรวจ Certificate ซ้ำทุกครั้งที่ส่งข้อมูล",
      "หน้า Portal จะแสดงผลผิดเพี้ยนบน Browser บางรุ่น",
      "อาจเชื่อมต่อกับ Server ปลอม (MITM) และส่งข้อมูลสำคัญให้ผู้โจมตี",
      "VPN จะเปลี่ยนไปใช้ IPsec แทน TLS โดยอัตโนมัติ"
    ],
    a: 2,
    why: "Client ต้องตรวจลายเซ็น Certificate ชื่อโดเมน วันหมดอายุ และความน่าเชื่อถือของ CA หากไม่ตรวจอย่างถูกต้องเสี่ยงต่อการเชื่อมต่อกับ Server ปลอม",
    w: [
      "ปัญหาไม่ใช่ความเร็ว แต่เป็นการยืนยันตัวตนของ Server",
      "ไม่ใช่ปัญหาการแสดงผล",
      null,
      "SSL VPN ไม่ได้เปลี่ยนไปใช้ IPsec อัตโนมัติ"
    ]
  },
  {
    id: "w14-32", type: "A", topic: "Design the Architecture: Routing Policy",
    q: "ผู้ใช้ Login SSL VPN สำเร็จ แต่เปิด Application บน Internal Server ไม่ได้ ตรวจสอบแล้ว Request ไปถึง Server แต่ Server ไม่มี Route กลับไปยังเครือข่ายของ VPN Client สาเหตุอยู่ที่หัวข้อใดของการออกแบบ",
    c: [
      "Portal Design — หน้า Login และ Resource ที่ผู้ใช้เห็น",
      "Client Software Selection — รองรับ OS ของผู้ใช้หรือไม่",
      "Hardware Configuration — CPU และ Concurrent Users",
      "Routing Policy — ต้องตรวจเส้นทางทั้งขาไปและขากลับ"
    ],
    a: 3,
    why: "VPN Connected ไม่ได้แปลว่า Application ใช้งานได้ ถ้ามี Route ขาไปแต่ไม่มีขากลับ Response จะไม่ถึงผู้ใช้ ต้องตรวจ Routing ทั้งสองทิศทางร่วมกับ Firewall/DNS",
    w: [
      "Portal Design เกี่ยวกับหน้า Login และ Resource ที่ผู้ใช้เห็น",
      "ผู้ใช้เชื่อมต่อได้แล้ว แปลว่า Client ไม่ใช่ปัญหา",
      "ไม่มีข้อมูลว่า Gateway รับโหลดไม่ไหว",
      null
    ]
  },
  {
    id: "w14-33", type: "R", topic: "SSL VPN Planning and Implementation",
    q: "ข้อใดเรียงลำดับขั้นตอน SSL VPN Planning and Implementation ได้ถูกต้อง",
    c: [
      "Identify Requirements → Design → Deploy → Implement & Test Prototype → Manage",
      "Identify Requirements → Design → Implement & Test Prototype → Deploy → Manage",
      "Design → Identify Requirements → Implement & Test Prototype → Deploy → Manage",
      "Implement & Test Prototype → Identify Requirements → Design → Deploy → Manage"
    ],
    a: 1,
    why: "5 ขั้นตอนคือ Identify Requirements → Design the Solution → Implement and Test a Prototype → Deploy (เริ่มจาก Pilot) → Manage",
    w: [
      "ต้องทดสอบ Prototype ก่อน Deploy ไม่ใช่หลัง Deploy",
      null,
      "ต้องรู้ Requirement ก่อนจึงจะออกแบบได้",
      "Prototype ต้องสร้างจากแบบที่ออกแบบตาม Requirement"
    ]
  },
  {
    id: "w14-34", type: "A", topic: "SSL VPN: Identify Requirements",
    q: "หน่วยงานที่ต้องปฏิบัติตามข้อกำหนดของรัฐบาลสหรัฐฯ กำลังเริ่มโครงการ SSL VPN ประเด็นเรื่องมาตรฐานด้าน Cryptographic Module เช่น FIPS 140-2 ควรถูกพิจารณาในขั้นใดเป็นอันดับแรก",
    c: [
      "Identify Requirements",
      "Deploy the Solution",
      "Manage the Solution",
      "หลังเกิด Incident แล้ว"
    ],
    a: 0,
    why: "ข้อกำหนดด้านมาตรฐาน/กฎระเบียบเป็นส่วนของ Requirement ที่ต้องรู้ตั้งแต่ต้น เพื่อให้เลือกผลิตภัณฑ์และออกแบบได้ถูกต้อง",
    w: [
      null,
      "หากรอถึงขั้น Deploy อาจพบว่าผลิตภัณฑ์ที่เลือกไม่ผ่านข้อกำหนด",
      "Manage เป็นขั้นดูแลหลังติดตั้ง สายเกินไปสำหรับการเลือกมาตรฐาน",
      "ข้อกำหนดต้องพิจารณาล่วงหน้า ไม่ใช่หลังเกิดเหตุ"
    ]
  },
  {
    id: "w14-35", type: "R", topic: "IETF / RFC",
    q: "มาตรฐานของ IPsec และ IKE ที่ IETF จัดทำ ถูกเผยแพร่ในรูปแบบเอกสารใด",
    c: [
      "NIST SP",
      "ISO/IEC",
      "RFC",
      "FIPS"
    ],
    a: 2,
    why: "IETF (Internet Engineering Task Force) เผยแพร่มาตรฐานจำนวนมากเป็นเอกสาร RFC เพื่อให้อุปกรณ์ต่างผู้ผลิตทำงานร่วมกันได้",
    w: [
      "NIST SP เป็นเอกสารของ NIST ไม่ใช่ IETF",
      "ISO/IEC เป็นมาตรฐานขององค์กร ISO",
      null,
      "FIPS เป็นมาตรฐานของรัฐบาลสหรัฐฯ"
    ]
  },
  {
    id: "w14-36", type: "R", topic: "SSL VPN Functions",
    q: "ฟังก์ชันหลัก 3 อย่างของ SSL VPN ตามบทเรียนคือข้อใด",
    c: [
      "Proxying, Application Translation, Network Extension",
      "Encryption, Hashing และ Key Exchange (Diffie–Hellman)",
      "Portal, Tunnel, Mesh",
      "Authentication, Logging, Backup"
    ],
    a: 0,
    why: "SSL VPN Functions = Proxying (ตัวกลาง), Application Translation (แปลงการสื่อสาร), Network Extension (ขยายการเข้าถึง Network)",
    w: [
      null,
      "เป็นกลไก Cryptography ไม่ใช่ Functions ของ SSL VPN ในบทเรียน",
      "Portal/Tunnel เป็น Architecture ของ SSL VPN ส่วน Mesh เป็น Architecture ของ IPsec",
      "เป็นงานบริหาร/ความปลอดภัยทั่วไป ไม่ใช่ 3 Functions ของ SSL VPN"
    ]
  }
]);
