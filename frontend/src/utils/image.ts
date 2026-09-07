export const saveImageToSessionAsBase64 = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        try {
          sessionStorage.setItem("user_uploaded_image", reader.result);
        } catch (err) {
          console.warn("⚠️ sessionStorage 저장 실패 (용량 초과 가능):", err);
        }
      }
      resolve();
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};
