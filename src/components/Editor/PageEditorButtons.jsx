import { addComponent } from "./EditorFunctions";

export default function PageEditorButtons({setContent, content}) {
    return (
        <section className="button-section">
            <div className="button-section-wrapper">
                <button className="button physical-properties" onClick={() => addComponent("formula", setContent, content)}>+ Formula</button>
                <button className="button chemical-properties" onClick={() => addComponent("heading", setContent, content)}>+ Naslov</button>
                <button className="button element-usage" onClick={() => addComponent("paragraph", setContent, content)}>+ Paragraf</button>
            </div>
        </section>
    );
}