import React, { useEffect, useState } from "react";

export default function UploadImage({ defaultSrc }) {
    const [image, setImage] = useState("")

    useEffect(() => {
        setImage(defaultSrc)
    }, [defaultSrc])

    const uploadImage = (files) => {
        const formData = new FormData();

        formData.append("file", files[0]);
        fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/editor/images`,
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setImage(data.imageSource);
            });
    };

    return (
        <>
            <input type="file" onChange={(e) => uploadImage(e.target.files)} style={{position: "absolute", right: 0}}/>

            <img
                src={image}
                alt="uploaded"
                className="element-img"
                style={{ objectFit: 'cover' }}
            />
        </>
    );
}