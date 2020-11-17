export const fileUpload = async (file) =>{
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dcyracwal/upload'

    const formData = new FormData()
    //formData para enviar a cloudinary
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            //configuracion fetch
            method: 'POST',
            body: formData
        })

        if (resp.ok){
            //si salio bien regresar url de la imagen subida en cloudinary
            const cloudResp = await resp.json()
            return cloudResp.secure_url;
        }else{
            return null;
        }
    } catch (error) {
        throw error
    }
}