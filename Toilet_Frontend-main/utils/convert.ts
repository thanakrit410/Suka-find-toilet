export const fileToBase64 = (source: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(source);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
