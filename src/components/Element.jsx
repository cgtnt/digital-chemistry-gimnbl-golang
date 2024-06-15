//split into 3 components
export default function Element() {
    return (
        <div class="container-element-page">
            <div class="element-image-wrapper">
                <section class="hero-section">
                    <div class="hero-section-wrapper">
                        <div class="color-background">
                            <div class="element-wrapper">
                                <h1 class="element-label" title="placeholder"></h1>
                                <p class="element-name" title="placeholder"></p>
                            </div>
                        </div>
                        <div class="img-wrapper">
                            <img class="element-img" src="" />
                        </div>
                    </div>
                </section>
            </div>

            <section class="button-section">
                <div class="button-section-wrapper">
                    <button class="button physical-properties" >Fiz. svojstva</button>
                    <button class="button chemical-properties" >Hem. svojstva</button>
                    <button class="button element-usage" >Upotreba</button>
                    <button class="button element-reactions" >Reakcije</button>
                </div>
            </section>

            <div class="element-properties-wrapper">
                {/* <section class="general-properties">
                    <div class="section-wrapper">
                        <p class="section-text-block"></p>
                        <p class="section-text-block"></p>
                        <p class="section-text-block"></p>
                    </div>
                </section> */}
            </div>
        </div>
    );
}