/*
 * ข้อมูลรายวิชาและรายการ Week
 * ------------------------------------------------------------
 * ไฟล์ข้อสอบแต่ละ Week (week06.js, week07-08.js, ...) จะเรียก QUIZ.addQuestions(weekId, [...])
 *
 * รูปแบบข้อสอบ 1 ข้อ:
 * {
 *   id:    "w6-01",          // ไม่ซ้ำกันทั้งระบบ
 *   type:  "R" | "U" | "A",   // R = ความจำ, U = ความเข้าใจ, A = วิเคราะห์/แก้ปัญหา
 *   topic: "หัวข้อที่ควรทบทวน",
 *   q:     "คำถาม",
 *   c:     ["ตัวเลือก 1", "ตัวเลือก 2", "ตัวเลือก 3", "ตัวเลือก 4"],
 *   a:     0..3,             // index ของคำตอบที่ถูก
 *   why:   "เหตุผลที่คำตอบนี้ถูก",
 *   w:     ["ทำไมตัวเลือก 1 ผิด", null, ...] // ช่องของคำตอบที่ถูกเป็น null
 * }
 */
window.QUIZ = {
  course: {
    code: "ITIS",
    name: "Information Technology Infrastructure Security",
    nameTh: "ความมั่นคงปลอดภัยของโครงสร้างพื้นฐานเทคโนโลยีสารสนเทศ"
  },
  weeks: [
    {
      id: "w6",
      label: "Week 6",
      title: "Malicious Software (Malware)",
      topics: ["ประเภท Malware", "Virus: องค์ประกอบ/Phase", "Virus Classification", "Worm & Target Discovery",
        "APT / Attack Kits", "Web-based Threats", "Ransomware / Rootkit", "Countermeasures & Sandbox"]
    },
    {
      id: "w7",
      label: "Week 7-8",
      title: "Computer Security & DoS Defenses",
      topics: ["Attack Results (RFC 2828)", "STRIDE / DREAD", "Cyber Kill Chain", "Security Controls",
        "Reconnaissance & Tools", "DoS / DDoS / Botnet", "4 Lines of Defense", "Responding to DoS"]
    },
    {
      id: "w11",
      label: "Week 11",
      title: "IDPS Technologies",
      topics: ["Components & Correlation", "Out-of-Band vs In-Band", "Security Capabilities", "Architecture Design",
        "Securing & Maintaining IDPS", "NIDPS Sensor: Inline/Passive", "Detection & Prevention", "Stealth Mode"]
    },
    {
      id: "w12",
      label: "Week 12-13",
      title: "Firewall",
      topics: ["Firewall Technologies", "NAC / UTM / WAF", "Limitations of Inspection", "NAT / DMZ / Pinholing",
        "Firewall Policy", "Plan & Configure", "Test & Deploy", "Manage"]
    },
    {
      id: "w14",
      label: "Week 14",
      title: "VPN (IPsec & SSL VPN)",
      topics: ["IPsec / IKE / ESP / AH", "Cryptographic Services", "IPsec Architectures", "Case Studies",
        "SSL Portal vs Tunnel", "SSL VPN Functions & Security", "TLS Basics & Challenges", "Planning & Design"]
    },
    {
      id: "w15",
      label: "Week 15",
      title: "Cloud Security Standards & IAM",
      topics: ["ISO / CIS / FedRAMP / CSA", "NIST SP 800-144/145/146/53/210", "Cloud Characteristics & Models",
        "NIST CSF: Core / Tiers / Profiles", "Cloud Best Practices", "Federated Identity & SAML"]
    }
  ],
  questions: [],

  addQuestions: function (weekId, list) {
    for (var i = 0; i < list.length; i++) {
      list[i].week = weekId;
      this.questions.push(list[i]);
    }
  }
};
