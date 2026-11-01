// Week 12-13 — Firewall: Technologies, Limitations, Architecture, Policy, Planning & Implementation
QUIZ.addQuestions("w12", [
  {
    id: "w12-01", type: "U", topic: "Firewall: ข้อจำกัดของ Perimeter",
    q: "องค์กรมี Firewall เพียงตัวเดียวที่ขอบเครือข่าย (Internet ↔ Internal) ข้อใดเป็นจุดอ่อนสำคัญของการออกแบบนี้",
    c: [
      "Firewall ที่ขอบเครือข่ายไม่สามารถตรวจ Traffic ที่มาจาก Internet ได้",
      "Traffic ระหว่างเครื่องใน Internal Network เดียวกันอาจไม่ผ่าน Firewall เลย",
      "Firewall ที่ขอบเครือข่ายทำให้พนักงานไม่สามารถใช้ VPN จากภายนอกได้",
      "Firewall ที่ขอบเครือข่ายไม่รองรับหลัก Deny by Default ในการตั้ง Rule ขาเข้า"
    ],
    a: 1,
    why: "Firewall ที่ Perimeter มองไม่เห็นทุก Traffic เช่น PC A → PC B ใน LAN เดียวกัน จึงควรวาง Firewall หลายตำแหน่ง เช่น ระหว่าง Internal Network หรือ Server Network",
    w: [
      "หน้าที่หลักของ Perimeter Firewall คือควบคุม Traffic จาก Internet อยู่แล้ว",
      null,
      "การมี Firewall ที่ขอบไม่ได้ทำให้ใช้ VPN ไม่ได้",
      "Deny by Default ใช้ได้กับ Firewall ทุกตำแหน่ง"
    ]
  },
  {
    id: "w12-02", type: "R", topic: "Packet Filtering (Stateless)",
    q: "Packet Filtering Firewall มีลักษณะสำคัญตามข้อใด",
    c: [
      "ตรวจแต่ละ Packet แยกกันจาก IP, Port และ Protocol โดยไม่จำ State ของ Connection",
      "ติดตามสถานะของ TCP Handshake และ Block Packet ที่ไม่สอดคล้องกับ State",
      "เป็นตัวกลางระหว่าง Client กับ Server โดย Client ไม่ได้เชื่อมต่อกับ Server โดยตรงเลย",
      "วิเคราะห์ HTTP/HTTPS Request เพื่อป้องกันการโจมตี Web Application"
    ],
    a: 0,
    why: "Packet Filtering หรือ Stateless Inspection ดู Packet เป็นตัว ๆ เทียบกับ Rule โดยไม่จำว่าเป็นส่วนหนึ่งของ Connection ใด",
    w: [
      null,
      "นี่คือ Stateful Inspection Firewall",
      "นี่คือ Application-Proxy Gateway",
      "นี่คือ WAF"
    ]
  },
  {
    id: "w12-03", type: "A", topic: "Stateful Inspection",
    q: "ผู้โจมตีส่ง TCP Packet ที่ตั้ง Flag ACK มายัง Server ภายใน โดยไม่เคยมี SYN/SYN-ACK เกิดขึ้นก่อน และ Port ปลายทางเป็น Port ที่ Rule อนุญาต Firewall ประเภทใดจะ Block Packet นี้ได้",
    c: [
      "Packet Filtering Firewall เพราะตรวจ Flag ของแต่ละ Packet แยกกันอย่างละเอียด",
      "NAT เพราะเมื่อแปลง Address แล้ว Packet ที่ผิดปกติจะหายไปเอง",
      "Dedicated Proxy เพราะทำหน้าที่เป็นตัวกลางของทุก Connection",
      "Stateful Inspection เพราะรู้ว่า Packet ไม่สอดคล้องกับ Connection State"
    ],
    a: 3,
    why: "Stateful Firewall จำ State ของ Connection (เช่น หลัง 3-way handshake = ESTABLISHED) Packet ที่ไม่สอดคล้องกับ State จึงถูก Block แม้จะตรง Port ที่อนุญาต",
    w: [
      "Packet Filtering ไม่จำ State เมื่อ Port ตรง Rule ก็อาจปล่อยผ่าน",
      "NAT ไม่ใช่ Security Control และไม่ได้ตัดสิน Allow/Block ตาม State",
      "Dedicated Proxy มีความสามารถด้าน Firewall จำกัด และไม่ใช่คำตอบที่ตรงกับปัญหา State",
      null
    ]
  },
  {
    id: "w12-04", type: "A", topic: "Application Firewall",
    q: "พนักงานใช้โปรแกรม Instant Messaging ผ่าน TCP Port 80 เพื่อเลี่ยงนโยบาย Firewall แบบ Packet Filtering ปล่อยผ่านเพราะเป็น Port 80 ควรใช้ Firewall ประเภทใดจึงตรวจพบและ Block ได้",
    c: [
      "Packet Filtering ที่เพิ่ม Rule ปิด Port 80 ทั้งหมดที่ขอบเครือข่าย",
      "Application Firewall ที่ตรวจว่า Traffic จริงไม่ใช่ HTTP",
      "NAT แบบ Many-to-One",
      "Virtual Firewall"
    ],
    a: 1,
    why: "Application Firewall ตัดสินจากพฤติกรรมของ Application จึงรู้ว่า \"Port เป็น 80 แต่ Traffic จริงไม่ใช่ HTTP\" แล้ว Block ได้โดยไม่กระทบ Web ปกติ",
    w: [
      "การปิด Port 80 ทั้งหมดจะทำให้ใช้ Web ไม่ได้ และยังไม่ได้แยก Application",
      null,
      "NAT แปลง Address/Port ไม่ได้ตรวจ Application",
      "Virtual Firewall มีไว้ควบคุม Traffic ระหว่าง VM ไม่ใช่ประเด็นนี้"
    ]
  },
  {
    id: "w12-05", type: "A", topic: "Application Firewall",
    q: "นโยบายองค์กรกำหนดว่า \"อนุญาตให้ Download ไฟล์ผ่าน FTP ได้ แต่ห้าม Upload\" Firewall ต้องมีความสามารถใดจึงบังคับใช้นโยบายนี้ได้",
    c: [
      "ตรวจคำสั่งของ Application เช่นคำสั่ง put (Application Firewall)",
      "Block TCP Port 21 ทั้งหมดด้วย Packet Filtering ที่ขอบเครือข่ายขององค์กร",
      "ใช้ NAT Pinholing ส่งต่อ Port 21 ไปยัง FTP Server ภายใน",
      "เปิด Stealth Mode บน Firewall เพื่อซ่อน FTP Server"
    ],
    a: 0,
    why: "Application Firewall ตรวจ Action/Command ภายใน Protocol ได้ จึง Block เฉพาะ put (Upload) ขณะที่ยังให้ Download ได้",
    w: [
      null,
      "การ Block Port 21 ทำให้ใช้ FTP ไม่ได้ทั้งหมด รวมถึง Download",
      "Pinholing ใช้กำหนดการส่งต่อ Port ไปยัง Host ภายใน ไม่ได้แยกคำสั่ง",
      "Stealth Mode เป็นแนวคิดของ NIDPS Sensor ไม่เกี่ยวกับการแยกคำสั่ง FTP"
    ]
  },
  {
    id: "w12-06", type: "U", topic: "Application-Proxy Gateway vs Dedicated Proxy",
    q: "ข้อใดแยก Application-Proxy Gateway กับ Dedicated Proxy Server ได้ถูกต้อง",
    c: [
      "Application-Proxy Gateway ไม่ได้เป็นตัวกลาง Client เชื่อมต่อ Server โดยตรง ส่วน Dedicated Proxy เป็นตัวกลาง",
      "Dedicated Proxy มีความสามารถด้าน Firewall มากกว่า เพราะออกแบบมาเพื่อตรวจทุก Protocol",
      "ทั้งสองเป็นตัวกลาง แต่ Application-Proxy = Proxy + Firewall ส่วน Dedicated Proxy เน้น Proxy เป็นหลัก",
      "Dedicated Proxy ใช้สำหรับสร้าง VPN Tunnel ส่วน Application-Proxy ใช้กรอง Web"
    ],
    a: 2,
    why: "ทั้งสองเป็นตัวกลางระหว่าง Client กับ Server (Client ไม่เชื่อมต่อ Server โดยตรง) แต่ Dedicated Proxy เน้น Proxy มากกว่า Firewall",
    w: [
      "Application-Proxy Gateway เป็นตัวกลางระหว่าง Client กับ Server",
      "กลับด้าน — Dedicated Proxy มีความสามารถ Firewall จำกัดกว่า",
      null,
      "Dedicated Proxy ไม่ได้ใช้สำหรับ VPN"
    ]
  },
  {
    id: "w12-07", type: "A", topic: "Network Access Control (NAC)",
    q: "พนักงานกรอก Username/Password ถูกต้อง แต่ถูกปฏิเสธไม่ให้เข้า Network เพราะ Antivirus บนเครื่องไม่ได้อัปเดตและ OS ขาด Patch ล่าสุด เทคโนโลยีใดทำงานอยู่",
    c: [
      "Unified Threat Management (UTM) ที่รวม Firewall และ Antivirus ไว้ด้วยกัน",
      "Web Application Firewall (WAF) ที่ตรวจ HTTP Request",
      "Network Access Control (NAC) ที่ตรวจ Credentials + Health Check",
      "Packet Filtering Firewall ที่ตรวจ Source IP ของเครื่อง"
    ],
    a: 2,
    why: "NAC ตรวจทั้งตัวตน (Credentials) และสุขภาพเครื่อง (Health Check) เช่น Antivirus, Personal Firewall, Patch — \"คนถูกต้องอย่างเดียวไม่พอ เครื่องต้องปลอดภัยด้วย\"",
    w: [
      "UTM คือการรวม Security Functions หลายอย่างในระบบเดียว ไม่ได้เน้นตรวจสุขภาพเครื่องก่อนเข้า Network",
      "WAF ป้องกัน Web Application",
      null,
      "Packet Filtering ตัดสินจาก IP/Port/Protocol ไม่ได้ตรวจ Patch หรือ Antivirus"
    ]
  },
  {
    id: "w12-08", type: "A", topic: "Web Application Firewall (WAF)",
    q: "บริษัทพบความพยายามโจมตีผ่านค่าพารามิเตอร์ใน HTTP Request ไปยังระบบสมัครสมาชิกบนเว็บ ต้องการอุปกรณ์ที่วิเคราะห์ HTTP/HTTPS Request เพื่อป้องกันการโจมตี Web Application โดยเฉพาะ ควรใช้อะไรและวางตรงไหน",
    c: [
      "WAF วางไว้ด้านหน้า Web Server",
      "NAC วางไว้ที่ Switch ของผู้ใช้",
      "Virtual Firewall วางไว้ใน Hypervisor ของเครื่องพนักงาน",
      "Dedicated Proxy วางไว้หลัง Database"
    ],
    a: 0,
    why: "WAF = Firewall สำหรับ Web วางหน้า Web Server เพื่อวิเคราะห์ HTTP/HTTPS Request และป้องกัน Attack ที่มุ่งโจมตี Web Application",
    w: [
      null,
      "NAC ตรวจเครื่องก่อนเข้า Network ไม่ได้วิเคราะห์ HTTP Request ไปยังเว็บ",
      "Virtual Firewall ควบคุม Traffic ระหว่าง VM ไม่ได้ออกแบบมาเพื่อ Web Application",
      "Dedicated Proxy เน้น Proxy และไม่ได้ออกแบบเพื่อป้องกัน Web Application โดยเฉพาะ"
    ]
  },
  {
    id: "w12-09", type: "A", topic: "Firewalls for Virtual Infrastructures",
    q: "VM หลายเครื่องรันบน Physical Server เดียวกัน เมื่อ VM1 ถูกเจาะ ผู้โจมตีใช้ VM1 โจมตี VM3 ต่อ โดย Traffic ไม่ออกไปนอก Physical Server เลย ควรใช้อะไรควบคุม Traffic นี้",
    c: [
      "เพิ่ม Rule ใน Perimeter Firewall ให้ Block Traffic ระหว่าง VM ทั้งหมด",
      "Firewall for Virtual Infrastructure ที่ควบคุม Traffic ระหว่าง VM",
      "ตั้ง NAT แบบ Pinholing ให้แต่ละ VM แยก Public IP กัน",
      "ให้ VM ทุกเครื่องเชื่อมต่อกันผ่าน SSL Portal VPN"
    ],
    a: 1,
    why: "Firewall สำหรับ Virtual Infrastructure ควบคุม Traffic ระหว่าง Virtual Machines/Virtual Networks ช่วยกรณี VM หนึ่งถูกโจมตีแล้วโจมตี VM อื่นในระบบเดียวกัน",
    w: [
      "Traffic ไม่ผ่าน Perimeter Firewall จึงตั้ง Rule ที่นั่นไม่มีผล",
      null,
      "NAT ไม่ใช่ Security Control และไม่ได้ควบคุม Traffic ระหว่าง VM",
      "SSL Portal VPN ใช้ให้ผู้ใช้ภายนอกเข้าบริการผ่านเว็บ ไม่ได้กรอง Traffic ระหว่าง VM"
    ]
  },
  {
    id: "w12-10", type: "U", topic: "Unified Threat Management (UTM)",
    q: "ข้อใดอธิบาย UTM ได้ถูกต้องที่สุด",
    c: [
      "Firewall ที่ออกแบบมาเพื่อควบคุม Traffic ระหว่าง Virtual Machine โดยเฉพาะ",
      "ระบบที่ตรวจตัวตนและสุขภาพเครื่องของผู้ใช้ก่อนอนุญาตให้เข้าใช้ Network",
      "การรวม Firewall, Antivirus, IDS/IPS, Web Filter, VPN ฯลฯ ไว้ในระบบเดียว",
      "มาตรฐานด้านความปลอดภัยที่กำหนดว่าองค์กรต้องติดตั้ง Firewall"
    ],
    a: 2,
    why: "UTM รวมความสามารถหลายอย่างไว้ใน Appliance เดียว ช่วยให้จัดการง่ายและลดจำนวนอุปกรณ์",
    w: [
      "นี่คือ Virtual Firewall",
      "นี่คือ NAC",
      null,
      "มาตรฐานที่กำหนดเรื่อง Firewall เช่น PCI DSS ไม่ใช่ UTM"
    ]
  },
  {
    id: "w12-11", type: "U", topic: "Limitations of Firewall Inspection",
    q: "Firewall พบ Traffic เข้ารหัสที่ไม่ได้รับอนุญาตและไม่สามารถตรวจเนื้อหาภายในได้ หลักการที่ถูกต้องคือข้อใด",
    c: [
      "ปล่อยผ่านทั้งหมด เพราะ Traffic ที่ถูกเข้ารหัสถือว่าปลอดภัยและไม่ต้องตรวจ",
      "Firewall จะถอดรหัสและตรวจเนื้อหาได้เองเสมอโดยไม่ต้องตั้งค่า",
      "ให้ Firewall ตัดสินเองตามค่าเริ่มต้นที่ผู้ผลิตกำหนดมา",
      "กำหนด Policy ล่วงหน้าว่าจะ Allow, Block หรือส่งไปตรวจ/ถอดรหัสก่อน"
    ],
    a: 3,
    why: "Firewall ป้องกันได้ดีเฉพาะ Traffic ที่ตรวจและเข้าใจได้ Encrypted/Tunneled Traffic จึงต้องมี Policy ล่วงหน้า ไม่ควรปล่อยให้ตัดสินแบบไม่มี Policy",
    w: [
      "การเข้ารหัสไม่ได้แปลว่าเนื้อหาไม่อันตราย อาจซ่อน Malicious Traffic ไว้",
      "Firewall มักเห็นได้แค่ Header เช่น IP/Port/Protocol ไม่ได้เห็น Payload",
      "บทเรียนเน้นว่าไม่ควรปล่อยให้ Firewall ตัดสินโดยไม่มี Policy",
      null
    ]
  },
  {
    id: "w12-12", type: "U", topic: "NAT ไม่ใช่ Firewall",
    q: "ผู้ดูแลระบบกล่าวว่า \"เรามี NAT แล้ว เครื่องข้างในจึงปลอดภัย ไม่จำเป็นต้องมี Firewall\" ข้อโต้แย้งใดถูกต้องตามบทเรียน",
    c: [
      "ถูกต้อง เพราะ NAT ซ่อน Private IP ทั้งหมด ผู้โจมตีจากภายนอกจึงไม่มีทางเข้าถึงเครื่องข้างใน",
      "NAT แปลง Address/Port แต่ไม่ได้ตัดสินว่า Traffic ใดอนุญาต — นั่นเป็นหน้าที่ของ Firewall",
      "ถูกต้อง หาก NAT เป็นแบบ Many-to-One เพราะทุกเครื่องใช้ Public IP เดียวกัน",
      "NAT ปลอดภัยกว่า Firewall เพราะไม่มี Rule ให้ผู้ดูแลตั้งค่าผิดพลาด"
    ],
    a: 1,
    why: "บทเรียนเน้นว่า NAT ควรมองเป็น Routing/Address Translation ไม่ใช่ Security Control — \"NAT = แปลง Address/Port, Firewall = บังคับใช้ Security Policy\"",
    w: [
      "การซ่อน Private IP ไม่ได้แทนการตัดสิน Allow/Block ตาม Policy",
      null,
      "รูปแบบ NAT ไม่เปลี่ยนความจริงที่ว่า NAT ไม่ใช่ Firewall",
      "การไม่มี Rule หมายถึงไม่มีการบังคับใช้ Policy เลย"
    ]
  },
  {
    id: "w12-13", type: "A", topic: "Outbound Filtering & STRIDE",
    q: "องค์กรตั้ง Firewall ให้ Block Traffic ขาออกที่มี Source IP ไม่ใช่ช่วง IP ขององค์กร (เช่น เครื่องภายในส่ง Packet ด้วย Source 192.168.100.50 ทั้งที่องค์กรใช้ 10.10.10.0/24) มาตรการนี้ป้องกันภัยคุกคามใดตาม STRIDE",
    c: [
      "Tampering",
      "Repudiation",
      "Spoofing",
      "Elevation of Privilege"
    ],
    a: 2,
    why: "การอนุญาตเฉพาะ Source IP ที่องค์กรใช้จริงช่วยป้องกัน IP Spoofing ซึ่งคือการปลอมแปลงตัวตน/Source Address — STRIDE = Spoofing",
    w: [
      "Tampering คือการแก้ไขข้อมูลโดยไม่ได้รับอนุญาต",
      "Repudiation คือการปฏิเสธการกระทำ",
      null,
      "Elevation of Privilege คือการยกระดับสิทธิ์"
    ]
  },
  {
    id: "w12-14", type: "R", topic: "Centralized Management ของ Personal Firewall",
    q: "ในสภาพแวดล้อม Windows Domain/Active Directory ควรใช้สิ่งใดจัดการ Windows Defender Firewall บนเครื่องผู้ใช้จำนวนมากจากส่วนกลาง",
    c: [
      "Group Policy (GPO)",
      "NAT Pinholing",
      "SSL Portal",
      "Network TAP"
    ],
    a: 0,
    why: "Group Policy ช่วยสร้าง แจก บังคับใช้ และแก้ไข Policy ของ Personal Firewall จากส่วนกลาง",
    w: [
      null,
      "Pinholing เป็นการกำหนดการส่งต่อ Port ของ NAT",
      "SSL Portal เป็นหน้า Web ของ SSL VPN",
      "Network TAP ใช้คัดลอก Traffic ให้ IDPS Sensor"
    ]
  },
  {
    id: "w12-15", type: "U", topic: "Compliance Checking",
    q: "Firewall ตรวจพบว่าเครื่องหนึ่งไม่เป็นไปตาม Security Policy แต่ยังปล่อยให้เครื่องนั้นติดต่อ Server สำคัญได้ตามปกติ ข้อใดสรุปได้ถูกต้อง",
    c: [
      "ถือว่าเพียงพอแล้ว เพราะได้บันทึกไว้ใน Log ว่าเครื่องนั้นไม่เป็นไปตาม Policy",
      "ถือว่าเพียงพอ ถ้าเครื่องนั้นอยู่ใน Internal Network ที่เชื่อถือได้",
      "ควรเปลี่ยนไปใช้ NAT แทนเพื่อซ่อนเครื่องที่ไม่เป็นไปตาม Policy",
      "ยังไม่ได้ป้องกันจริง ต้องสามารถ Block การสื่อสารที่เป็นอันตรายได้ด้วย"
    ],
    a: 3,
    why: "บทเรียนระบุว่าการตรวจสอบอย่างเดียวไม่พอ ต้องสามารถ Block การสื่อสารที่เป็นอันตรายได้ด้วย",
    w: [
      "การตรวจพบโดยไม่ดำเนินการใด ๆ ไม่ได้ลดความเสี่ยง",
      "ภัยจากภายใน (Internal Threat) ก็อันตราย การอยู่ใน Internal Network ไม่ได้ทำให้ปลอดภัย",
      "NAT ไม่ใช่ Security Control",
      null
    ]
  },
  {
    id: "w12-16", type: "A", topic: "DMZ",
    q: "บริษัทมี Web Server ที่ลูกค้าต้องเข้าจาก Internet และ Database ที่เก็บข้อมูลลูกค้าซึ่งมีเพียง Web Server ที่ต้องเรียกใช้ การจัดวางใดเหมาะสมที่สุด",
    c: [
      "วางทั้ง Web Server และ Database ไว้ใน DMZ เดียวกันเพื่อให้ติดต่อกันได้เร็ว",
      "Web Server ใน DMZ, Database ใน Internal Network โดยมี Firewall คั่นและเปิดเฉพาะที่จำเป็น",
      "วาง Web Server ใน Internal Network แล้วใช้ NAT ปกป้องแทนการใช้ Firewall",
      "วาง Database ไว้นอก Firewall ร่วมกับ Web Server เพื่อให้เข้าถึงได้เร็วโดยไม่มี Latency"
    ],
    a: 1,
    why: "DMZ ใช้วาง Public-facing Services เช่น Web Server ส่วน Database ที่ไม่ควรให้ Internet เข้าโดยตรงอยู่ Internal Network หาก Web Server ถูกเจาะก็ยังมี Firewall คั่นก่อนถึงระบบภายใน",
    w: [
      "Database ไม่ใช่ Outward-facing Service ไม่ควรอยู่ใน DMZ",
      null,
      "Web Server ที่ต้องให้ Internet เข้าควรอยู่ DMZ และ NAT ไม่ใช่ Firewall",
      "Database ที่อยู่นอก Firewall เสี่ยงต่อการถูกเข้าถึงจาก Internet โดยตรง"
    ]
  },
  {
    id: "w12-17", type: "A", topic: "NAT Mapping & Pinholing",
    q: "Web Server อยู่ที่ 192.168.1.10 หลัง NAT ซึ่งมี Public IP 203.0.113.10 ผู้ใช้จาก Internet เข้าเว็บไม่ได้เพราะ NAT ไม่รู้จะส่ง Request ไปเครื่องใด ควรตั้งค่าอย่างไร",
    c: [
      "Pinholing: ให้ 203.0.113.10:443 ส่งต่อไป 192.168.1.10:443",
      "ตั้ง NAT แบบ Many-to-One เพิ่มอีกหนึ่งชั้นไว้หน้า Web Server",
      "ปิด Firewall ชั่วคราวเพื่อให้ Request ผ่านเข้ามาได้",
      "เปิด Session Sniping บน Firewall สำหรับ Port 443"
    ],
    a: 0,
    why: "ปกติ NAT Mapping เกิดจากเครื่องด้านในเริ่ม Connection ออกไปก่อน คนนอกจึงเริ่ม Connection เข้ามาไม่ได้ Pinholing คือการกำหนดว่า Port ด้าน Public ให้ส่งไป Host ด้านในตัวใด",
    w: [
      null,
      "Many-to-One คือหลาย Private IP ออกไปทาง Public IP เดียว ไม่ได้สร้าง Mapping ขาเข้า",
      "การปิด Firewall ทำลายการควบคุมความปลอดภัย และ NAT ก็ยังไม่มี Mapping",
      "Session Sniping เป็นวิธีป้องกันของ Passive IDPS ไม่เกี่ยวกับ NAT"
    ]
  },
  {
    id: "w12-18", type: "U", topic: "Multiple Layers of Firewalls",
    q: "ข้อใดสรุปการใช้ Firewall หลายชั้นได้ถูกต้องที่สุด",
    c: [
      "ยิ่งมี Firewall มากยิ่งปลอดภัยเสมอ และไม่มีข้อเสียด้านการบริหารจัดการ",
      "Firewall หลายชั้นใช้แทน Security Policy ได้ เพราะแต่ละชั้นช่วยกรองและตรวจสอบกันเองอัตโนมัติ",
      "ได้ Defense-in-Depth แต่แลกกับความซับซ้อน เช่น หลาย Ruleset และ Troubleshooting ยากขึ้น",
      "ควรใช้ Firewall ชั้นเดียวเท่านั้น เพื่อให้ Policy สอดคล้องกันทั้งองค์กร"
    ],
    a: 2,
    why: "หลายชั้นช่วยให้ถ้าชั้นแรกถูกผ่านยังมีชั้นถัดไป แต่ไม่ได้แปลว่ายิ่งเยอะยิ่งดี เพราะความซับซ้อนในการบริหารและ Troubleshooting เพิ่มขึ้น",
    w: [
      "บทเรียนระบุชัดว่ามีข้อเสียเรื่องความซับซ้อน",
      "Firewall ทุกตัวยังต้องมี Policy เป็นฐาน",
      null,
      "บทเรียนสนับสนุน Defense-in-Depth ไม่ได้ให้ใช้ชั้นเดียว"
    ]
  },
  {
    id: "w12-19", type: "R", topic: "Firewall Policy: Risk Analysis",
    q: "ก่อนกำหนด Firewall Policy ต้องทำ Risk Analysis โดยพิจารณา 4 องค์ประกอบใด",
    c: [
      "Threats, Vulnerabilities, Countermeasures, Impact",
      "Plan, Configure, Test, Deploy",
      "Identify, Protect, Detect, Respond",
      "Damage, Reproducibility, Exploitability, Discoverability"
    ],
    a: 0,
    why: "Risk Analysis พิจารณา Threats (ภัย), Vulnerabilities (ช่องโหว่), Countermeasures (มาตรการ) และ Impact (ผลกระทบ)",
    w: [
      null,
      "นี่คือบางขั้นของ Firewall Lifecycle",
      "นี่คือบางส่วนของ NIST CSF Core",
      "นี่คือบางส่วนของ DREAD"
    ]
  },
  {
    id: "w12-20", type: "U", topic: "Deny by Default / Whitelist",
    q: "นโยบายที่ \"Block ทุก Traffic เป็นค่าเริ่มต้น แล้วอนุญาตเฉพาะ Traffic ที่จำเป็น\" เรียกว่าอะไร",
    c: [
      "Blacklist Policy (ห้ามเฉพาะรายการที่กำหนด)",
      "Permissive Policy (Allow by Default)",
      "Whitelist Policy (Deny by Default)",
      "Network Activity Policy (Rate-based)"
    ],
    a: 2,
    why: "Whitelist กำหนดรายการที่อนุญาตไว้ก่อน ส่วนที่ไม่อยู่ในรายการจะถูกปฏิเสธ สัมพันธ์กับหลัก Deny by Default",
    w: [
      "Blacklist กำหนดสิ่งที่ห้าม ส่วนที่ไม่ถูกห้ามอาจผ่านได้",
      "ตรงข้ามกับหลักที่โจทย์อธิบาย",
      null,
      "Network Activity Policy พิจารณา Idle Time, Request Rate, Source Attributes"
    ]
  },
  {
    id: "w12-21", type: "A", topic: "IP Address / Protocol Policy",
    q: "ผู้ดูแลตั้ง Rule อย่างเข้มงวดเฉพาะ IPv4 แต่เครื่องในองค์กรเปิดใช้ IPv6 อยู่และไม่มี Rule สำหรับ IPv6 เลย ความเสี่ยงหลักคืออะไร",
    c: [
      "ไม่มีความเสี่ยง เพราะ IPv6 ยังไม่ถูกใช้งานจริงบน Internet ในปัจจุบัน",
      "Firewall จะทำงานช้าลงเท่านั้น แต่ความปลอดภัยไม่เปลี่ยน",
      "IPv6 จะถูก NAT แปลงเป็น IPv4 อัตโนมัติจึงถูกควบคุมแล้ว",
      "เกิดช่องทางเข้าถึงที่ไม่ได้ตั้งใจผ่าน IPv6 ซึ่งไม่ถูกควบคุม"
    ],
    a: 3,
    why: "บทเรียนระบุว่าต้องดูทั้ง IPv4 และ IPv6 หากควบคุมเฉพาะ IPv4 แต่ปล่อย IPv6 อาจเกิดช่องทางที่ไม่ตั้งใจให้เข้าถึงได้",
    w: [
      "IPv6 ใช้งานได้จริงและอาจเป็นช่องทางเข้าถึง",
      "ปัญหาหลักคือความปลอดภัย ไม่ใช่ประสิทธิภาพ",
      "NAT ไม่ได้ทำหน้าที่ป้องกัน และไม่ได้แปลง IPv6 เป็น IPv4 โดยอัตโนมัติ",
      null
    ]
  },
  {
    id: "w12-22", type: "A", topic: "ประเภทของ Firewall Policy",
    q: "บริษัทต้องการให้เฉพาะพนักงานฝ่าย IT เข้าถึง Server สำหรับบริหารระบบได้ ไม่ว่าจะใช้เครื่องใดหรือได้ IP อะไร และต้องการตัด Session ที่ไม่มีการใช้งานเกิน 15 นาที ควรใช้ Policy ประเภทใดตามลำดับ",
    c: [
      "IP Address Policy และ Application-based Policy",
      "User Identity Policy และ Network Activity Policy",
      "Application-based Policy และ IP Address Policy",
      "Network Activity Policy และ User Identity Policy"
    ],
    a: 1,
    why: "การกำหนดสิทธิ์ตามตัวตนผู้ใช้ (ไม่ผูกกับ IP) คือ User Identity Policy ส่วน Session Idle Period เป็นส่วนของ Network Activity Policy",
    w: [
      "IP Address Policy ผูกกับ IP ซึ่งขัดกับความต้องการที่ไม่ขึ้นกับ IP และ Idle Time ไม่ใช่ Application Policy",
      null,
      "ทั้งสองไม่ตรงกับความต้องการเรื่องตัวตนผู้ใช้และ Idle Time",
      "สลับลำดับกัน"
    ]
  },
  {
    id: "w12-23", type: "U", topic: "Plan: ใช้อุปกรณ์ให้ตรงหน้าที่",
    q: "เหตุใดบทเรียนจึงไม่แนะนำให้นำ Router มาทำ Filtering ที่ซับซ้อนมาก",
    c: [
      "เพราะ Router ไม่สามารถอ่านข้อมูลใน IP Header เพื่อใช้ทำ Filtering ได้",
      "เพราะ Router เน้นงาน Routing การเพิ่ม Rule ซับซ้อนจะเพิ่มภาระ CPU",
      "เพราะ Router ที่ทำ Filtering จะไม่สามารถทำ NAT ได้อีกต่อไป",
      "เพราะมาตรฐาน PCI DSS ห้ามใช้ Router ทำ Filtering ทุกกรณี"
    ],
    a: 1,
    why: "หลัก \"ใช้อุปกรณ์ให้ตรงหน้าที่\" — Router เน้น Routing, Firewall เน้น Security/Filtering จะบริหารง่ายและลดปัญหา Performance",
    w: [
      "Router อ่าน IP Header ได้ (จำเป็นต่อการ Route)",
      null,
      "ประเด็นไม่ได้อยู่ที่ NAT",
      "บทเรียนไม่ได้กล่าวถึงข้อห้ามทางกฎหมาย"
    ]
  },
  {
    id: "w12-24", type: "A", topic: "Plan: Internal Threat",
    q: "เครื่องพนักงานใน User Network ติดมัลแวร์แล้วพยายามเชื่อมต่อ Database Server ภายในโดยตรง ขณะที่ Edge Firewall ตั้งค่าไว้อย่างดี แนวทางใดลดความเสี่ยงนี้ได้ตรงจุดที่สุด",
    c: [
      "เพิ่ม Rule ที่ Edge Firewall ให้เข้มงวดขึ้นสำหรับ Traffic จาก Internet",
      "เพิ่ม Bandwidth ระหว่าง User Network กับ Server Network",
      "ใช้ Internal Firewall แบ่ง User Network ออกจาก Server/Database Network",
      "ย้าย Database ไปไว้ใน DMZ เพื่อแยกออกจาก User Network"
    ],
    a: 2,
    why: "Traffic จาก User PC ไป Database อาจไม่ผ่าน Edge Firewall เลย จึงต้องมี Internal Firewall คั่นระบบสำคัญ เพราะเครื่องภายในที่ถูกยึดก็เป็นแหล่งโจมตีได้",
    w: [
      "Traffic ภายในไม่ผ่าน Edge Firewall การแก้ Rule ที่นั่นจึงไม่ช่วย",
      "Bandwidth ไม่เกี่ยวกับการควบคุมการเข้าถึง",
      null,
      "DMZ มีไว้สำหรับ Public-facing Services การย้าย Database ไปที่นั่นเพิ่มความเสี่ยง"
    ]
  },
  {
    id: "w12-25", type: "R", topic: "Plan: ปัจจัยในการเลือก Firewall",
    q: "เมื่อเลือก Firewall แบบ Hardware การตรวจสอบพื้นที่ติดตั้ง ไฟฟ้า/UPS ระบบระบายความร้อน และระบบป้องกันอัคคีภัย จัดอยู่ในปัจจัยใด",
    c: [
      "Integration",
      "Personnel",
      "Future Needs",
      "Physical Environment"
    ],
    a: 3,
    why: "Physical Environment ครอบคลุมพื้นที่ ไฟฟ้า UPS Cooling และ Fire Protection",
    w: [
      "Integration คือการทำงานร่วมกับระบบอื่น เช่น Router, SIEM, Authentication Server",
      "Personnel คือคนดูแลมีทักษะเพียงพอหรือไม่",
      "Future Needs คือรองรับการขยายในอนาคตหรือไม่",
      null
    ]
  },
  {
    id: "w12-26", type: "U", topic: "Configure: Port Filtering vs Content Filtering",
    q: "ตามแนวทางของบทเรียน ควรวาง Port Filtering และ Content Filtering ไว้ที่ใด",
    c: [
      "Port Filtering ที่ Edge (และอาจเพิ่มภายใน) ส่วน Content Filtering ใกล้ผู้รับ Content",
      "ทั้งสองอย่างต้องอยู่ที่ Network Edge เท่านั้น เพื่อให้จัดการได้จากจุดเดียวทั้งองค์กร",
      "Port Filtering ใกล้ผู้รับ Content ส่วน Content Filtering ที่ Network Edge",
      "Content Filtering ทำบนเครื่องผู้ส่ง ส่วน Port Filtering ทำบนเครื่องผู้รับ"
    ],
    a: 0,
    why: "Port Filtering ทำที่ Edge และอาจทำภายในเพิ่ม ส่วน Content Filtering ควรอยู่ใกล้ผู้รับ Content เพื่อตรวจเนื้อหาก่อนถึงระบบปลายทาง",
    w: [
      null,
      "บทเรียนแยกตำแหน่งของทั้งสองอย่างไว้ต่างกัน",
      "สลับตำแหน่งกัน",
      "บทเรียนระบุให้ใกล้ผู้รับ ไม่ใช่ผู้ส่ง"
    ]
  },
  {
    id: "w12-27", type: "A", topic: "Configure: Logging and Alerts",
    q: "เวลา 03:00 น. Firewall ตัว Active ใน HA หยุดทำงาน และตัว Standby กลายเป็น Active โดยระบบยังให้บริการได้ ผู้ดูแลควรได้รับ Alert หรือไม่ เพราะเหตุใด",
    c: [
      "ไม่ต้อง เพราะบริการยังใช้งานได้ตามปกติ ผู้ใช้จึงไม่ได้รับผลกระทบใด ๆ เลย",
      "ไม่ต้อง เพราะเป็นพฤติกรรมปกติของ HA ที่ออกแบบไว้แล้ว",
      "ต้อง เพราะการเปลี่ยนสถานะของ Secondary System ต้องแจ้งเตือนเพื่อหาสาเหตุ",
      "ต้อง เพราะ Firewall ควรแจ้งเตือนทุก Packet ที่ผ่านในช่วงนั้น"
    ],
    a: 2,
    why: "บทเรียนระบุเหตุการณ์ที่ควร Alert เช่น Rule ถูกแก้/Disable, Reboot, Disk เต็ม, Operational Error และ Secondary System เปลี่ยนสถานะ",
    w: [
      "แม้บริการยังทำงาน แต่ตัวหลักเสียแล้ว ต้องรู้เพื่อแก้ไขก่อนไม่มีตัวสำรอง",
      "แม้เป็นกลไก HA แต่บทเรียนกำหนดให้แจ้งเตือนเมื่อ Secondary เปลี่ยนสถานะ",
      null,
      "การแจ้งเตือนทุก Packet ไม่ใช่แนวทางของบทเรียนและทำให้ Alert ไร้ประโยชน์"
    ]
  },
  {
    id: "w12-28", type: "A", topic: "Test: Test Network",
    q: "ทีมงานต้องการประหยัดเวลา จึงเสนอให้ต่อ Firewall ใหม่เข้ากับ Production Network แล้วทดลอง Rule จริงไปพร้อมกัน แนวทางที่ถูกต้องคือข้อใด",
    c: [
      "ทำได้ ถ้าทดลองนอกเวลาทำการและเตรียม Rollback ไว้ล่วงหน้า",
      "ทำได้ ถ้าเปิด Logging ละเอียดไว้เพื่อย้อนดูเมื่อเกิดปัญหา",
      "ใช้ Test Network ที่แยกจาก Production แต่จำลอง Topology/Traffic/Application ให้ใกล้เคียง",
      "ทดสอบบน Production ก่อนในช่วงสั้น ๆ แล้วค่อยสร้าง Test Network แยกไว้ใช้ในการติดตั้งครั้งหน้า"
    ],
    a: 2,
    why: "บทเรียนระบุ \"ห้ามเอา Firewall ใหม่ไปต่อ Production แล้วค่อยทดลอง\" Test Network ต้องไม่มี Connection กับ Production แต่จำลองให้ใกล้เคียงที่สุด",
    w: [
      "Rule ที่ผิดยังกระทบระบบจริงได้แม้นอกเวลาทำการ",
      "Logging ช่วยตรวจสอบ แต่ไม่ป้องกันผลกระทบต่อ Production",
      null,
      "ลำดับผิด ต้องทดสอบก่อนนำเข้า Production"
    ]
  },
  {
    id: "w12-29", type: "U", topic: "Test: Ruleset",
    q: "ในขั้น Test ทำไมการตรวจ Ruleset จึงต้องทำทั้ง Manual Review และ Actual Traffic Test",
    c: [
      "เพราะ Rule ที่อ่านแล้วดูถูกต้อง อาจทำงานไม่ตรงที่ตั้งใจเมื่อเจอ Traffic จริง",
      "เพราะ Actual Traffic Test ทำให้ไม่จำเป็นต้องมี Firewall Policy อีก",
      "เพราะ Manual Review ใช้ตรวจ Performance ของ Firewall ส่วน Actual Test ใช้ตรวจเฉพาะ Log",
      "เพราะมาตรฐานกฎหมายกำหนดให้ทดสอบทุก Rule อย่างน้อยสองครั้ง"
    ],
    a: 0,
    why: "ต้องยืนยันว่า Traffic ที่ Policy อนุญาตผ่านได้จริงและที่ไม่อนุญาตถูก Block จริง การอ่าน Ruleset อย่างเดียวไม่รับประกันผลการทำงาน",
    w: [
      null,
      "Policy ยังเป็นฐานของการทดสอบเสมอ",
      "Performance Test เป็นอีกหัวข้อหนึ่ง",
      "บทเรียนไม่ได้อ้างข้อกำหนดทางกฎหมาย"
    ]
  },
  {
    id: "w12-30", type: "A", topic: "Test: Policy Synchronization",
    q: "องค์กรมี Firewall 2 ตัวที่ Sync Policy กัน การทดสอบใดสำคัญที่สุดสำหรับหัวข้อ Policy Synchronization",
    c: [
      "ทดสอบว่า Firewall ทั้งสองใช้ Firmware และรุ่นเดียวกัน",
      "ทดสอบว่าเมื่อตัวหนึ่ง Offline แล้ว Policy ยังถูกต้องและระบบยังทำงานได้",
      "ทดสอบความเร็ว Internet ของผู้ใช้ในช่วงเวลาเร่งด่วน",
      "ทดสอบว่า Firewall ทั้งสองตัวตั้งค่า NAT แบบเดียวกันครบทุก Interface"
    ],
    a: 1,
    why: "Policy Synchronization ต้องทดสอบกรณีอุปกรณ์ตัวหนึ่ง Offline ว่าอีกตัวยังมี Policy ถูกต้องและทำงานได้",
    w: [
      "รุ่น/Firmware เดียวกันไม่ได้ยืนยันว่า Policy Sync ทำงานถูกต้องเมื่ออุปกรณ์ล้มเหลว",
      null,
      "ความเร็ว Internet เป็นเรื่อง Performance ไม่ใช่ Policy Sync",
      "NAT ไม่ใช่ประเด็นของการ Sync Security Policy"
    ]
  },
  {
    id: "w12-31", type: "A", topic: "Deploy: Phased Deployment",
    q: "บริษัทจะติดตั้ง Firewall ใหม่ที่สำนักงานใหญ่และสาขาอีก 20 แห่ง แผนใดเหมาะสมที่สุด",
    c: [
      "Deploy ทุกสาขาพร้อมกันในคืนเดียว เพื่อให้เวลาหยุดชะงักโดยรวมสั้นที่สุด",
      "Deploy ที่สาขาที่ไกลที่สุดก่อนโดยไม่ต้องแจ้งผู้ใช้ล่วงหน้า",
      "Phased/Pilot: เริ่มจุดทดลอง ตรวจปัญหา แก้ไข แล้วค่อยขยายทั้งองค์กร",
      "ข้ามขั้นตอน Test เพราะ Firewall ทุกตัวเป็นรุ่นเดียวกันหมด"
    ],
    a: 2,
    why: "เมื่อมีหลาย Firewall ไม่ควร Deploy พร้อมกัน ควรใช้ Phased Deployment/Pilot เพื่อเจอปัญหา (เช่น Policy Conflict) เร็วและจำกัดผลกระทบ",
    w: [
      "ถ้ามีปัญหาจะกระทบทุกสาขาพร้อมกัน",
      "ก่อน Deploy ต้องแจ้ง Users/System Owners และช่องทาง Report ปัญหา",
      null,
      "ต้อง Test ก่อน Deploy เสมอ"
    ]
  },
  {
    id: "w12-32", type: "U", topic: "Deploy: การเตรียมก่อน Deploy",
    q: "ข้อใดไม่ใช่สิ่งที่ควรทำก่อน Deploy Firewall เข้า Production ตามบทเรียน",
    c: [
      "แจ้ง Users/System Owners และช่องทางสำหรับแจ้งปัญหา",
      "ประสานงานกับอุปกรณ์ Network อื่น เช่น Router, Switch, DNS, VPN",
      "นำ Firewall Policy เข้าเป็นส่วนหนึ่งของ Organization Security Policy และ Configuration Management",
      "แยก Firewall Policy ออกจาก Security Policy ขององค์กรเพื่อให้แก้ไขได้อิสระ"
    ],
    a: 3,
    why: "Firewall Configuration ต้องสอดคล้องกับ Overall Security Policy และผ่าน Configuration Management ไม่ควรแยกเป็นกฎต่างหาก",
    w: [
      "เป็นสิ่งที่ต้องทำก่อน Deploy",
      "เป็นสิ่งที่ต้องทำ เพราะ Firewall อาจทำให้ต้องแก้ Config ของอุปกรณ์อื่น",
      "เป็นสิ่งที่ต้องทำตามบทเรียน",
      null
    ]
  },
  {
    id: "w12-33", type: "A", topic: "Manage: Configuration Management",
    q: "Audit Log ของ Firewall แสดงว่า Rule \"Internet → TCP 22\" ถูกเปลี่ยนจาก Block เป็น Allow เมื่อเดือนก่อน แต่ไม่มีใครทราบว่าใครอนุมัติและเปลี่ยนเพราะอะไร ปัญหานี้สะท้อนว่าขาดสิ่งใด",
    c: [
      "Configuration Management ที่บันทึก Who/What/When/Why",
      "Performance Monitoring ของ CPU, Memory และ Throughput",
      "Network TAP สำหรับคัดลอก Traffic ไปวิเคราะห์",
      "Portal Customization ของหน้า Login ผู้ดูแล"
    ],
    a: 0,
    why: "Audit ของ Firewall อาจบอกแค่ว่า Rule ถูกแก้ แต่ไม่บอกเหตุผล จึงต้องมี Configuration/Change Management บันทึก Who/What/When/Why",
    w: [
      null,
      "Performance Monitoring ดู CPU/Memory/Throughput ไม่ได้บันทึกเหตุผลการเปลี่ยน Rule",
      "Network TAP ใช้คัดลอก Traffic",
      "Portal Customization เป็นเรื่องของ SSL VPN"
    ]
  },
  {
    id: "w12-34", type: "A", topic: "Manage: Review Policy",
    q: "ระหว่าง Review พบ Rule ที่เปิด Port ให้ Application ตัวหนึ่ง ซึ่งถูกยกเลิกใช้งานไปแล้วเมื่อปีที่แล้ว ควรทำอย่างไร",
    c: [
      "คงไว้ เผื่อมีการนำ Application กลับมาใช้งานอีก",
      "ลบ Rule ที่ไม่จำเป็นออก ผ่านกระบวนการ Change Management",
      "ย้าย Rule ไปไว้ท้ายสุดของ Ruleset เพื่อลดผลกระทบ",
      "รอให้ถึงรอบ Audit ประจำปี หรือเกิด Incident ก่อนจึงพิจารณา"
    ],
    a: 1,
    why: "ควร Review Policy เป็นประจำและลบ Rule เก่าที่ไม่จำเป็น เพราะ Rule ค้างเป็นช่องทางที่ไม่จำเป็น",
    w: [
      "การเปิด Port ที่ไม่ได้ใช้เพิ่มความเสี่ยงโดยไม่มีประโยชน์",
      null,
      "Rule ยังมีผลอยู่ไม่ว่าจะอยู่ตำแหน่งใด",
      "บทเรียนระบุว่าไม่ควรรอ Audit หรือ Incident แล้วค่อยตรวจ"
    ]
  },
  {
    id: "w12-35", type: "U", topic: "Manage: Penetration Testing vs Audit",
    q: "ข้อใดกล่าวถึง Penetration Testing ในการดูแล Firewall ได้ถูกต้อง",
    c: [
      "Pentest ใช้แทน Audit ได้ทั้งหมด เพราะทดสอบด้วย Traffic จริงซึ่งน่าเชื่อถือกว่าเอกสาร",
      "Pentest ใช้วัด Performance ของ Firewall ในช่วง Peak Load",
      "สร้าง Traffic จริงเพื่อเทียบ Expected กับ Actual Response และใช้ร่วมกับ Audit",
      "Pentest ควรทำบน Production ได้ทันทีโดยไม่ต้องขออนุญาต"
    ],
    a: 2,
    why: "Pentest ช่วยยืนยันว่า Firewall ตอบสนองตาม Policy จริง (เช่น TCP 23 ต้องถูก Block) แต่ใช้เพิ่มเติมจาก Audit ซึ่งตรวจการปฏิบัติตามนโยบายและหลักฐานการควบคุม",
    w: [
      "บทเรียนย้ำว่า Pentest ไม่ได้ใช้แทน Audit",
      "Pentest ใช้ตรวจว่า Rule ทำงานจริงตาม Policy ไม่ใช่ Performance",
      null,
      "Pentest ต้องทำในขอบเขตที่ได้รับอนุญาต"
    ]
  },
  {
    id: "w12-36", type: "R", topic: "Firewall Lifecycle",
    q: "ข้อใดเรียงลำดับ Firewall Planning and Implementation ได้ถูกต้อง",
    c: [
      "Plan → Test → Configure → Deploy → Manage",
      "Configure → Plan → Deploy → Test → Manage",
      "Plan → Configure → Test → Deploy → Manage",
      "Plan → Configure → Deploy → Test → Manage"
    ],
    a: 2,
    why: "Firewall Lifecycle คือ Plan → Configure → Test → Deploy → Manage และวนกลับเมื่อมีการเปลี่ยนแปลง โดย Manage เป็นขั้นที่ยาวที่สุด",
    w: [
      "ต้อง Configure ก่อนจึงจะ Test ได้",
      "ต้องวางแผนก่อน Configure และต้อง Test ก่อน Deploy",
      null,
      "Test ต้องเกิดก่อน Deploy เข้า Production"
    ]
  },
  {
    id: "w12-37", type: "R", topic: "Application Firewall: Web Content",
    q: "ความสามารถใดของ Application Firewall ที่ใช้ตัดสิน Allow/Block หน้าเว็บตาม Web Content",
    c: [
      "ตรวจ Content เช่น Java/ActiveX และตรวจ SSL Certificate ว่าออกโดย CA ที่ไม่ยอมรับหรือไม่",
      "ตรวจเฉพาะ Source IP และ Destination Port ของแต่ละ Packet โดยไม่จำ State ของ Connection",
      "ตรวจสุขภาพเครื่องของผู้ใช้ เช่น Antivirus และ Patch ก่อนให้เข้า Network",
      "ตรวจ Traffic ระหว่าง Virtual Machine บน Physical Server เดียวกัน"
    ],
    a: 0,
    why: "Application Firewall สามารถ Allow/Block Web Page ตามลักษณะของ Content เช่น Java, ActiveX และตรวจ SSL Certificate ว่าออกโดย CA ที่ไม่ยอมรับหรือไม่",
    w: [
      null,
      "นี่คือ Packet Filtering (Stateless)",
      "นี่คือ Health Check ของ NAC",
      "นี่คือ Firewall for Virtual Infrastructure"
    ]
  },
  {
    id: "w12-38", type: "R", topic: "Firewall Placement & Compliance",
    q: "มาตรฐานใดที่บทเรียนยกตัวอย่างว่าบางองค์กรจำเป็นต้องมี Firewall ตามข้อกำหนด",
    c: [
      "ISO 17788",
      "PCI DSS",
      "IETF RFC",
      "FIPS 140-2"
    ],
    a: 1,
    why: "บทเรียนระบุว่าบางองค์กรต้องมี Firewall ตามข้อกำหนดของมาตรฐานหรือกฎหมาย เช่น PCI DSS",
    w: [
      "ISO 17788 เป็นคำศัพท์ของ Cloud",
      null,
      "RFC เป็นรูปแบบเอกสารมาตรฐานของ IETF ไม่ใช่ข้อกำหนดให้ต้องมี Firewall",
      "FIPS 140-2 เกี่ยวกับ Cryptographic Module ซึ่งบทเรียนกล่าวถึงใน SSL VPN"
    ]
  }
]);
