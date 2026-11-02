# เฉลยโจทย์ TLS (สอนทีละขั้น)

## พื้นฐานที่ต้องรู้ก่อน

Wireshark ถอดรหัส TLS ได้ 2 วิธี:

| วิธี | ใช้ได้กับ | ใส่ที่ไหนใน Wireshark |
|---|---|---|
| **Key log file** (SSLKEYLOGFILE) | TLS ทุกเวอร์ชัน รวมถึง TLS 1.3 และ ECDHE | Edit → Preferences → Protocols → TLS → **(Pre)-Master-Secret log filename** |
| **RSA private key** ของ server | เฉพาะ TLS 1.2 ลงไป ที่ cipher suite เป็น **RSA key exchange** เช่น `TLS_RSA_WITH_AES_128_GCM_SHA256` | Edit → Preferences → Protocols → TLS → **RSA keys list** → Edit… → `+` เลือกไฟล์ key |

- Key log file คือไฟล์ text ที่ browser หรือโปรแกรมเขียน session secret ออกมา (ตั้ง environment variable `SSLKEYLOGFILE` แล้ว Chrome/Firefox จะเขียนให้)
- ใน Wireshark เวอร์ชันใหม่ ถ้าไม่เจอเมนู "SSL" ให้หาชื่อ **TLS** แทน

ขั้นตอนทั่วไปของโจทย์แนวนี้:
1. ดูว่ามี TLS อยู่ตรงไหน (`tls`, `tls.handshake.type == 1` คือ Client Hello)
2. หาโปรโตคอลที่ไม่เข้ารหัส (HTTP, FTP, SMTP…) ที่แอบส่ง key
3. ดึงไฟล์ออกมา แล้ว decode ถ้ามีการ encode ไว้
4. ใส่ key ใน Wireshark แล้วดู `http` อีกครั้ง

---

## Lab 4 — Key Log File

**1.** `10.0.40.80` และ SNI คือ `portal.itis-lab.local`
- Filter: `tls.handshake.type == 1` → ขยาย TLS → Handshake → Extension: server_name
- หรือใช้ `tls.handshake.extensions_server_name`

**2.** **TLS 1.3** (ช่อง Protocol ใน Client Hello ขึ้นว่า TLSv1.2 แต่เป็นเรื่องปกติ ให้ดู extension `supported_versions` ใน Server Hello) และ cipher suite คือ `TLS_AES_256_GCM_SHA384`
- Filter: `tls.handshake.type == 2` → Cipher Suite

**3.** ไม่เห็น เพราะข้อมูลถูกเข้ารหัส จะเห็นแค่ `Application Data`

**4.** FTP ล็อกอินด้วย `devops` / `D3v0ps!ftp`
- Filter: `ftp`

**5.** ไฟล์ชื่อ `debug_session.b64` (คำสั่ง STOR คืออัปโหลด) และ encode ไว้ด้วย **Base64** (ดูจากนามสกุล .b64 และตัวอักษรในไฟล์มีแค่ A–Z a–z 0–9 + / =)

**6.** ดึงไฟล์ออกมาแล้ว decode:
1. ดึงไฟล์ออกมาได้ 2 วิธี
   - **File → Export Objects → FTP-DATA** แล้วเซฟไฟล์
   - หรือ filter `ftp-data` → คลิกขวา → Follow → TCP Stream → Show data as **Raw** → Save as…
2. Decode Base64 ได้ 3 วิธี
   - **CyberChef**: ใช้ recipe "From Base64" แล้วกด Save output
   - **Windows**: `certutil -decode debug_session.b64 keylog.txt`
   - **Linux / Git Bash**: `base64 -d debug_session.b64 > keylog.txt`
3. ผลที่ได้คือ **TLS key log file** มีบรรทัดขึ้นต้นด้วย
   `CLIENT_HANDSHAKE_TRAFFIC_SECRET`, `SERVER_HANDSHAKE_TRAFFIC_SECRET`, `CLIENT_TRAFFIC_SECRET_0`, `SERVER_TRAFFIC_SECRET_0`, `EXPORTER_SECRET`
   (ถ้าเป็น TLS 1.2 จะเห็นบรรทัด `CLIENT_RANDOM` แทน)

**7.** Edit → Preferences → Protocols → TLS → (Pre)-Master-Secret log filename → Browse เลือก `keylog.txt` → OK
- Packet ที่เคยเป็น Application Data จะมีแท็บ **Decrypted TLS** โผล่ขึ้นมาด้านล่าง
- Filter `http` จะเห็น `GET /`, `POST /login`, `GET /files/flag.txt`

**8.** `wipada.t` / `Tls!Practice#26` (ในแพ็กเก็ตเขียนเป็น `Tls%21Practice%2326` เพราะ `%21` = `!` และ `%23` = `#`)

**9.** `c0ffee1234abcd`
- Filter: `http.set_cookie`

**10.** `FLAG{k3yl0g_d3crypt5_tls13}`
- Follow → **TLS Stream** หรือ File → Export Objects → HTTP

---

## Lab 5 — RSA Private Key

**1.** `bank.itis-lab.local`

**2.** `TLS_RSA_WITH_AES_128_GCM_SHA256` ใช้ **RSA key exchange**
- คำว่า `TLS_RSA_` ตรงหน้าชื่อ cipher suite แปลว่า client เข้ารหัส pre-master secret ด้วย public key ของ server แล้วส่งไปใน Client Key Exchange
- ใครมี private key ก็ถอด pre-master secret ออกมาได้เลย

**3.** CN = `bank.itis-lab.local`
- Filter: `tls.handshake.type == 11` → Certificate → subject

**4.** ดาวน์โหลด `/backup/site_backup_2025.zip` จาก `dev-old.itis-lab.local` (`10.0.50.90`)
- Filter: `http.request`

**5.** File → Export Objects → HTTP → เซฟ `site_backup_2025.zip` แล้วแตก zip จะเจอ
- `README.txt`
- `etc/ssl/private/bank.key` ← ไฟล์นี้คือ key ที่ต้องใช้ (ขึ้นต้นด้วย `-----BEGIN PRIVATE KEY-----`)

**6.** เทียบ modulus ของ key กับ certificate ถ้าตรงกันแปลว่าเป็นคู่กัน
```
openssl rsa  -in bank.key -noout -modulus | openssl md5
openssl x509 -in bank.crt -noout -modulus | openssl md5
```
- ได้ไฟล์ cert มาจาก Wireshark: เลือก Certificate ในแพ็กเก็ต Server Hello → คลิกขวา → Export Packet Bytes → `bank.der` (เป็นรูปแบบ DER ใช้ `-inform der`)
- วิธีง่ายสุด: ใส่ key ใน Wireshark แล้วดูว่าถอดออกไหม

**7.** Edit → Preferences → Protocols → TLS → RSA keys list → Edit… → `+` → เลือก `bank.key` (ไม่มี password ให้เว้นว่าง) → OK
- (Wireshark เวอร์ชันเก่าจะมีช่อง IP, Port, Protocol ให้ใส่ `10.0.50.80`, `443`, `http`)
- จากนั้นใช้ filter `http` จะเห็น `POST /transfer` คือ**โอนเงิน**

**8.**
| ข้อมูล | ค่า |
|---|---|
| บัญชีต้นทาง (acct) | `8821004417` |
| PIN | `556677` |
| บัญชีปลายทาง (to) | `1100223344` |
| จำนวนเงิน (amount) | `25000` |

**9.** Ref คือ `TRX-20261102-0917` และ FLAG คือ `FLAG{rs4_k3y_n0_f0rw4rd_s3cr3cy}`

**10.** ใน **TLS 1.3** key exchange ใช้ (EC)DHE เสมอ
- key ของ session มาจากค่าสุ่มชั่วคราว (ephemeral) ที่ทั้งสองฝั่งสร้างขึ้นแล้วทิ้งไป
- private key ของ server ใช้แค่ **เซ็นยืนยันตัวตน** ไม่ได้ใช้เข้ารหัส key
- คุณสมบัตินี้เรียกว่า **Forward Secrecy** ต่อให้ private key รั่วทีหลังก็ถอดข้อมูลย้อนหลังไม่ได้ ต้องใช้ key log file เท่านั้น

**11.** ไม่ได้ ด้วยเหตุผลเดียวกับข้อ 10 ถ้าเห็น cipher suite แบบ `TLS_ECDHE_RSA_WITH_...` ต้องหา key log file ส่วน private key ใช้ไม่ได้

---

## สรุปวิธีคิดเวลาเจอโจทย์จริง

```
เจอ TLS
 ├─ ดู Server Hello → TLS 1.3 หรือ cipher มี ECDHE/DHE?
 │    └─ ใช่ → หา key log file (CLIENT_RANDOM / *_TRAFFIC_SECRET)
 └─ cipher เป็น TLS_RSA_WITH_... ?
      └─ ใช่ → หา private key (.key / .pem) หรือ key log ก็ได้
หา key ใน pcap: http / ftp-data / smtp / frame contains "BEGIN" / frame contains "CLIENT_RANDOM"
ถ้า key ถูก encode: Base64 / hex / zip → decode ก่อน
```

Filter ที่ช่วยหา key ได้เร็ว:
- `frame contains "PRIVATE KEY"` / `frame contains "CLIENT_RANDOM"` / `frame contains "SECRET"`
- ถ้าเป็น Base64 คำว่า `-----BEGIN` จะกลายเป็น `LS0tLS1CRUdJTi` ให้ลองใช้ `frame contains "LS0tLS1"`
- ถ้าเป็น Base64 คำว่า `# TLS secrets` จะขึ้นต้นด้วย `IyBUTFMg`
