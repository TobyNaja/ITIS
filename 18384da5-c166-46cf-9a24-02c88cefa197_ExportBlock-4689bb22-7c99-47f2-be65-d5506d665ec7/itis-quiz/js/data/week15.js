// Week 15 — Cloud Security Standards และ Identity and Access Management (IAM)
QUIZ.addQuestions("w15", [
  {
    id: "w15-01", type: "R", topic: "ISO Standards for Cloud",
    q: "มาตรฐาน ISO ใดเน้นการปกป้องข้อมูลส่วนบุคคล (PII) ที่อยู่บน Cloud",
    c: [
      "ISO 27001",
      "ISO 27017",
      "ISO 27018",
      "ISO 17789"
    ],
    a: 2,
    why: "ISO 27018 = Cloud Privacy ปกป้อง PII บน Cloud",
    w: [
      "ISO 27001 = ระบบบริหารความมั่นคงปลอดภัย (Security Management) โดยทั่วไป",
      "ISO 27017 = แนวทางควบคุมความปลอดภัยสำหรับ Cloud โดยเฉพาะ",
      null,
      "ISO 17789 = Cloud Architecture และบทบาท/ความสัมพันธ์ของ Cloud Services"
    ]
  },
  {
    id: "w15-02", type: "U", topic: "ISO Standards for Cloud",
    q: "ข้อใดจับคู่มาตรฐาน ISO กับจุดเน้นได้ถูกต้องทั้งหมด",
    c: [
      "27001 = Cloud Privacy, 27017 = Terms, 17788 = Security Management",
      "27017 = Cloud Security Controls, 17788 = Cloud Vocabulary, 17789 = Cloud Architecture",
      "27018 = Cloud Architecture, 17789 = PII Protection, 27001 = Vocabulary",
      "17788 = Cloud Security Controls, 27017 = Cloud Architecture, 27018 = Security Management"
    ],
    a: 1,
    why: "27001 = Security, 27017 = Cloud Security, 27018 = Privacy, 17788 = Terms (Vocabulary), 17789 = Architecture",
    w: [
      "27001 คือ Security Management, 17788 คือคำศัพท์ และ 27018 คือ Privacy",
      null,
      "27018 คือ PII/Privacy และ 17789 คือ Architecture",
      "17788 คือคำศัพท์ 27017 คือ Cloud Security และ 27018 คือ Privacy"
    ]
  },
  {
    id: "w15-03", type: "A", topic: "FedRAMP",
    q: "Cloud Service Provider รายหนึ่งต้องการให้บริการแก่หน่วยงานรัฐบาลกลางสหรัฐฯ ต้องผ่านกรอบใด และขั้นตอนหลักเรียงอย่างไร",
    c: [
      "CSA STAR — ลงทะเบียนเพื่อแสดงความน่าเชื่อถือด้าน Security ต่อลูกค้าทั่วไป",
      "ISO 27018 — ประเมินการปกป้อง PII ของผู้ให้บริการ Cloud",
      "CIS Controls — ปฏิบัติตาม Best Practices 18 Controls",
      "FedRAMP — Preparation → Authorization → Continuous Monitoring"
    ],
    a: 3,
    why: "FedRAMP เป็นกรอบของรัฐบาลสหรัฐฯ สำหรับประเมินและอนุมัติ CSP มี 3 ขั้น: Preparation → Authorization (ATO/P-ATO) → Continuous Monitoring",
    w: [
      "CSA STAR ใช้ประเมินความน่าเชื่อถือของ CSP ทั่วไป ไม่ใช่ข้อกำหนดเฉพาะของรัฐบาลสหรัฐฯ",
      "ISO 27018 เน้นปกป้อง PII บน Cloud",
      "CIS Controls เป็น Best Practices 18 ข้อ ไม่ใช่กระบวนการอนุมัติ CSP",
      null
    ]
  },
  {
    id: "w15-04", type: "U", topic: "CSA CCM vs CSA STAR",
    q: "ข้อใดแยก CSA Cloud Controls Matrix (CCM) กับ CSA STAR ได้ถูกต้อง",
    c: [
      "CCM ใช้ประเมินและรับรองความน่าเชื่อถือของ CSP แต่ละราย ส่วน STAR เป็นรายการ Security Controls สำหรับ Cloud",
      "CCM เป็นข้อกำหนดของรัฐบาลสหรัฐฯ ส่วน STAR เป็นมาตรฐานในตระกูล ISO 27000",
      "CCM เป็น Checklist ของ Security Controls สำหรับ Cloud ส่วน STAR ใช้ประเมินความน่าเชื่อถือของ CSP",
      "ทั้งสองเป็นชื่อเรียกของ Core และ Profiles ใน NIST Cybersecurity Framework"
    ],
    a: 2,
    why: "CCM = Checklist ของ Security Controls สำหรับ Cloud (เทียบกับ Framework อื่นได้) ส่วน STAR (Security, Trust, Assurance, and Risk) = ช่วยประเมิน CSP",
    w: [
      "สลับบทบาทกัน",
      "ทั้งสองเป็นของ Cloud Security Alliance (CSA) ไม่ใช่รัฐบาลสหรัฐฯ หรือ ISO",
      null,
      "ไม่ใช่ส่วนหนึ่งของ NIST CSF"
    ]
  },
  {
    id: "w15-05", type: "A", topic: "CSA STAR",
    q: "บริษัทกำลังเปรียบเทียบผู้ให้บริการ Cloud 3 ราย และต้องการหลักฐานภายนอกเกี่ยวกับความน่าเชื่อถือด้าน Security ของผู้ให้บริการแต่ละราย ควรตรวจสอบสิ่งใดเป็นหลัก",
    c: [
      "ผู้ให้บริการมี CSA STAR Certification/Registration หรือไม่",
      "ผู้ให้บริการใช้คำศัพท์ตาม ISO 17788 ในเอกสารหรือไม่",
      "ผู้ให้บริการมีหน้า Portal ที่ปรับแต่งโลโก้และสีขององค์กรได้หรือไม่",
      "ผู้ให้บริการเป็นแบบ Public Cloud หรือ Private Cloud"
    ],
    a: 0,
    why: "CSA STAR ใช้ประเมินความน่าเชื่อถือและความปลอดภัยของ CSP เมื่อเลือกผู้ให้บริการจึงดูว่ามี STAR Certification/Registration หรือไม่",
    w: [
      null,
      "ISO 17788 เป็นเพียงคำศัพท์ ไม่ได้บอกระดับความปลอดภัย",
      "การปรับแต่ง Portal ไม่ใช่หลักฐานด้านความปลอดภัย",
      "Deployment Model ไม่ได้บอกความน่าเชื่อถือด้าน Security ของผู้ให้บริการ"
    ]
  },
  {
    id: "w15-06", type: "U", topic: "CIS Controls",
    q: "ข้อใดกล่าวถึง CIS Controls ได้ถูกต้อง",
    c: [
      "กรอบสำหรับประเมินและอนุมัติ CSP ที่จะให้บริการแก่รัฐบาลสหรัฐฯ",
      "Best Practices 18 Controls ที่ไม่ได้ทำเพื่อ Cloud โดยเฉพาะ แต่มี Cloud Companion Guide",
      "มาตรฐานที่กำหนดคำศัพท์และแนวคิดพื้นฐานของ Cloud ให้เข้าใจตรงกัน",
      "Checklist ของ Security Controls ที่ออกแบบมาเพื่อใช้กับ Cloud เท่านั้น ใช้กับระบบอื่นไม่ได้"
    ],
    a: 1,
    why: "CIS (Center for Internet Security) Controls เป็นแนวปฏิบัติด้าน Security 18 ข้อ ใช้กับ Cloud ได้โดยมี Cloud Companion Guide",
    w: [
      "นั่นคือ FedRAMP",
      null,
      "มาตรฐานคำศัพท์คือ ISO 17788",
      "CIS Controls ไม่ได้ทำมาเพื่อ Cloud โดยเฉพาะ"
    ]
  },
  {
    id: "w15-07", type: "R", topic: "NIST SP 800-145",
    q: "เอกสาร NIST ใดเป็นนิยามของ Cloud Computing (5 Characteristics, 3 Service Models, 4 Deployment Models)",
    c: [
      "SP 800-144",
      "SP 800-145",
      "SP 800-146",
      "SP 800-53"
    ],
    a: 1,
    why: "SP 800-145 = The NIST Definition of Cloud Computing",
    w: [
      "SP 800-144 = Security & Privacy ใน Public Cloud",
      null,
      "SP 800-146 = Cloud Computing Synopsis and Recommendations",
      "SP 800-53 = Security and Privacy Controls"
    ]
  },
  {
    id: "w15-08", type: "A", topic: "NIST SP 800-146",
    q: "ผู้บริหารต้องการเอกสารที่ช่วยพิจารณาว่า Cloud เหมาะกับองค์กรหรือไม่ และถ้าใช้ควรใช้แบบใด โดยอธิบาย Performance, Reliability, Security และข้อดีข้อจำกัด ควรอ้างอิงเอกสารใด",
    c: [
      "NIST SP 800-210",
      "NIST SP 800-53",
      "NIST SP 800-146",
      "ISO 27017"
    ],
    a: 2,
    why: "SP 800-146 = Cloud Synopsis + Recommendations → ช่วยตัดสินใจว่าใช้ Cloud เมื่อไร/อย่างไร",
    w: [
      "SP 800-210 เน้น Access Control ใน Cloud",
      "SP 800-53 เน้นรายการ Security Controls",
      null,
      "ISO 27017 เป็นแนวทางควบคุมความปลอดภัยสำหรับ Cloud ไม่ใช่คู่มือตัดสินใจใช้ Cloud"
    ]
  },
  {
    id: "w15-09", type: "A", topic: "NIST SP 800-144",
    q: "โรงพยาบาลกำลังจะย้ายข้อมูลผู้ป่วยขึ้น Public Cloud และต้องการแนวทางด้าน Security และ Privacy ที่ต้องพิจารณาก่อนตัดสินใจ ควรอ้างอิงเอกสารใดเป็นหลัก",
    c: [
      "NIST SP 800-144",
      "NIST SP 800-145",
      "ISO 17788",
      "CIS Controls"
    ],
    a: 0,
    why: "SP 800-144 = Guidelines on Security and Privacy in Public Cloud Computing เน้นวางแผนก่อนนำข้อมูลขึ้น Public Cloud",
    w: [
      null,
      "SP 800-145 นิยามว่า Cloud คืออะไร ไม่ได้เน้นแนวทาง Security/Privacy",
      "ISO 17788 เป็นคำศัพท์ของ Cloud",
      "CIS Controls เป็น Best Practices ทั่วไป ไม่ได้เน้น Public Cloud Privacy"
    ]
  },
  {
    id: "w15-10", type: "U", topic: "NIST SP 800-144",
    q: "ประเด็นสำคัญข้อใดสอดคล้องกับแนวคิดของ NIST SP 800-144",
    c: [
      "เมื่อย้ายข้อมูลขึ้น Cloud แล้ว CSP จะรับผิดชอบความปลอดภัยของข้อมูลทั้งหมดแทนองค์กร",
      "ควรย้ายข้อมูลขึ้น Cloud ก่อน แล้วค่อยวางแผน Security ภายหลัง",
      "Public Cloud ทุกรายมี Security Controls เท่ากัน ไม่ต้องศึกษาเพิ่ม",
      "องค์กรยังต้องรับผิดชอบ Security/Privacy ของข้อมูลตนเอง แม้ CSP ดูแล Infrastructure"
    ],
    a: 3,
    why: "SP 800-144 เน้นว่าต้องวางแผน Security/Privacy ก่อน เข้าใจ Provider ให้ตรงกับ Requirement และองค์กรยังต้องรับผิดชอบข้อมูลของตัวเอง",
    w: [
      "บทเรียนเตือนว่าไม่ใช่ \"เอาข้อมูลไป Cloud แล้ว Provider รับผิดชอบทุกอย่าง\"",
      "ต้องวางแผนก่อนเอาข้อมูลขึ้น Cloud",
      "ต้องเข้าใจว่า Provider ให้บริการอะไรและมี Controls อะไร",
      null
    ]
  },
  {
    id: "w15-11", type: "U", topic: "NIST SP 800-53 vs NIST CSF",
    q: "ข้อใดอธิบายความสัมพันธ์ระหว่าง NIST CSF กับ NIST SP 800-53 ได้ถูกต้อง",
    c: [
      "CSF ระบุรุ่น Firewall และอุปกรณ์ที่ต้องใช้ ส่วน SP 800-53 เป็นนิยามของ Cloud Computing",
      "ทั้งสองเป็นเอกสารเดียวกัน เพียงแต่ CSF เป็นชื่อเรียกฉบับย่อของ SP 800-53",
      "CSF เป็น Framework ภาพรวม ส่วน SP 800-53 ให้รายละเอียด Security & Privacy Controls",
      "SP 800-53 ใช้ได้เฉพาะ Cloud ส่วน CSF ใช้ได้เฉพาะระบบ On-premise"
    ],
    a: 2,
    why: "CSF บอกในระดับว่าองค์กรควรจัดการตั้งแต่ Identify → Recover ส่วนรายละเอียดว่าต้องทำอะไรดูจาก SP เช่น 800-53 (Access Control, Audit, Configuration Mgmt, IR ฯลฯ)",
    w: [
      "CSF ไม่ได้ระบุรุ่นอุปกรณ์ และนิยาม Cloud คือ SP 800-145",
      "เป็นเอกสารต่างกันและมีบทบาทต่างกัน",
      null,
      "SP 800-53 เดิมเน้น Federal Organizations แต่นำไปใช้ทั่วไปได้ และ CSF ใช้ได้กับ Cloud ทุกรูปแบบ"
    ]
  },
  {
    id: "w15-12", type: "A", topic: "NIST SP 800-210",
    q: "ทีม Cloud ต้องการแนวทางควบคุมว่าใครเข้าถึง Network, Data, APIs และการจัดการ Privilege ได้อย่างไรในบริการแบบ IaaS, PaaS และ SaaS ควรอ้างอิงเอกสารใด",
    c: [
      "NIST SP 800-210",
      "NIST SP 800-145",
      "NIST SP 800-144",
      "ISO 27018"
    ],
    a: 0,
    why: "SP 800-210 = General Access Control Guidance for Cloud Systems ครอบคลุม IaaS/PaaS/SaaS และ Access Control ของ Network, Data, APIs, Privilege",
    w: [
      null,
      "SP 800-145 นิยาม Cloud ไม่ได้ให้แนวทาง Access Control",
      "SP 800-144 เน้น Security/Privacy ใน Public Cloud โดยรวม",
      "ISO 27018 เน้นปกป้อง PII"
    ]
  },
  {
    id: "w15-13", type: "A", topic: "Cloud Essential Characteristics",
    q: "เว็บไซต์ขายตั๋วคอนเสิร์ตบน Cloud เพิ่มจำนวน Server อัตโนมัติจาก 3 เป็น 30 เครื่องในช่วงเปิดขาย แล้วลดกลับเมื่อ Traffic ลด ตรงกับคุณลักษณะใดตาม NIST SP 800-145",
    c: [
      "Resource Pooling",
      "Rapid Elasticity",
      "Broad Network Access",
      "On-demand Self-service"
    ],
    a: 1,
    why: "Rapid Elasticity = เพิ่ม/ลด Resource ได้รวดเร็วตามความต้องการ",
    w: [
      "Resource Pooling คือการแบ่ง Resource กลางให้ลูกค้าหลายรายใช้ร่วมกันแบบ Dynamic",
      null,
      "Broad Network Access คือเข้าถึงได้ผ่าน Network จากหลายอุปกรณ์",
      "On-demand Self-service คือผู้ใช้สร้าง Resource เองได้โดยไม่ต้องรอเจ้าหน้าที่ แต่จุดเด่นของโจทย์คือการขยาย/หดอัตโนมัติ"
    ]
  },
  {
    id: "w15-14", type: "A", topic: "Cloud Essential Characteristics",
    q: "ใบแจ้งหนี้ Cloud ของบริษัทแสดงค่าใช้จ่ายตามจำนวนชั่วโมง CPU, GB ของ Storage และปริมาณ Network ที่ใช้จริง ตรงกับคุณลักษณะใด",
    c: [
      "Rapid Elasticity",
      "Broad Network Access",
      "Measured Service",
      "Resource Pooling"
    ],
    a: 2,
    why: "Measured Service = Cloud วัดและติดตามการใช้งาน แล้วคิดค่าบริการตามการใช้งานจริง",
    w: [
      "Rapid Elasticity คือการปรับขนาด Resource ไม่ใช่การวัดเพื่อคิดค่าบริการ",
      "Broad Network Access คือการเข้าถึงจากอุปกรณ์หลากหลาย",
      null,
      "Resource Pooling คือการแบ่ง Resource ร่วมกัน"
    ]
  },
  {
    id: "w15-15", type: "U", topic: "Cloud Essential Characteristics",
    q: "ข้อใดอธิบาย Resource Pooling ได้ถูกต้อง",
    c: [
      "ผู้ใช้ต้องเลือก Physical Server และตำแหน่ง Datacenter ด้วยตนเองทุกครั้งที่สร้าง VM ใหม่",
      "ลูกค้าแต่ละรายต้องมี Hardware แยกของตนเอง ไม่ใช้ร่วมกับลูกค้ารายอื่น",
      "ผู้ใช้เข้าถึง Cloud ได้จากหลายอุปกรณ์ เช่น Laptop และ Smartphone",
      "รวม CPU/Memory/Storage มาแบ่งให้หลายลูกค้าแบบ Dynamic โดยไม่ต้องรู้ว่าอยู่ Server ใด"
    ],
    a: 3,
    why: "Resource Pooling คือการรวม Resource กลางแล้วแบ่งให้หลายลูกค้าแบบ Dynamic ผู้ใช้ไม่ต้องรู้ตำแหน่ง Physical Server",
    w: [
      "ตรงข้าม ผู้ใช้ไม่จำเป็นต้องรู้ว่า Physical Server อยู่ที่ไหน",
      "ตรงข้ามกับการใช้ Resource ร่วมกัน",
      "นี่คือ Broad Network Access",
      null
    ]
  },
  {
    id: "w15-16", type: "A", topic: "Cloud Service Models",
    q: "ทีมนักพัฒนาต้องการ Deploy Application โดยไม่ต้องดูแล Server, OS หรือ Runtime เอง แต่ยังต้องพัฒนาและดูแลโค้ดของ Application ตัวเอง ควรเลือก Service Model ใด",
    c: [
      "IaaS",
      "SaaS",
      "PaaS",
      "On-premise"
    ],
    a: 2,
    why: "PaaS = Provider ดูแล Infrastructure + Platform ให้ ผู้ใช้เน้นพัฒนาและ Deploy Application (\"เช่า Platform\")",
    w: [
      "IaaS ผู้ใช้ยังต้องจัดการ OS, Application และข้อมูลเอง",
      "SaaS ผู้ใช้แค่ใช้ Software สำเร็จรูป ไม่ได้ Deploy Application ของตนเอง",
      null,
      "On-premise ต้องดูแล Server เองทั้งหมด"
    ]
  },
  {
    id: "w15-17", type: "A", topic: "Cloud Deployment Models",
    q: "โรงพยาบาลหลายแห่งที่มีข้อกำหนดด้านการปกป้องข้อมูลผู้ป่วยคล้ายกัน ร่วมกันใช้ Cloud ที่ให้บริการเฉพาะกลุ่มตน เป็น Deployment Model แบบใด",
    c: [
      "Public Cloud",
      "Private Cloud",
      "Hybrid Cloud",
      "Community Cloud"
    ],
    a: 3,
    why: "Community Cloud ใช้ร่วมกันระหว่างองค์กรที่มีความต้องการหรือข้อกำหนดคล้ายกัน",
    w: [
      "Public Cloud ให้บริการลูกค้าทั่วไปหลายราย",
      "Private Cloud สร้างไว้สำหรับองค์กรเดียว",
      "Hybrid Cloud คือการผสม Cloud หลายรูปแบบ เช่น Private + Public",
      null
    ]
  },
  {
    id: "w15-18", type: "R", topic: "NIST CSF: Core",
    q: "ข้อใดเรียงลำดับ 5 Functions ของ NIST CSF Core ได้ถูกต้อง",
    c: [
      "Identify → Protect → Detect → Respond → Recover",
      "Protect → Identify → Detect → Recover → Respond",
      "Detect → Identify → Protect → Respond → Recover",
      "Identify → Detect → Protect → Recover → Respond"
    ],
    a: 0,
    why: "Core = Identify (รู้ Asset/Risk) → Protect → Detect → Respond → Recover",
    w: [
      null,
      "ต้องรู้ Asset และ Risk (Identify) ก่อนจึงป้องกันได้ และ Respond มาก่อน Recover",
      "ต้อง Identify และ Protect ก่อน Detect",
      "Protect มาก่อน Detect และ Respond มาก่อน Recover"
    ]
  },
  {
    id: "w15-19", type: "A", topic: "NIST CSF: Core",
    q: "ตรวจพบว่าบัญชีผู้ดูแล Cloud ถูกขโมย ทีมงาน Disable บัญชี ตรวจสอบขอบเขต และควบคุมไม่ให้ลุกลาม (Contain) กิจกรรมนี้อยู่ใน Function ใดของ NIST CSF",
    c: [
      "Identify",
      "Detect",
      "Respond",
      "Recover"
    ],
    a: 2,
    why: "Respond คือการรับมือเมื่อเกิด Incident เช่น Disable Account → Investigate → Contain",
    w: [
      "Identify คือการรู้ว่ามี Asset และ Risk อะไร",
      "Detect คือการตรวจจับเหตุผิดปกติ ซึ่งเกิดก่อนการรับมือ",
      null,
      "Recover คือการกู้คืนระบบหลังเหตุการณ์ เช่น Restore จาก Backup"
    ]
  },
  {
    id: "w15-20", type: "U", topic: "NIST CSF: Core / Tiers / Profiles",
    q: "ข้อใดอธิบายบทบาทของ 3 Components ใน NIST CSF ได้ถูกต้อง",
    c: [
      "Core = ระดับความสามารถขององค์กร, Tiers = ด้านที่ต้องจัดการ, Profiles = รายการ Security Controls",
      "Core = ต้องจัดการด้านไหน, Tiers = ทำได้ระดับไหน, Profiles = Requirements ที่เหมาะกับองค์กร",
      "Core = มาตรฐาน ISO, Tiers = ขั้นตอน FedRAMP, Profiles = ผลการประเมิน STAR",
      "Core, Tiers และ Profiles คือชื่อเรียกอื่นของ 5 Functions ใน Framework"
    ],
    a: 1,
    why: "Core = ทำอะไร, Tier = ทำได้ระดับไหน, Profile = เหมาะกับใคร/ต้องการอะไร",
    w: [
      "สลับบทบาทระหว่าง Core กับ Tiers และ Profile ไม่ใช่รายการ Controls",
      null,
      "ไม่เกี่ยวข้องกับ ISO, FedRAMP หรือ STAR",
      "5 Functions เป็นส่วนของ Core เท่านั้น"
    ]
  },
  {
    id: "w15-21", type: "A", topic: "NIST CSF: Implementation Tiers",
    q: "องค์กรหนึ่งมี Security Policy และ Procedure ที่เป็นลายลักษณ์อักษร มีการประเมินตามรอบและทำตามกระบวนการเดิมอย่างสม่ำเสมอ แต่ยังปรับ Controls ตาม Threat ใหม่ได้ช้า องค์กรนี้อยู่ Tier ใด",
    c: [
      "Tier 1 — Partial",
      "Tier 2 — Risk-Informed",
      "Tier 3 — Repeatable",
      "Tier 4 — Adaptive"
    ],
    a: 2,
    why: "Tier 3 Repeatable = มีกระบวนการเป็นระบบและทำซ้ำได้ ยังไม่ถึง Tier 4 Adaptive ที่ปรับตัวตาม Threat ใหม่ได้อย่างต่อเนื่อง",
    w: [
      "Tier 1 ทำ Security แบบเฉพาะหน้า ยังไม่เป็นระบบ",
      "Tier 2 เริ่มนำ Risk มาพิจารณาแต่ยังไม่เป็นระบบทั้งองค์กร",
      null,
      "Tier 4 ต้องปรับตัวตาม Threat ใหม่ได้อย่างต่อเนื่อง ซึ่งองค์กรนี้ยังทำได้ช้า"
    ]
  },
  {
    id: "w15-22", type: "A", topic: "NIST CSF: Profiles",
    q: "ร้านค้าออนไลน์เน้นปกป้อง Customer Data และ Payment ส่วนโรงพยาบาลเน้น Patient Data และ Availability ทั้งสองใช้ NIST CSF แต่เลือก Security Requirements ต่างกัน สิ่งนี้สะท้อน Component ใด",
    c: [
      "Core",
      "Implementation Tiers",
      "Profiles",
      "Continuous Monitoring"
    ],
    a: 2,
    why: "Profile = ปรับ NIST CSF ให้เหมาะกับองค์กร ตามความสำคัญและ Requirement ของแต่ละองค์กร",
    w: [
      "Core คือ 5 Functions ที่ทุกองค์กรใช้เหมือนกัน",
      "Tiers บอกระดับความสามารถ ไม่ได้บอกว่าแต่ละองค์กรต้องการอะไร",
      null,
      "Continuous Monitoring เป็นประโยชน์/แนวปฏิบัติ ไม่ใช่ Component ของ CSF"
    ]
  },
  {
    id: "w15-23", type: "U", topic: "NIST Cloud Security Best Practices",
    q: "ข้อใดเป็นตัวอย่างการเข้ารหัสข้อมูลแบบ Data in Transit",
    c: [
      "เข้ารหัสไฟล์ Backup ที่เก็บไว้ใน Object Storage ของ Cloud",
      "เข้ารหัสฐานข้อมูลที่บันทึกอยู่บนดิสก์ของ VM ด้วย AES",
      "เข้ารหัส Snapshot ของ Volume ก่อนเก็บไว้ในระยะยาว",
      "ใช้ TLS เข้ารหัสข้อมูลที่ส่งจาก Application ไปยัง API"
    ],
    a: 3,
    why: "Data in Transit = ข้อมูลที่กำลังส่งผ่าน Network ส่วน Data at Rest = ข้อมูลที่เก็บอยู่ เช่น Database/Storage",
    w: [
      "ไฟล์ Backup ที่เก็บอยู่เป็น Data at Rest",
      "ฐานข้อมูลบนดิสก์เป็น Data at Rest",
      "Snapshot ที่เก็บอยู่เป็น Data at Rest",
      null
    ]
  },
  {
    id: "w15-24", type: "U", topic: "NIST Cloud Security Best Practices",
    q: "ข้อใดแยก Vulnerability Assessment กับ Penetration Testing ได้ถูกต้อง",
    c: [
      "Vulnerability Assessment หาช่องโหว่ ส่วน Pentest จำลองการโจมตีว่าเจาะได้จริงหรือไม่",
      "ทั้งสองคือการติดตั้งและปรับแต่ง Firewall และ Anti-malware บน Cloud ให้ทำงานถูกต้องตาม Policy",
      "Pentest คือการสแกนหาช่องโหว่อย่างเดียว โดยไม่ทดลองโจมตีจริง",
      "Vulnerability Assessment ใช้แทน Incident Response Plan ได้ทั้งหมด"
    ],
    a: 0,
    why: "Best Practice ข้อแรกของ NIST Cloud Security คือทำทั้ง Vulnerability Assessment (หาช่องโหว่) และ Penetration Testing (จำลองการโจมตี) เป็นประจำ",
    w: [
      null,
      "Firewall เป็น Best Practice อีกข้อหนึ่ง",
      "Pentest จำลองการโจมตีจริง ไม่ได้แค่สแกน",
      "Incident Response Plan เป็นอีก Best Practice หนึ่ง ใช้แทนกันไม่ได้"
    ]
  },
  {
    id: "w15-25", type: "U", topic: "Benefits of NIST Cloud Security",
    q: "ผู้จัดการกล่าวว่า \"เราทำตาม NIST ครบแล้ว จึงได้ ISO 27001 อัตโนมัติ\" ข้อใดถูกต้องตามบทเรียน",
    c: [
      "ถูกต้อง เพราะ NIST และ ISO 27001 เป็นมาตรฐานเดียวกันที่ออกโดยองค์กรเดียวกันคนละชื่อ",
      "ไม่ถูกต้อง NIST ช่วยให้สอดคล้องกับข้อกำหนดอื่นง่ายขึ้น แต่ไม่ได้ผ่าน ISO อัตโนมัติ",
      "ถูกต้อง หากองค์กรใช้ Cloud แบบ Public เพียงอย่างเดียว",
      "ไม่ถูกต้อง เพราะแนวทางของ NIST นำมาใช้กับ Cloud ไม่ได้"
    ],
    a: 1,
    why: "NIST ช่วยด้าน Compliance และใช้เป็นแนวทางเตรียมรองรับ ISO 27001, SOC 2, PCI-DSS แต่บทเรียนเตือนว่าไม่ได้แปลว่าทำ NIST แล้วผ่าน ISO 27001 อัตโนมัติ",
    w: [
      "เป็นกรอบต่างกันจากองค์กรต่างกัน",
      null,
      "Deployment Model ไม่ได้ทำให้ได้ Certification อัตโนมัติ",
      "NIST ใช้กับ Cloud ได้ทุกรูปแบบ"
    ]
  },
  {
    id: "w15-26", type: "A", topic: "Best Practices for Cloud Security Compliance",
    q: "บริษัทเริ่มใช้ Cloud และต้องการจัดทำ Cloud Security Policy แต่ยังไม่แน่ใจว่าต้องปฏิบัติตามกฎหมาย/มาตรฐานใดบ้าง ควรทำสิ่งใดก่อนเขียน Policy",
    c: [
      "ซื้อ Firewall และ Anti-malware รุ่นใหม่ที่สุดมาติดตั้งให้ครบทุกระบบก่อน",
      "เขียน Policy ให้ครอบคลุมทุกมาตรฐานที่มีอยู่ในโลกไว้ก่อน",
      "Identify Relevant Regulations — ระบุมาตรฐาน/กฎหมายที่ต้องปฏิบัติตามก่อน",
      "รอให้เกิด Security Incident ก่อนแล้วค่อยกำหนดมาตรฐานที่ใช้"
    ],
    a: 2,
    why: "Best Practices: Train & Educate, Identify Relevant Regulations, Develop Cloud Security Policy — ต้องรู้ก่อนว่าต้องปฏิบัติตามอะไรจึงจะเขียน Policy ได้ตรง",
    w: [
      "การซื้ออุปกรณ์ก่อนรู้ข้อกำหนดอาจไม่ตอบโจทย์",
      "ไม่สมเหตุสมผลและทำให้ Policy ไม่ชัดเจน",
      null,
      "ต้องเตรียมล่วงหน้า ไม่ใช่รอเกิดเหตุ"
    ]
  },
  {
    id: "w15-27", type: "R", topic: "Federated Identity Management",
    q: "ใน Federated Identity ระบบใดทำหน้าที่ยืนยันตัวตนผู้ใช้ (Authentication) เช่น Okta, Google, Microsoft Entra ID",
    c: [
      "Service Provider (SP)",
      "Relying Party",
      "Identity Provider (IdP)",
      "Certificate Authority (CA)"
    ],
    a: 2,
    why: "IdP เป็นผู้ตรวจสอบตัวตน ส่วน SP เป็นผู้ให้บริการที่อาศัยผลการยืนยันตัวตนจาก IdP",
    w: [
      "SP เป็นผู้ให้บริการ ไม่ได้ยืนยันตัวตนเอง",
      "Relying Party คือชื่อเรียก SP ในบริบท SAML",
      null,
      "CA ออก Certificate ไม่ใช่องค์ประกอบของ FIM ตามบทเรียน"
    ]
  },
  {
    id: "w15-28", type: "A", topic: "SAML Authentication Flow",
    q: "นักศึกษาเปิดเว็บไซต์เรียนออนไลน์ ถูกส่งต่อไปหน้า Login ของมหาวิทยาลัย กรอกรหัสผ่านสำเร็จ แล้วกลับมาใช้งานเว็บเรียนได้ ข้อใดอธิบายบทบาทใน SAML ได้ถูกต้อง",
    c: [
      "เว็บเรียนเป็น IdP ที่ตรวจตัวตนและสร้าง Assertion ส่วนระบบมหาวิทยาลัยเป็น SP",
      "ระบบมหาวิทยาลัยเป็น IdP ส่ง Assertion ให้เว็บเรียนซึ่งเป็น SP (Relying Party)",
      "เว็บเรียนตรวจรหัสผ่านเอง แล้วส่งผลการยืนยันให้มหาวิทยาลัย",
      "ทั้งสองระบบต้องเก็บรหัสผ่านของนักศึกษาไว้ซ้ำกันเพื่อเทียบ"
    ],
    a: 1,
    why: "Flow: User → SP → ส่งไป IdP → User Login ที่ IdP → IdP ส่ง Assertion กลับ SP → SP อนุญาตใช้งาน โดย SP เชื่อถือ IdP ผ่าน Trust Relationship",
    w: [
      "สลับบทบาท — มหาวิทยาลัยเป็นผู้ยืนยันตัวตน (IdP)",
      null,
      "ผู้ใช้กรอกรหัสผ่านที่ IdP ไม่ใช่ที่ SP",
      "ข้อดีของ FIM คือไม่ต้องจำ/เก็บ Username-Password หลายชุด"
    ]
  },
  {
    id: "w15-29", type: "R", topic: "CSA STAR",
    q: "STAR ใน CSA STAR ย่อมาจากอะไร",
    c: [
      "Standard, Threat, Audit, Recovery",
      "Security, Trust, Assurance, and Risk",
      "System, Testing, Access, and Response",
      "Secure Transfer And Replication"
    ],
    a: 1,
    why: "STAR = Security, Trust, Assurance, and Risk ใช้ประเมินความน่าเชื่อถือและความปลอดภัยของ Cloud Service Provider",
    w: [
      "ไม่ใช่คำย่อของ STAR",
      null,
      "ไม่ใช่คำย่อของ STAR",
      "ไม่ใช่คำย่อของ STAR"
    ]
  },
  {
    id: "w15-30", type: "R", topic: "Cloud Essential Characteristics",
    q: "ข้อใดไม่ใช่หนึ่งใน 5 Essential Characteristics ของ Cloud ตาม NIST SP 800-145",
    c: [
      "On-demand Self-service",
      "Broad Network Access",
      "Dedicated Physical Hardware",
      "Measured Service"
    ],
    a: 2,
    why: "5 Characteristics คือ On-demand Self-service, Broad Network Access, Resource Pooling, Rapid Elasticity และ Measured Service — Hardware เฉพาะรายขัดกับแนวคิด Resource Pooling",
    w: [
      "เป็นหนึ่งใน 5 Characteristics",
      "เป็นหนึ่งใน 5 Characteristics",
      null,
      "เป็นหนึ่งใน 5 Characteristics"
    ]
  }
]);
