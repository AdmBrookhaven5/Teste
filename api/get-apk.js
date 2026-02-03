export default async function handler(req, res) {
  try {
    const response = await fetch("https://delta.filenetwork.vip/android.html", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    const regex = /https:\/\/delta\.filenetwork\.vip\/file\/[^\s"'<>]+\.apk/;
    const match = html.match(regex);

    if (match) {
      res.status(200).json({ apk: match[0] });
    } else {
      res.status(404).json({ error: "APK não encontrado" });
    }

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
