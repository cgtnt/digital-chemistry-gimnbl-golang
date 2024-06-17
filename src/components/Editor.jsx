import React, { useState } from "react";

export default function Editor() {
    const [image, setImage] = useState("");

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

    return <div>
        <input type="file" onChange={(e) => uploadImage(e.target.files)} />
        <img
            src={image}
            alt="uploaded image"
        />
    </div>;
}