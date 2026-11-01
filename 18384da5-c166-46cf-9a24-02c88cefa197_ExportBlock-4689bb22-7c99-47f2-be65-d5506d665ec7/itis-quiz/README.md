# ITIS Quiz — แบบทดสอบทบทวนรายวิชา Information Technology Infrastructure Security

เว็บไซต์แบบทดสอบออนไลน์สำหรับทบทวนเนื้อหารายสัปดาห์ สร้างจากไฟล์สรุปเนื้อหา
`ITIS (Information Technology Infrastructure Securi ….md` ข้อสอบเป็นปรนัย 4 ตัวเลือกทั้งหมด **188 ข้อ** ใน **6 Week** ตามที่มีอยู่ในเอกสาร

## วิธีเปิดใช้งาน

ไม่ต้องติดตั้งอะไร ไม่มี Backend ไม่ต้อง Login และไม่ต้อง Build

1. ดับเบิลคลิก `index.html` เพื่อเปิดในเบราว์เซอร์ (Chrome, Edge, Firefox, Safari)
2. หรือถ้าต้องการเปิดผ่าน Local Server (เช่น เปิดจากมือถือในวง LAN เดียวกัน):
   ```bash
   cd itis-quiz
   python -m http.server 8000
   # แล้วเปิด http://localhost:8000
   ```

> ฟอนต์ IBM Plex Sans Thai โหลดจาก Google Fonts ถ้าออฟไลน์จะใช้ฟอนต์ภาษาไทยของระบบแทน ใช้งานได้ตามปกติ

## ฟังก์ชันหลัก

| ส่วน | รายละเอียด |
| --- | --- |
| หน้าหลัก (Dashboard) | ชื่อรายวิชา, จำนวน Week, จำนวนข้อสอบ, ความคืบหน้า, คะแนนเฉลี่ย/สูงสุด, คะแนนแยกตาม Week, ผลล่าสุด |
| เลือก Week | การ์ดแต่ละ Week พร้อมหัวข้อสำคัญ จำนวนข้อ (แยกประเภท) คะแนนล่าสุด และสถานะ |
| โหมดฝึก | **Practice by Week**, **All Weeks**, **Random Quiz** (เลือก Week/จำนวนข้อ), **Review Incorrect Answers**, **Mock Exam** (สุ่มตามสัดส่วนทุก Week + จับเวลา + ไม่แสดงเฉลยจนกว่าจะส่ง) |
| หน้าทำข้อสอบ | ทีละข้อ, ตัวเลือก A–D, เปลี่ยนคำตอบได้ก่อนส่ง, แถบความคืบหน้า "ข้อ 5/20", ปุ่มก่อนหน้า/ถัดไป, ตารางข้อ (สีแยกตอบแล้ว/ยังไม่ตอบ/ทำเครื่องหมาย), ไปข้อที่ยังไม่ตอบ, ยืนยันก่อนส่ง, คีย์ลัด A–D / 1–4 / ← → |
| เฉลยทันที (ไม่บังคับ) | ในโหมดฝึก เลือก "ดูเฉลยทันทีทีละข้อ" ได้ (Mock Exam ปิดตัวเลือกนี้เสมอ) |
| ผลคะแนนและเฉลย | คะแนนรวม, ถูก/ผิด/ไม่ได้ตอบ, %, คะแนนแยก Week และแยกประเภทข้อสอบ, หัวข้อที่ควรทบทวน, เฉลยพร้อมเหตุผลว่าทำไมถูก และทำไมตัวเลือกอื่นผิด, ทำซ้ำชุดเดิม/ทำซ้ำเฉพาะข้อที่ผิด |
| ระบบบันทึกผล | LocalStorage: ประวัติ 60 ครั้งล่าสุด, สถิติรายข้อ, รายการข้อที่ตอบผิด, ชุดที่ทำค้าง (Refresh แล้วทำต่อได้) |
| อื่น ๆ | Responsive (Desktop/Tablet/Mobile), ธีมสว่าง/มืด, ลบข้อมูลทั้งหมดได้ที่หน้าประวัติ |

**กติกาของ Review Incorrect Answers:** ข้อที่ตอบผิดจะถูกเพิ่มในรายการ และถูกนำออกเมื่อตอบถูกในครั้งถัดไป
ข้อที่ข้ามไปในโหมดฝึกไม่นับว่าผิด แต่ข้อที่ไม่ได้ตอบใน Mock Exam จะถูกเพิ่มในรายการทบทวน

**การสลับตัวเลือก:** ตำแหน่ง A–D ถูกสลับใหม่ทุกครั้งที่เริ่มชุดข้อสอบ ระบบตรวจคำตอบจาก index ของตัวเลือกต้นฉบับ จึงตรวจได้ถูกต้องเสมอ

## สรุปจำนวนข้อสอบ

จำนวนข้อของแต่ละ Week กำหนดตามปริมาณและความซับซ้อนของเนื้อหา (Firewall และ VPN มีเนื้อหามากที่สุดจึงมีข้อสอบมากที่สุด)

| Week | หัวข้อ | รวม | ความจำ | ความเข้าใจ | วิเคราะห์/แก้ปัญหา |
| --- | --- | ---: | ---: | ---: | ---: |
| Week 6 | Malicious Software (Malware) | 28 | 7 | 11 | 10 |
| Week 7-8 | Computer Security & DoS Defenses | 27 | 6 | 10 | 11 |
| Week 11 | IDPS Technologies | 29 | 7 | 12 | 10 |
| Week 12-13 | Firewall | 38 | 7 | 13 | 18 |
| Week 14 | VPN (IPsec & SSL VPN) | 36 | 7 | 13 | 16 |
| Week 15 | Cloud Security Standards & IAM | 30 | 6 | 10 | 14 |
| **รวม** | | **188** | **40 (21%)** | **69 (37%)** | **79 (42%)** |

สัดส่วนข้อสอบความจำต่ำกว่าเป้า 25% เล็กน้อย เพราะเน้นข้อสอบความเข้าใจและการประยุกต์ตามที่ต้องการ

## หัวข้อสำคัญที่ครอบคลุมในแต่ละ Week

**Week 6 — Malware (Chapter 6)**
นิยาม Malware และ CIA, การจัดประเภทตามการแพร่/Payload/ลักษณะโปรแกรม, Attack Kits (Zeus, Angler), Attack Sources, APT,
Virus (องค์ประกอบ 3 ส่วน, 4 Phase), Macro Virus, Virus Classification ตามเป้าหมาย (Boot Sector, File Infector, Macro, Multipartite)
และตามการซ่อนตัว (Encrypted, Stealth, Polymorphic, Metamorphic), Worm และ Target Discovery, ตัวอย่าง Worm, Mobile Code,
Drive-by Download / Watering Hole, Malvertising, Clickjacking, Social Engineering vs Trojan, Ransomware, Payload Types,
Rootkit vs Backdoor, Countermeasures, Antivirus Generations, Sandbox Analysis

**Week 7-8 — Computer Security & DoS Attack Defenses**
Attack Results ตาม RFC 2828, STRIDE vs DREAD, Cyber Kill Chain 7 ขั้น, Carrier-dependent Malware, DoS vs DDoS, Botnet,
Resource Exhaustion vs Exploiting Vulnerability, Security Controls (Prevent/Detect/Identify/Correct/Recovery),
Passive vs Active Reconnaissance และเครื่องมือ (Shodan, Nmap, Nessus/OpenVAS, Nikto, Metasploit, Wireshark),
Four Lines of Defense Against DDoS, Flash Crowd/Slashdotted, Traceback, Responding to DoS Attacks 7 ขั้นตอน

**Week 11 — IDPS Technologies**
Components (Sensor/Agent, Management Server + Correlation, Database, Console), Out-of-Band vs In-Band (VLAN),
Security Capabilities (Information Gathering, Logging, Threshold/Blacklist/Whitelist, Alert Settings, Code Viewing, Prevention + Fine-tune),
Architecture Design (Placement, Reliability, Integration กับ SIEM/Firewall), Separation of Duties/Least Privilege, Software/Signature Updates,
NIDPS Layers, Appliance vs Software-only, Inline vs Passive, SPAN/TAP/IDS Load Balancer, Logging fields,
Detection ตาม Layer, Stateful Protocol Analysis, Anomaly vs Policy Violation, Prevention (Session Sniping, Inline Firewalling,
Throttling, Altering Content, Reconfigure Devices/Script), Deployment Outage, Stealth Mode

**Week 12-13 — Firewall**
ข้อจำกัดของ Perimeter Firewall, Packet Filtering vs Stateful, Application Firewall (Port mismatch, FTP command, Web content/Certificate),
Application-Proxy vs Dedicated Proxy, NAC (Credentials + Health Check), UTM, WAF, Virtual Firewall, PCI DSS,
Encrypted/Tunneled Traffic, NAT ไม่ใช่ Firewall, Outbound Source IP กับ Spoofing, Compliance Checking, GPO,
DMZ, NAT Mapping/Pinholing, Multiple Layers, Risk Analysis, Deny by Default/Whitelist, IPv4/IPv6,
Policy ประเภท IP/Application/User Identity/Network Activity, Firewall Lifecycle: Plan (ปัจจัย 7 ด้าน, Internal Threat) →
Configure (Port vs Content Filtering, Alerts) → Test (Test Network, Ruleset, Policy Sync) → Deploy (Phased/Pilot) →
Manage (Configuration Management, Review, Pentest vs Audit)

**Week 14 — VPN (IPsec และ SSL VPN)**
IPsec Framework, AH vs ESP, IKE/SA, Anti-Replay, PFS, Traffic Analysis, Mobility (Outer/Inner IP), IETF/RFC,
AES/AES-GCM/AEAD, HMAC, DH/ECDH, MITM และ Peer Authentication (Certificate vs PSK),
Architectures (Gateway-to-Gateway, Host-to-Host, Remote Access, Mesh), Planning (Conceptual/Logical/Prototype/Analysis),
Case Studies A–D (Tunnel Mode, Corporate WiFi, Cloud VM VPN, Mesh/Zero Trust),
SSL Portal vs Tunnel, Clientless, Proxying/Application Translation/Network Extension, HA vs Scalability,
Authentication vs Access Control, Endpoint Security, TLS Negotiation และการตรวจ Certificate,
Planning 5 ขั้น, Design the Architecture (Routing ขาไป-ขากลับ, FIPS 140-2)

**Week 15 — Cloud Security Standards & IAM**
ISO 27001/27017/27018/17788/17789, CIS Controls, FedRAMP, CSA CCM vs CSA STAR, Best Practices for Compliance,
NIST SP 800-144/145/146/53/210, 5 Essential Characteristics, IaaS/PaaS/SaaS, Public/Private/Community/Hybrid,
NIST CSF (Core 5 Functions, Implementation Tiers, Profiles), Data at Rest vs in Transit, Vulnerability Assessment vs Pentest,
Benefits ของ NIST, Federated Identity (IdP/SP), SAML Flow และ Assertion

> หมายเหตุ: ในเอกสาร หัวข้อ "Stalling 6" ใต้ Week 7-8 เป็นคำอธิบาย Chapter 6 (Malware) ซ้ำอีกรอบ
> จึงรวมไว้ในข้อสอบ Week 6 เพื่อไม่ให้ถามเรื่องเดิมซ้ำ ส่วน Week 7-8 ครอบคลุม Computer Security และ DoS Defenses

## โครงสร้างโปรเจกต์

```
itis-quiz/
├── index.html              # โครงหน้าเว็บ + โหลดสคริปต์
├── css/styles.css          # ดีไซน์ (ธีมสว่าง/มืด, Responsive)
├── js/
│   ├── data/               # ข้อมูลข้อสอบ แยกจาก UI
│   │   ├── course.js       # ข้อมูลรายวิชา + รายการ Week + รูปแบบข้อมูล
│   │   ├── week06.js … week15.js
│   ├── storage.js          # บันทึก/อ่าน LocalStorage
│   ├── engine.js           # เลือกข้อสอบ, สลับตัวเลือก, ตรวจคำตอบ, คิดคะแนน
│   └── app.js              # UI และ Routing
├── tests/engine.test.js    # Unit test ของ engine/storage
└── tools/validate-data.js  # ตรวจความถูกต้องของข้อมูลข้อสอบ
```

## เพิ่ม / แก้ไขข้อสอบ

ข้อสอบทุกข้ออยู่ใน `js/data/weekXX.js` เท่านั้น รูปแบบ 1 ข้อ:

```js
{
  id: "w6-29", type: "A", topic: "Ransomware",      // type: R=ความจำ, U=ความเข้าใจ, A=วิเคราะห์
  q: "คำถาม",
  c: ["ตัวเลือก 1", "ตัวเลือก 2", "ตัวเลือก 3", "ตัวเลือก 4"],
  a: 2,                                                // index ของคำตอบที่ถูก (0–3)
  why: "เหตุผลที่คำตอบนี้ถูก",
  w: ["ทำไมตัวเลือก 1 ผิด", "ทำไมตัวเลือก 2 ผิด", null, "ทำไมตัวเลือก 4 ผิด"]  // ช่องคำตอบที่ถูก = null
}
```

- **เพิ่ม Week ใหม่:** เพิ่มข้อมูลใน `weeks` ของ `course.js` → สร้างไฟล์ `js/data/weekXX.js` ที่เรียก `QUIZ.addQuestions("wXX", [...])` → เพิ่ม `<script>` ใน `index.html`
- **ตรวจข้อมูลหลังแก้ไข:** `node tools/validate-data.js` (ตรวจ id ซ้ำ, 4 ตัวเลือก, คำอธิบายครบ, สัดส่วนประเภท, และเตือนถ้าคำตอบที่ถูกมักเป็นตัวเลือกที่ยาวที่สุด)

## การทดสอบ

```bash
node tools/validate-data.js      # ตรวจข้อมูลข้อสอบ
node --test tests/engine.test.js # 11 unit tests: เลือกข้อสอบ, สลับตัวเลือก, ตรวจคำตอบ, คะแนน, บันทึกผล
```

ทดสอบบนเบราว์เซอร์จริง (Chrome แบบ Headless) แล้ว 44 รายการ: ทุกโหมด, การเปลี่ยนคำตอบ, Refresh แล้วทำต่อได้,
ตัวเลขคะแนนตรงกับผลที่บันทึก, Mock Exam หมดเวลาแล้วส่งอัตโนมัติ, ไม่มี Horizontal Scroll ที่ 390/820/1280 px และไม่มี JavaScript Error
