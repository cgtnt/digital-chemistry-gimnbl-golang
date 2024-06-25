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
            <div style={{
                position: "absolute",
                width: "15%",
                height: "50%",
                right: "10%",
                top: "15%",
                textAlign: "center",
                backgroundColor: "black",
                zIndex: "5",
                padding: "30px",
                opacity: "50%",
                borderRadius: "10px"

            }}>
                <h3>Izaberi sliku</h3>
                <br />
                <br />
                <label htmlFor="img-input">
                    <img src={process.env.REACT_APP_API_BASE_URL+"/icons/upload-round-icon.png"} alt="Upload image" style={{width: "90px", height: "90px"}}/>
                </label>
                <input type="file" id="img-input" onChange={(e) => uploadImage(e.target.files)} style={{ display: "none" }}/>
                <br />
                <br />
                <p>Slika mora biti .jpg i ispod 20mb</p>
            </div>

            <img
                src={generalContent.imageSource}
                alt="uploaded"
                className="element-img"
                style={{ objectFit: 'cover' }}
            />
        </>
    );
}