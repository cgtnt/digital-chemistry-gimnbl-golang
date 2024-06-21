import { EditorContext } from "../../Context/EditorContext";
import { useContext } from "react";
import UploadImage from "../../Editor/UploadImage"

export default function Info({ generalInfo }) {
    const isEditor = useContext(EditorContext)
    return (
        <div className="element-image-wrapper">
            <section className="hero-section">
                <div className="hero-section-wrapper">
                    <div className="color-background">
                        <div className="element-wrapper">
                            <h1 className="element-label" title="placeholder">{generalInfo?.symbol}</h1>
                            <p className="element-name" title="placeholder">{generalInfo?.name}</p>
                        </div>
                    </div>
                    <div className="img-wrapper">
                        {isEditor ? (
                            <UploadImage defaultSrc={generalInfo?.imageSource} />
                        ) : (
                            <img className="element-img" src={generalInfo?.imageSource} style={{ objectFit: 'cover' }} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}