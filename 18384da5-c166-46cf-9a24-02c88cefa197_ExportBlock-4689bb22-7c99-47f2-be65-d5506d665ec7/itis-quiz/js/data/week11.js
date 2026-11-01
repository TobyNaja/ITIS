// Week 11 — IDPS Technologies (1, 2, 3)
QUIZ.addQuestions("w11", [
  {
    id: "w11-01", type: "R", topic: "IDPS Components: Sensor vs Agent",
    q: "ใน IDPS ส่วนประกอบใดถูกติดตั้งบนเครื่อง Host เพื่อตรวจสอบกิจกรรมภายในเครื่องนั้น",
    c: [
      "Sensor",
      "Agent",
      "Console",
      "Database Server"
    ],
    a: 1,
    why: "Agent ใช้กับ Host-based IDPS โดยติดตั้งบน Host ส่วน Sensor ใช้ตรวจ Network (\"Sensor ดู Network / Agent ดู Host\")",
    w: [
      "Sensor ใช้กับ IDPS ที่ตรวจ Network เช่น NIDPS, Wireless IDPS, NBA",
      null,
      "Console เป็น Interface ระหว่าง Administrator กับ IDPS ไม่ได้ตรวจกิจกรรมบน Host",
      "Database Server เป็นที่เก็บข้อมูล Event"
    ]
  },
  {
    id: "w11-02", type: "U", topic: "Management Server: Correlation",
    q: "Sensor 3 ตัวรายงาน Port Scan, Login ล้มเหลว และการโจมตี Server จาก Source IP 10.0.0.50 แยกกัน ส่วนประกอบใดของ IDPS ทำให้เห็นว่าเหตุการณ์ทั้งหมดเป็นการโจมตีต่อเนื่องจากแหล่งเดียว และด้วยความสามารถใด",
    c: [
      "Console — ด้วยความสามารถ Code Viewing and Editing ของ Admin",
      "Database Server — ด้วยการจัดเก็บ Event แบบบีบอัดและเรียงตามลำดับเวลา",
      "Management Server — ด้วย Correlation ของ Event จากหลาย Sensor",
      "Sensor ตัวที่ 3 — ด้วยการส่ง TCP Reset (Session Sniping)"
    ],
    a: 2,
    why: "Management Server รับข้อมูลจาก Sensor/Agent หลายตัวแล้วทำ Correlation หาความสัมพันธ์ของ Event เช่น Source IP เดียวกัน ทำให้เห็นภาพรวมการโจมตี",
    w: [
      "Console เป็นหน้าจอให้ Admin ใช้ ส่วน Code Viewing คือการดู/แก้ Detection Code ไม่ใช่การหาความสัมพันธ์ของ Event",
      "Database Server ทำหน้าที่เก็บ Event ไม่ใช่วิเคราะห์ความสัมพันธ์",
      null,
      "Sensor แต่ละตัวเห็นเพียงส่วนของตน และ Session Sniping เป็นวิธีป้องกันของ Passive Sensor"
    ]
  },
  {
    id: "w11-03", type: "R", topic: "IDPS Components: Console",
    q: "ข้อใดอธิบายหน้าที่ของ Console ใน IDPS ได้ถูกต้อง",
    c: [
      "เป็น Repository หลักที่เก็บ Event และ Alert ทั้งหมดจาก Sensor, Agent และ Management Server",
      "Interface ระหว่าง Admin กับ IDPS ใช้ตั้งค่า/อัปเดต และ/หรือดูและวิเคราะห์ Alert",
      "รับสำเนา Traffic จาก SPAN Port หรือ TAP เพื่อวิเคราะห์หาการโจมตี",
      "นำ Event จากหลาย Sensor มาหาความสัมพันธ์ (Correlation) แบบอัตโนมัติ"
    ],
    a: 1,
    why: "Console คือโปรแกรมที่ Admin ใช้ติดต่อกับ IDPS บางตัวใช้ Administration บางตัวใช้ Monitoring/Analysis หรือรวมทั้งสองอย่าง",
    w: [
      "นี่คือหน้าที่ของ Database Server",
      null,
      "นี่คือหน้าที่ของ Sensor",
      "นี่คือหน้าที่ของ Management Server"
    ]
  },
  {
    id: "w11-04", type: "A", topic: "Out-of-Band Management",
    q: "ธนาคารต้องการให้ผู้ดูแลยังจัดการ IDPS ได้แม้ Production Network ถูก DDoS จน Traffic เต็ม และต้องการซ่อนการมีอยู่ของ IDPS จากผู้โจมตี โดยยอมรับค่าใช้จ่ายที่สูงขึ้นได้ ควรออกแบบอย่างไร",
    c: [
      "ใช้ In-Band โดยแยก VLAN สำหรับ IDPS Management บน Switch ชุดเดิม",
      "ใช้ Out-of-Band — สร้าง Management Network แยกจริง โดย Sensor มี Management Interface",
      "ให้ Sensor ส่ง Alert ผ่าน Production Network เดิม โดยตั้ง QoS Priority ของ IDPS ให้สูงที่สุด",
      "ติดตั้ง Console บน Web Server ใน DMZ เพื่อให้เข้าถึงได้จากทุกที่"
    ],
    a: 1,
    why: "Out-of-Band แยก Management Network ออกจาก Production จริง จึงมี Bandwidth สำหรับ IDPS แม้ Production ถูก DDoS ซ่อน IDPS จากผู้โจมตี และปกป้อง IDPS ได้ดีกว่า แลกกับค่าใช้จ่ายที่สูงขึ้น",
    w: [
      "VLAN ยังใช้ Switch/Link ร่วมกับ Production ถ้า Network เต็มก็กระทบ Management VLAN ด้วย",
      null,
      "ยังใช้ Network เดียวกับที่กำลังถูก DDoS และไม่ได้ซ่อน IDPS",
      "การวาง Console ใน DMZ เพิ่มโอกาสถูกโจมตี และไม่แก้ปัญหา Bandwidth"
    ]
  },
  {
    id: "w11-05", type: "U", topic: "In-Band Management (VLAN)",
    q: "ข้อใดเป็นความเสี่ยงของการจัดการ IDPS แบบ In-Band ที่ใช้ VLAN แยก Traffic",
    c: [
      "ต้องซื้อ Network Equipment และ Hardware ชุดใหม่ทั้งหมดแยกจาก Production จึงมีค่าใช้จ่ายสูงที่สุด",
      "Sensor ไม่สามารถส่งข้อมูลไปยัง Management Server ได้เลยเพราะอยู่คนละ VLAN",
      "ถ้าตั้งค่า VLAN ผิด ข้อมูล IDPS อาจรั่ว และถ้า Network เต็ม (เช่น DDoS) การจัดการก็กระทบ",
      "ต้องติดตั้ง Network TAP ทุกจุดของเครือข่ายจึงจะแยก Management Traffic ได้"
    ],
    a: 2,
    why: "In-Band ใช้ Infrastructure ร่วมกับ Production แม้แยก VLAN แล้ว ความผิดพลาดของ VLAN อาจทำให้ข้อมูลรั่ว และ Network ที่ Saturated จะกระทบ Management ด้วย",
    w: [
      "ค่าใช้จ่ายสูงเป็นข้อเสียของ Out-of-Band ส่วน In-Band ถูกกว่า",
      "In-Band ยังสื่อสารได้ผ่าน Network เดียวกัน (อาจแยกด้วย VLAN)",
      null,
      "Network TAP เป็นวิธีส่ง Traffic Copy ให้ Passive Sensor ไม่เกี่ยวกับรูปแบบ Management Network"
    ]
  },
  {
    id: "w11-06", type: "R", topic: "Detection: Threshold / Blacklist / Whitelist",
    q: "การตั้งค่าให้ IDPS แจ้งเตือนเมื่อ \"Login ล้มเหลว 10 ครั้งภายใน 1 นาที\" เป็นการใช้สิ่งใด",
    c: [
      "Threshold",
      "Blacklist",
      "Whitelist",
      "Stealth Mode"
    ],
    a: 0,
    why: "Threshold คือการกำหนดเกณฑ์ เมื่อพฤติกรรมเกินเกณฑ์ถือว่าผิดปกติและแจ้งเตือน",
    w: [
      null,
      "Blacklist คือรายการสิ่งที่ไม่อนุญาต/อันตราย ไม่ใช่เกณฑ์จำนวนครั้ง",
      "Whitelist คือรายการที่อนุญาต/เชื่อถือได้",
      "Stealth Mode คือการไม่ใส่ IP ให้ Monitoring Interface"
    ]
  },
  {
    id: "w11-07", type: "A", topic: "Prevention: Fine-tune ก่อนเปิดใช้",
    q: "หลังติดตั้ง IDPS ใหม่ ผู้ดูแลเปิด Prevention ทันที วันรุ่งขึ้นระบบเงินเดือนใช้งานไม่ได้เพราะ IDPS Block Traffic ของระบบนั้น สาเหตุและแนวทางที่ถูกต้องคือข้อใด",
    c: [
      "False Negative — ควรปิด Logging เพื่อลดภาระของ Sensor ลง",
      "False Positive — ควร Monitor/Fine-tune Rule ก่อนเปิด Prevention",
      "IDPS ถูกโจมตีจากภายนอก — ควรย้าย IDPS ไปไว้นอก Firewall",
      "Signature เก่าเกินไป — ควรปิด Signature Update อัตโนมัติไว้ก่อน"
    ],
    a: 1,
    why: "IDPS ตีความ Traffic ปกติว่าเป็นการโจมตี (False Positive) แนวทางคือ ตรวจจับก่อน → ตรวจว่า Detection ถูกต้อง → ปรับ Rule → ค่อยเปิด Prevention",
    w: [
      "False Negative คือไม่ตรวจพบการโจมตีจริง ซึ่งตรงข้ามกับโจทย์ และการปิด Log ไม่ช่วย",
      null,
      "ไม่มีหลักฐานว่า IDPS ถูกโจมตี ปัญหาคือการตั้งค่า Detection/Prevention",
      "การปิด Signature Update ทำให้ตรวจภัยใหม่ไม่ได้ และไม่แก้ False Positive"
    ]
  },
  {
    id: "w11-08", type: "U", topic: "Security Capabilities: Code Viewing & Alert Settings",
    q: "ข้อใดกล่าวถึง Alert Setting และ Code Viewing/Editing ของ IDPS ได้ถูกต้อง",
    c: [
      "Alert Setting ปรับได้เพียงการเปิด/ปิด Alert เท่านั้น ส่วน Severity และ Notification ถูกกำหนดตายตัวโดยผู้ผลิต",
      "IDPS ทุกตัวต้องเปิดให้ Admin ดูและแก้ไข Code ทั้งหมดได้ ตามมาตรฐานของ IDPS",
      "Code Viewing ใช้ดู Source Code ของ Application ที่ถูกโจมตี เพื่อหาช่องโหว่ที่ถูกใช้",
      "Alert Setting ปรับได้หลายด้าน เช่น Severity, Notification, Prevention ส่วน Code Viewing ไม่ได้มีในทุก IDPS"
    ],
    a: 3,
    why: "Alert Setting ปรับได้หลายด้าน (เปิด/ปิด, Priority/Severity, ข้อมูลที่ Log, Notification, Prevention) ส่วน Code Viewing มักให้ดู Detection Code เช่น Signature หรือ Stateful Protocol Analysis แต่ไม่ใช่ทุกระบบ",
    w: [
      "Alert Setting ปรับได้มากกว่าการเปิด/ปิด",
      "บทเรียนระบุว่าไม่ใช่ทุก IDPS ที่เปิดให้ดูหรือแก้ไข Code ทั้งหมด",
      "Code ที่ดูได้คือ Detection-related Code ของ IDPS ไม่ใช่ของ Application เป้าหมาย",
      null
    ]
  },
  {
    id: "w11-09", type: "U", topic: "Architecture Design",
    q: "ในการออกแบบ IDPS การมี Sensor หลายตัวตรวจ Activity เดียวกัน หรือมี Management Server หลักและสำรอง มีเป้าหมายหลักเพื่ออะไร",
    c: [
      "Reliability — ระบบยังทำงานได้เมื่อ Component ตัวหนึ่งเสีย",
      "Stealth — ซ่อน Sensor จากผู้โจมตีด้วยการไม่ใส่ IP",
      "Correlation — ทำให้ Event จากหลายแหล่งสัมพันธ์กัน",
      "Normalization — ปรับรูปแบบ Traffic ให้เป็นมาตรฐานเดียวก่อนส่งต่อ"
    ],
    a: 0,
    why: "การมีตัวซ้ำ/ตัวสำรองเป็นการออกแบบด้าน Reliability (และ Redundancy) เพื่อให้การตรวจสอบไม่หยุดเมื่ออุปกรณ์ตัวหนึ่งเสีย",
    w: [
      null,
      "Stealth เกี่ยวกับการไม่ใส่ IP ให้ Monitoring Interface",
      "Correlation เป็นความสามารถของ Management Server ไม่ใช่เหตุผลของการมีตัวสำรอง",
      "Normalization เป็นความสามารถของ Inline Sensor บางตัว"
    ]
  },
  {
    id: "w11-10", type: "U", topic: "Architecture Design: Integration",
    q: "ข้อใดเป็นตัวอย่างการเชื่อมต่อ IDPS กับระบบอื่นที่ถูกต้องตามบทเรียน",
    c: [
      "รับคำสั่งจาก Web Server ว่าจะ Block IP ใด แล้วกระจายคำสั่งนั้นต่อให้ Sensor ทุกตัว",
      "ทำหน้าที่แทน SIEM และ Centralized Log Server ทั้งหมดขององค์กร",
      "ส่งข้อมูลให้ SIEM/Log Server และส่งคำสั่งป้องกันไปยัง Firewall/Router/Switch",
      "ส่ง Patch ไปติดตั้งบนเครื่องผู้ใช้โดยตรงเมื่อพบช่องโหว่"
    ],
    a: 2,
    why: "IDPS อาจส่งข้อมูลไปยัง SIEM, Centralized Log Server, Email, Paging และส่ง Prevention Response ไปยัง Firewall/Router/Switch ส่วน Patch Management ใช้จัดการเครื่อง IDPS เอง",
    w: [
      "ทิศทางกลับกัน IDPS เป็นฝ่ายตรวจจับแล้วสั่งอุปกรณ์ Network",
      "IDPS ส่งข้อมูลให้ SIEM ไม่ได้แทนที่",
      null,
      "Patch Management Software ใช้อัปเดต Component ของ IDPS เช่น Console ไม่ใช่ IDPS ส่ง Patch ให้ผู้ใช้"
    ]
  },
  {
    id: "w11-11", type: "A", topic: "Securing IDPS: Separation of Duties",
    q: "ผู้ตรวจสอบพบว่า Admin คนเดียวมีสิทธิ์ทั้ง Monitor Alert, แก้ไข Rule และลบ Log ของ IDPS ได้ ข้อใดเป็นข้อเสนอแนะที่เหมาะสมที่สุด",
    c: [
      "ให้ Admin คนนี้เปลี่ยนรหัสผ่านทุก 30 วัน และใช้รหัสผ่านที่ยาวและซับซ้อนมากขึ้น",
      "เปิด Stealth Mode ให้ Monitoring Interface ของ Sensor ทุกตัว",
      "เพิ่ม Sensor อีกหนึ่งตัวเพื่อ Redundancy ของการตรวจจับ",
      "แบ่งหน้าที่ (Separation of Duties) และให้สิทธิ์เท่าที่จำเป็น (Least Privilege)"
    ],
    a: 3,
    why: "คนเดียวควบคุมทุกอย่างเสี่ยงต่อการใช้อำนาจเกินและการลบหลักฐาน ควรแยกคน Monitor กับคน Configure ให้สิทธิ์เท่าที่จำเป็น และใช้ Access Control กับ Config Mode",
    w: [
      "การเปลี่ยนรหัสผ่านไม่แก้ปัญหาสิทธิ์ที่รวมอยู่ที่คนเดียว",
      "Stealth Mode ปกป้อง Sensor จาก Network ไม่ได้แก้ปัญหาสิทธิ์ผู้ดูแล",
      "Redundancy เกี่ยวกับความพร้อมใช้งาน ไม่ใช่การควบคุมสิทธิ์",
      null
    ]
  },
  {
    id: "w11-12", type: "U", topic: "Operation & Maintenance",
    q: "เหตุใดการอัปเดต Signature ของ IDPS จึงต้องทำอย่างต่อเนื่อง แยกจากการอัปเดต Software",
    c: [
      "เพื่อให้ตรวจจับภัยคุกคามใหม่ได้ ส่วน Software Update ใช้ปรับปรุงตัวโปรแกรม IDPS",
      "เพราะ Signature Update ทำให้ Management Server ไม่ต้องทำ Correlation อีก",
      "เพราะ Signature Update ใช้แทนการฝึกอบรมผู้ดูแลระบบได้ทั้งหมด",
      "เพื่อเปลี่ยน IP Address ของ Monitoring Interface เป็นระยะ ทำให้ผู้โจมตีติดตาม Sensor ได้ยาก"
    ],
    a: 0,
    why: "Signature Updates เพิ่มความสามารถตรวจจับภัยใหม่ ส่วน Software Updates ปรับปรุงตัว IDPS ทั้งสองเป็นงาน Operation & Maintenance ที่ต้องทำต่อเนื่อง",
    w: [
      null,
      "Correlation ยังจำเป็นเสมอ ไม่เกี่ยวกับการอัปเดต Signature",
      "บทเรียนเน้นว่าผู้ดูแลต้องพัฒนาทักษะ (Training, Documentation ฯลฯ) ไม่สามารถแทนด้วย Signature",
      "Monitoring Interface ไม่ควรมี IP ตั้งแต่แรก (Stealth Mode)"
    ]
  },
  {
    id: "w11-13", type: "R", topic: "NIDPS: TCP/IP Layers",
    q: "Network-based IDPS วิเคราะห์ Source IP, Destination IP และ IP Protocol Number ใน Layer ใด",
    c: [
      "Application Layer",
      "Transport Layer",
      "Network Layer",
      "Hardware Layer"
    ],
    a: 2,
    why: "Network Layer ดูข้อมูลระดับ IP (Source/Destination IP, IP Protocol Number) ส่วน Hardware Layer ดู MAC Address",
    w: [
      "Application Layer ดู Protocol และพฤติกรรมของ Application",
      "Transport Layer ดู TCP/UDP, Port และ Connection",
      null,
      "Hardware Layer ดู MAC Address"
    ]
  },
  {
    id: "w11-14", type: "U", topic: "Sensor Location: Inline vs Passive",
    q: "ข้อใดเปรียบเทียบ Inline Sensor กับ Passive Sensor ได้ถูกต้อง",
    c: [
      "Inline ได้รับเฉพาะ Copy ของ Traffic ส่วน Passive อยู่ขวางเส้นทาง Traffic จริง",
      "Inline อยู่ในเส้นทาง Traffic จึง Block ได้โดยตรง ส่วน Passive รับ Copy จึงไม่กระทบ Traffic หลัก",
      "Passive สามารถ Drop Packet จากเส้นทางหลักได้ดีกว่า Inline เพราะไม่เพิ่ม Latency ให้กับ Traffic หลัก",
      "ทั้งสองแบบต้องรับ Traffic ผ่าน Network TAP เท่านั้น ต่างกันที่ความเร็ว"
    ],
    a: 1,
    why: "Inline = Traffic ต้องผ่าน Sensor → ทำ Prevention ได้โดยตรง; Passive = ได้ Copy → ไม่กระทบ Traffic หลัก",
    w: [
      "สลับนิยามกัน",
      null,
      "Passive ไม่ได้อยู่ในเส้นทางหลักจึง Drop Packet โดยตรงไม่ได้",
      "TAP ใช้กับ Passive เท่านั้น และ Passive ยังใช้ SPAN Port หรือ IDS Load Balancer ได้"
    ]
  },
  {
    id: "w11-15", type: "A", topic: "Passive Sensor: Network TAP",
    q: "องค์กรมีข้อกำหนดว่า \"ระบบตรวจจับต้องไม่ทำให้ Traffic หลักหยุด แม้ Sensor จะเสีย\" และต้องการเห็น Traffic จากลิงก์ Fiber Optic โดยตรง ควรเลือกแบบใด",
    c: [
      "Inline Sensor ต่อขวางลิงก์ Fiber พร้อมเปิด Prevention",
      "Passive Sensor ที่รับ Copy ผ่าน Network TAP บนลิงก์ Fiber",
      "Host-based Agent ที่ติดตั้งบน Router ซึ่งต่อกับลิงก์ Fiber",
      "Inline Sensor ที่ทำ Traffic Normalization ก่อนส่งต่อ"
    ],
    a: 1,
    why: "Passive Sensor ไม่อยู่ในเส้นทางหลัก ถ้าเสีย Traffic ยังวิ่งได้ และ Network TAP ต่อกับ Physical Media เช่น Fiber เพื่อส่ง Copy ของ Traffic ให้ Sensor",
    w: [
      "Inline อยู่ขวางเส้นทาง หาก Sensor เสียอาจกระทบ Traffic หลัก",
      null,
      "Agent ใช้ตรวจกิจกรรมบน Host ไม่ได้รับ Traffic จากลิงก์ Fiber",
      "ยังเป็น Inline ซึ่งไม่ตรงข้อกำหนดเรื่องไม่กระทบ Traffic หลัก"
    ]
  },
  {
    id: "w11-16", type: "A", topic: "Passive Sensor: IDS Load Balancer",
    q: "ลิงก์หลักขององค์กรมี Traffic สูงเกินกว่าที่ Sensor ตัวเดียวจะวิเคราะห์ทัน ทำให้ Sensor ทิ้ง Packet บางส่วน ควรแก้อย่างไร",
    c: [
      "ใช้ IDS Load Balancer กระจาย Traffic ไปยัง Sensor หลายตัว",
      "ปิด Signature บางกลุ่มเพื่อให้ Sensor ประมวลผลได้เร็วขึ้น",
      "เปลี่ยน Sensor ให้ใช้ Session Sniping แทนการวิเคราะห์",
      "เปลี่ยน Management Network จาก Out-of-Band เป็น In-Band"
    ],
    a: 0,
    why: "IDS Load Balancer ใช้เมื่อ Traffic มากเกินกว่า Sensor ตัวเดียวรับไหว โดยกระจายตาม Volume, IP Address, Protocol หรือคุณสมบัติอื่น",
    w: [
      null,
      "การปิด Signature ลดความสามารถตรวจจับ และไม่ใช่แนวทางในบทเรียน",
      "Session Sniping เป็นวิธีป้องกัน ไม่ได้ช่วยเรื่องปริมาณ Traffic",
      "รูปแบบ Management Network ไม่เกี่ยวกับความสามารถวิเคราะห์ Traffic ของ Sensor"
    ]
  },
  {
    id: "w11-17", type: "R", topic: "Passive Sensor: SPAN Port",
    q: "SPAN Port (Spanning Port) คืออะไร",
    c: [
      "อุปกรณ์ที่ต่อกับสาย Fiber Optic โดยตรง เพื่อคัดลอก Traffic จาก Physical Link ให้ Sensor",
      "Interface ของ Sensor ที่ไม่มี IP Address เพื่อซ่อนตัวจากผู้โจมตี",
      "Port บน Switch ที่ตั้งค่าให้รับสำเนา Traffic จาก Port/VLAN อื่นส่งให้ Sensor",
      "Port ที่ Passive Sensor ใช้ส่ง TCP Reset ไปยัง Endpoint ทั้งสองฝั่ง"
    ],
    a: 2,
    why: "SPAN Port = Switch Copy Traffic จาก Port/VLAN ที่ต้องการไปยัง Port ที่ต่อกับ IDPS Sensor",
    w: [
      "นี่คือ Network TAP",
      "นี่คือ Monitoring Interface ใน Stealth Mode",
      null,
      "TCP Reset เป็นวิธี Session Sniping ไม่เกี่ยวกับ SPAN"
    ]
  },
  {
    id: "w11-18", type: "R", topic: "Logging Capabilities",
    q: "ข้อมูลใน Log ของ IDPS ที่บันทึก \"Username ที่ Login อยู่ในขณะเกิดเหตุการณ์\" จัดเป็นข้อมูลประเภทใด",
    c: [
      "Rating",
      "Decoded Payload",
      "Connection/Session ID",
      "State Information"
    ],
    a: 3,
    why: "State Information คือข้อมูลสถานะ เช่น Username ที่ Login อยู่",
    w: [
      "Rating คือระดับความสำคัญ เช่น Priority, Severity, Impact, Confidence",
      "Decoded Payload คือข้อมูลใน Packet ที่ IDPS แปลความหมายได้ เช่น HTTP Request/Response",
      "Connection/Session ID ใช้ระบุ TCP Connection หรือกลุ่ม Packet",
      null
    ]
  },
  {
    id: "w11-19", type: "U", topic: "Detection Capabilities by Layer",
    q: "ข้อใดจับคู่การโจมตีกับ Layer ที่ NIDPS ตรวจจับได้ถูกต้อง",
    c: [
      "SYN Flood — Application, Buffer Overflow — Network, IP Spoofing — Transport",
      "Buffer Overflow — Application, SYN Flood — Transport, IP Spoofing — Network",
      "IP Spoofing — Application, Port Scanning — Network, Password Guessing — Transport",
      "Banner Grabbing — Network, Illegal IP Header — Transport, SYN Flood — Application"
    ],
    a: 1,
    why: "Application: Buffer Overflow, Banner Grabbing, Password Guessing; Transport: Port Scanning, SYN Flood, Fragmentation ผิดปกติ; Network: IP Spoofing, Illegal IP Header",
    w: [
      "จับคู่สลับ Layer ทั้งหมด",
      null,
      "IP Spoofing อยู่ Network, Port Scanning อยู่ Transport, Password Guessing อยู่ Application",
      "Banner Grabbing อยู่ Application, Illegal IP Header อยู่ Network, SYN Flood อยู่ Transport"
    ]
  },
  {
    id: "w11-20", type: "A", topic: "Stateful Protocol Analysis",
    q: "IDPS พบ Connection บน TCP Port 80 แต่ข้อมูลที่รับส่งไม่มีรูปแบบของ HTTP เลย สงสัยว่าเป็น Tunneled Protocol หรือ Backdoor เทคนิคใดเหมาะกับการตรวจจับลักษณะนี้มากที่สุด",
    c: [
      "Threshold — แจ้งเตือนเมื่อจำนวน Connection บน Port 80 เกินเกณฑ์ที่กำหนดไว้",
      "Stateful Protocol Analysis — ตรวจว่าพฤติกรรมตรงกับ Protocol ที่ควรเป็นหรือไม่",
      "Blacklist — บล็อก TCP Port 80 ทั้งหมดที่ Sensor ตรวจพบ",
      "Session Sniping — ส่ง TCP Reset ทุก Connection ที่ใช้ Port 80"
    ],
    a: 1,
    why: "Unexpected Application Services เช่น Tunneled Protocol/Backdoor มักตรวจด้วย Stateful Protocol Analysis ซึ่งตรวจว่า Traffic ตรงกับ Protocol ที่ควรเป็น (HTTP ควรมีรูปแบบ HTTP)",
    w: [
      "Threshold การ Login ไม่เกี่ยวกับการตรวจรูปแบบ Protocol",
      null,
      "การ Blacklist Port 80 จะบล็อก Web ทั้งหมด และไม่ได้ตรวจว่า Protocol จริงคืออะไร",
      "Session Sniping เป็นวิธีป้องกัน ไม่ใช่วิธีตรวจจับ"
    ]
  },
  {
    id: "w11-21", type: "U", topic: "Anomaly Detection vs Policy Violations",
    q: "ข้อใดแยก Anomaly Detection กับ Policy Violations ได้ถูกต้อง",
    c: [
      "Anomaly เน้นพฤติกรรมที่ผิดไปจากปกติ ส่วน Policy Violation เน้นการทำผิดกฎที่องค์กรกำหนด",
      "Anomaly ใช้ Signature ที่รู้จักแล้ว ส่วน Policy Violation ใช้ Threshold เพียงอย่างเดียว",
      "ทั้งสองเป็นความสามารถเดียวกัน ต่างกันแค่ชื่อที่ผู้ผลิตแต่ละรายเรียก",
      "Anomaly ตรวจเฉพาะ Application Layer ส่วน Policy Violation ตรวจเฉพาะ Hardware Layer"
    ],
    a: 0,
    why: "Anomaly Detection ดูความผิดปกติ เช่น มี Port ใหม่เปิดหรือ Traffic เพิ่มผิดปกติ ส่วน Policy Violations ดูการละเมิดกฎ เช่น ใช้ Port/Application/Website ที่ถูกห้าม",
    w: [
      null,
      "บทเรียนไม่ได้จำกัดวิธีแบบนี้",
      "บทเรียนให้แยกสองแนวคิดนี้ชัดเจน",
      "บทเรียนไม่ได้จำกัด Layer ของทั้งสองแบบ"
    ]
  },
  {
    id: "w11-22", type: "A", topic: "Policy Violations",
    q: "องค์กรห้ามใช้โปรแกรม P2P File Sharing แต่พบพนักงานบางคนยังใช้อยู่ ผู้ดูแลควรใช้ความสามารถใดของ NIDPS ในการตรวจจับ",
    c: [
      "Stealth Mode — ซ่อน Sensor จากผู้ใช้ที่ใช้ P2P",
      "Policy Violations — กำหนด Protocol/Port ที่ไม่อนุญาต",
      "Code Viewing and Editing — แก้ Code ของโปรแกรม P2P",
      "Hardware Layer Analysis — ตรวจ MAC Address ของเครื่อง"
    ],
    a: 1,
    why: "Policy Violations ให้ Admin กำหนดลักษณะที่ไม่อนุญาต เช่น TCP/UDP Port, IP, Website หรือ Application Protocol แล้ว IDPS ตรวจจับการละเมิดนโยบาย",
    w: [
      "Stealth Mode ใช้ซ่อน Sensor ไม่ได้ตรวจการใช้งาน",
      null,
      "Code Viewing ใช้ดู Detection Code ไม่ได้ตรวจการใช้งานของพนักงาน",
      "MAC Address อย่างเดียวไม่บอกว่ากำลังใช้ P2P"
    ]
  },
  {
    id: "w11-23", type: "U", topic: "Prevention: Passive (Session Sniping)",
    q: "ข้อใดเป็นข้อจำกัดของ Session Sniping ที่ Passive Sensor ใช้",
    c: [
      "ใช้ได้กับทุก Protocol แต่ช้ากว่า Inline Prevention เล็กน้อย",
      "Sensor ต้องมี IP บน Monitoring Interface จึงจะส่ง Reset ได้",
      "ใช้ได้เฉพาะ UDP และ ICMP ไม่สามารถใช้กับ TCP ได้",
      "ใช้ได้เฉพาะ TCP และ Reset อาจไปถึงหลังการโจมตีสำเร็จแล้ว"
    ],
    a: 3,
    why: "Session Sniping ส่ง TCP RST ไปยังทั้งสองฝั่ง ใช้ได้กับ TCP เท่านั้น และกว่าจะส่ง Reset การโจมตีอาจเกิดไปแล้ว จึงไม่ค่อยนิยมในปัจจุบัน",
    w: [
      "Session Sniping ใช้กับ UDP/ICMP ไม่ได้",
      "บทเรียนไม่ได้กล่าวเช่นนี้ และ Monitoring Interface ควรไม่มี IP ตามหลัก Stealth Mode",
      "ตรงข้าม — ใช้ได้เฉพาะ TCP",
      null
    ]
  },
  {
    id: "w11-24", type: "A", topic: "Prevention: Both Passive and Inline",
    q: "Passive Sensor ตรวจพบการโจมตีผ่าน UDP จาก 10.10.10.50 วิธีป้องกันใดยังทำได้และเหมาะสมที่สุด",
    c: [
      "ส่ง TCP Reset ไปยังทั้งสองฝั่งของ Session นั้น",
      "Drop Packet เองด้วย Inline Firewalling",
      "สั่ง Firewall/Router ให้ Block 10.10.10.50",
      "แก้ไข Payload ของ Packet ก่อนส่งต่อ"
    ],
    a: 2,
    why: "การสั่งอุปกรณ์อื่น (Firewall/Router/Switch) หรือเรียก Script ทำได้ทั้ง Passive และ Inline และใช้ได้กับ UDP",
    w: [
      "TCP Reset ใช้ไม่ได้กับ UDP",
      "Inline Firewalling ต้องเป็น Inline Sensor",
      null,
      "Altering Malicious Content ต้องอยู่ในเส้นทาง Traffic (Inline)"
    ]
  },
  {
    id: "w11-25", type: "R", topic: "Prevention: Inline Only",
    q: "ความสามารถป้องกันใดต่อไปนี้ทำได้เฉพาะ Inline Sensor",
    c: [
      "Running a Third-Party Program or Script",
      "Reconfiguring Other Network Security Devices",
      "Ending the Current TCP Session (Session Sniping)",
      "Throttling Bandwidth Usage"
    ],
    a: 3,
    why: "Inline-only ได้แก่ Inline Firewalling, Throttling Bandwidth, Altering Malicious Content (และ Normalization สำหรับ Sensor แบบ Proxy)",
    w: [
      "การเรียก Script ทำได้ทั้ง Passive และ Inline",
      "การสั่งอุปกรณ์อื่นทำได้ทั้ง Passive และ Inline",
      "Session Sniping เป็นวิธีของ Passive Sensor",
      null
    ]
  },
  {
    id: "w11-26", type: "A", topic: "Prevention: Altering Malicious Content",
    q: "องค์กรต้องการให้อีเมลยังส่งถึงผู้รับได้ แต่ต้องตัดไฟล์แนบที่ติดมัลแวร์ออกก่อนถึงปลายทาง ความสามารถของ IDPS ใดตรงกับความต้องการนี้",
    c: [
      "Altering Malicious Content บน Inline Sensor",
      "Session Sniping บน Passive Sensor ที่รับ Copy",
      "Threshold Alert เมื่อพบไฟล์แนบเกินขนาด",
      "Information Gathering ของเครื่องผู้รับ"
    ],
    a: 0,
    why: "Altering Malicious Content แก้ไข/ตัดส่วนอันตรายออกจาก Packet (เช่น Attachment ที่ติด Malware) แล้วส่ง Packet ที่แก้แล้วต่อ ทำได้บน Inline Sensor",
    w: [
      null,
      "Session Sniping ตัด Connection ทั้งหมด อีเมลจะไม่ถึงปลายทาง",
      "Threshold ใช้แจ้งเตือน ไม่ได้แก้ไขเนื้อหา",
      "Information Gathering รวบรวมข้อมูลเครือข่าย ไม่ได้ป้องกัน"
    ]
  },
  {
    id: "w11-27", type: "U", topic: "Stealth Mode",
    q: "ข้อใดอธิบาย Stealth Mode ของ NIDPS ได้ถูกต้องที่สุด",
    c: [
      "ทั้ง Management และ Monitoring Interface ไม่มี IP Address ทำให้ Sensor ล่องหนจากผู้โจมตีได้ 100%",
      "Monitoring Interface ไม่มี IP (ยกเว้น Management) ช่วยลด Attack Surface แต่ยังอาจถูกอนุมานได้",
      "Sensor เข้ารหัส Traffic ทั้งหมดที่ตรวจพบ เพื่อไม่ให้ผู้โจมตีอ่านผลการตรวจได้",
      "Sensor ปิดการทำงานชั่วคราวทุกครั้งที่พบการสแกน เพื่อไม่ให้ผู้โจมตีตรวจพบ"
    ],
    a: 1,
    why: "Stealth Mode คือไม่ใส่ IP ให้ Monitoring Interface เพื่อไม่ให้เครื่องอื่นเริ่ม Connection เข้ามาได้ง่าย แต่ผู้โจมตีอาจลองส่ง Scan Pattern แล้วดูว่าอะไรถูก Block เพื่ออนุมานว่ามี IDPS",
    w: [
      "Management Interface ยังต้องมี IP ให้ Admin จัดการ และบทเรียนเน้นว่าไม่ได้ล่องหน 100%",
      null,
      "Stealth Mode ไม่ได้เกี่ยวกับการเข้ารหัส Traffic",
      "Sensor ยังทำงานตามปกติ เพียงแค่ไม่เปิดช่องทางสื่อสารผ่าน Monitoring Interface"
    ]
  },
  {
    id: "w11-28", type: "A", topic: "NIDPS Management: Deployment",
    q: "ทีมวางแผนติดตั้ง NIDPS โดยหัวหน้าทีมบอกว่า \"ใช้ Passive Sensor ทั้งหมด จึงไม่ต้องวางแผนช่วงเวลาติดตั้งเพราะไม่มีทางกระทบ Network\" ข้อความนี้ถูกต้องหรือไม่",
    c: [
      "ถูกต้อง เพราะ Passive ไม่ได้อยู่ในเส้นทาง Traffic จึงไม่มีความเสี่ยงต่อ Network เลย",
      "ถูกต้อง ถ้าใช้ SPAN Port เพราะ Switch Copy Traffic ให้ได้โดยไม่ต้องตั้งค่าใด ๆ",
      "ไม่ถูกต้อง เพราะ Passive Sensor ต้องอยู่ขวางเส้นทาง Traffic เสมอ จึงมีความเสี่ยงเท่ากับ Inline Sensor",
      "ไม่ถูกต้อง เพราะการติดตั้ง TAP/Load Balancer หรือเปิด SPAN บน Switch ก็อาจทำให้ Network หยุดได้"
    ],
    a: 3,
    why: "แม้ Inline จะเสี่ยงที่สุด แต่บทเรียนระบุว่าการติดตั้ง Passive Sensor ก็อาจทำให้เกิด Outage ได้ จึงต้องวางแผน Deployment และช่วงเวลา",
    w: [
      "การติดตั้งอุปกรณ์ที่ใช้ส่ง Copy เช่น TAP ยังอาจกระทบ Network",
      "การเปิด SPAN ต้อง Reconfigure Switch ซึ่งอาจกระทบ Network",
      "Passive Sensor ไม่ได้อยู่ขวางเส้นทาง เหตุผลนี้จึงผิด",
      null
    ]
  },
  {
    id: "w11-29", type: "U", topic: "NIDPS Components: Appliance vs Software-only",
    q: "ข้อใดแยก NIDPS แบบ Appliance กับแบบ Software Only ได้ถูกต้อง",
    c: [
      "Appliance เป็น Hardware เฉพาะที่มี Sensor Software มาด้วย ส่วน Software Only ติดตั้งบน Hardware ขององค์กร",
      "Appliance ทำงานได้เฉพาะแบบ Passive ส่วน Software Only ทำงานได้เฉพาะแบบ Inline เท่านั้น",
      "Appliance ไม่ต้องใช้ Management Server เลย ส่วน Software Only ต้องมี Management Server แยกต่างหากเสมอ",
      "Software Only ตรวจได้เฉพาะ Application Layer ส่วน Appliance ตรวจได้ทุก Layer"
    ],
    a: 0,
    why: "ความต่างอยู่ที่รูปแบบการติดตั้ง: Appliance เป็นอุปกรณ์เฉพาะทาง ส่วน Software Only เป็นซอฟต์แวร์ที่ติดตั้งบน Hardware ขององค์กร",
    w: [
      null,
      "รูปแบบการติดตั้งไม่ได้กำหนดว่าเป็น Inline หรือ Passive",
      "บทเรียนไม่ได้กำหนดเช่นนี้",
      "บทเรียนไม่ได้จำกัด Layer ตามรูปแบบการติดตั้ง"
    ]
  }
]);
