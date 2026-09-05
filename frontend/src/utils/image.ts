// 업로드한 원본 이미지를 sessionStorage에 base64로 백업해둔다.
// 새로고침으로 route state(imageFile/imageUrl)가 날아가도 결과 화면에서
// fallback 이미지로 보여줄 수 있게 하기 위함. 용량 초과 등으로 저장에
// 실패해도 업로드 자체를 실패시키지 않고 경고만 남긴다.
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
