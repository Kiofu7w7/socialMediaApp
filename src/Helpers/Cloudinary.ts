export const FileUpload = async (file:any) => {
    const urlCloudinary = "https://api.cloudinary.com/v1_1/dlwr6vxib/upload";
    const formData = new FormData();
    formData.append("upload_preset", "Guajolota");
    formData.append("file", file);

    const resp = await fetch(urlCloudinary, {
        method: "POST",
        body: formData,
    });
    const data = await resp.json();
    return data.secure_url;
};
