import html2canvas from "html2canvas";

export const screenshot = (targetImg: string) => {
  const target = document.getElementById(targetImg);
  if (!target) {
    console.log("No HTML Target");
    return;
  }
  const originalDisplay = target.style.display;
  target.style.display = "block";
  const images = Array.from(target.getElementsByTagName("img"));

  const imagePromises: Promise<void>[] = images.map((img) => {
    return new Promise<void>((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image load error"));
      }
    });
  });

  Promise.all(imagePromises)
    .then(() => {
      html2canvas(target, { useCORS: true }).then((canvas) => {
        const base64img = canvas.toDataURL("image/png");
        console.log(base64img);
        const anchor = document.createElement("a");
        anchor.setAttribute("href", base64img);
        anchor.setAttribute("download", "groovify-stats.png");
        anchor.click();
        anchor.remove();

        target.style.display = originalDisplay;
      });
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
};
