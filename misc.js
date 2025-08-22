(() => {
const metaData = {
        author: "Smurfy.",
        title: "Crip Developments",
        siteName: "UnionMods Downloader",
        url: "https://unionmods-downloader.codemaster.ltd/",
        desc: "A simple and effective tool for handling broken or redirected downloads from the new UnionMods site. Just paste your download link, and we’ll seamlessly redirect you to the working version on the old site — no more frustration or dead ends. Built for speed, reliability, and ease of use.",
        icon: "./web/umd.png",
        iconTransparent: "./web/umd.png",
        ogImageSize: [400, 150]
    };

    const appleTouchSizes = [57, 60, 72, 76, 114, 120, 144, 152];
    const iconSizes = [16, 32, 96, 128, 196];

    const elements = [];

    // Apple Touch Icons
    appleTouchSizes.forEach(size => {
        elements.push(`<link rel="apple-touch-icon-precomposed" sizes="${size}x${size}" href="${metaData.icon}"> <link rel="apple-touch-icon" href="${metaData.icon}"></link>`);
    });

    // Favicon Icons
    iconSizes.forEach(size => {
        elements.push(`<link rel="icon" type="image/png" sizes="${size}x${size}" href="${metaData.icon}">`);
    });

    // Microsoft Tiles
    elements.push(`
        <meta name="application-name" content="${metaData.title}">
        <meta name="msapplication-TileColor" content="#16182f">
        <meta name="msapplication-TileImage" content="${metaData.iconTransparent}">
        <meta name="msapplication-square70x70logo" content="${metaData.iconTransparent}">
        <meta name="msapplication-square150x150logo" content="${metaData.iconTransparent}">
        <meta name="msapplication-wide310x150logo" content="${metaData.iconTransparent}">
        <meta name="msapplication-square310x310logo" content="${metaData.iconTransparent}">
    `);

    // Open Graph
    elements.push(`
        <meta property="og:site_name" content="${metaData.title}">
        <meta property="og:url" content="${metaData.url}">
        <meta property="og:title" content="${metaData.title} - ${metaData.siteName}">
        <meta property="og:image" content="${metaData.iconTransparent}">
        <meta property="og:image:secure_url" content="${metaData.iconTransparent}">
        <meta property="og:image:width" content="${metaData.ogImageSize[0]}">
        <meta property="og:image:height" content="${metaData.ogImageSize[1]}">
    `);

    // Twitter Card
    elements.push(`
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${metaData.title} - ${metaData.siteName}">
        <meta name="twitter:url" content="${metaData.url}">
        <meta name="twitter:site" content="${metaData.siteName}">
        <meta name="twitter:image" content="${metaData.iconTransparent}">
    `);

    // General Meta
    elements.push(`
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    `);

    // Misc
    elements.push(`
        <meta name="author" content="${metaData.author}">
        <link rel="canonical" href="${metaData.url}">
    `);

    elements.push(`
        <meta name="description" content="${metaData.desc}">
    `);

    function injectMetaTags(htmlString) {
        const container = document.createElement("div");
        container.innerHTML = htmlString;
        Array.from(container.children).forEach(tag => {
            const tagName = tag.tagName;
            const existing =
                (tagName === "LINK" && document.querySelector(`link[rel="${tag.rel}"][sizes="${tag.sizes}"]`)) ||
                (tagName === "META" && tag.name && document.querySelector(`meta[name="${tag.name}"]`)) ||
                (tagName === "META" && tag.getAttribute("property") && document.querySelector(`meta[property="${tag.getAttribute("property")}"]`));

            if (!existing) document.head.appendChild(tag);
        });
    }

    function initMeta() {
        elements.forEach(chunk => injectMetaTags(chunk));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMeta);
    } else {
        initMeta();
    }
})();
