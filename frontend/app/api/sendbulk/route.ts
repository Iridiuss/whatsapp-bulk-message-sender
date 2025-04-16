import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';
import { exec } from 'child_process';
import fs from 'fs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  // Static message
  const message = `📢 Exciting Opportunity for Students!
Free Online Classical Dance + Mathematics Course
Offered by The Ministry of Education in collaboration with The Art of Living!

🕕 Time: Daily at 6:30 PM
📍 Platform: Zoom
💸 Fees: Absolutely FREE

Thousands of students have already joined and seen improvement in their Mathematics skills while enjoying the art of classical dance!

🏆 Top performers will get a chance to participate in National Competitions!

👉 How to Join?
Students must join the free training WhatsApp group by clicking the link below

 [ https://chat.whatsapp.com/I5luuVBs7WK7AcOGkne2X6 ]

 

📞 For more details, contact:
📱 9353173653 / 9830059978

Youtube Link:  https://youtu.be/oCGeNckQiIo?si=kpkwqfo2NWsNMR6s

✅ Please circulate this message in all school WhatsApp groups to ensure maximum participation!`;

  // if (!file || !message) {
  //   return NextResponse.json({ error: 'Missing file or message' }, { status: 400 });
  // }

  try {
    // Save Excel file to temp directory
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(tmpdir(), file.name);
    await writeFile(filePath, buffer);

    // Save message to a file to preserve all formatting
    const messagePath = path.join(tmpdir(), 'message.txt');
    await writeFile(messagePath, message);

    // Use a file for the message instead of command line argument
    const command = `python D:\\whatsapp-mcp-server\\Whatsapp-bulkmsg\\whatsapp-mcp-server2\\send_bulk_whatsapp.py ${filePath} --message-file "${messagePath}"`;

    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Python Error:', stderr);
          resolve(NextResponse.json({ error: stderr || 'Python script failed' }, { status: 500 }));
        } else {
          console.log('Python Output:', stdout);
          resolve(NextResponse.json({ message: stdout }));
        }
      });
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
