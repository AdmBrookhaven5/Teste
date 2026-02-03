export default async function handler(req, res) {
  try {
    const response = await fetch("https://delta.filenetwork.vip/android.html", {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    const html = await response.text();

    // DEBUG (se quiser ver no navegador)
    // console.log(html);

    const regex =
      /https:\/\/delta\.filenetwork\.vip\/file\/[^\s"'<>]+\.apk/;

    const match = html.match(regex);

    if (!match) {
      return res.status(404).json({
        error: "APK não encontrado",
        htmlSize: html.length
      });
    }

    res.status(200).json({ apk: match[0] });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
