export default function UploadImage({ generalContent, setGeneralContent, setAuth }) {
    async function uploadImage(files) {
        async function deliverContent(files) {
            const formData = new FormData()
            formData.append("file", files[0])

            const token = localStorage.getItem("jwt-token")

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/editor/images`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            const info = await res.json()
            console.log(info)

            if (res.ok) {
                return info.imageSource
            } else {
                return null
            }
        }

        const newImgSrc = await deliverContent(files)
        if (!newImgSrc) {
            setAuth(false)
        } else {
            let newGeneralContent = { ...generalContent }
            newGeneralContent["imageSource"] = newImgSrc
            setGeneralContent(newGeneralContent);
        }
    };

    return (
        <>
            <input type="file" onChange={(e) => uploadImage(e.target.files)} style={{ position: "absolute", right: 0 }} />

            <img
                src={generalContent.imageSource}
                alt="uploaded"
                className="element-img"
                style={{ objectFit: 'cover' }}
            />
        </>
    );
}