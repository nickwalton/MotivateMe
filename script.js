var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['Steve Carell'];
var REPLACE = ['Michael Scott'];

walk(document.body);

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E
    
    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}


function replaceText(textNode) {
    var v = textNode.nodeValue;

    // Go through and match/replace all the strings we've given it, using RegExp.
    for (var i = 0; i < MATCH.length; i++) {
        v = v.replace(new RegExp('\\b' + MATCH[i] + '\\b', 'g'), REPLACE[i]);
    }

    textNode.nodeValue = v;
}

var MEME_URLS = ['https://steemitimages.com/DQmTv2Pm4S5JM2dns6zhjvz3qeJyhe3ckxCFAJqsi1nNVup/37bc00076f3f67fb090460d02f5b7727--hilarious-memes-motivational-memes.jpg',
                 'https://i1.wp.com/chritmis.com/wp-content/uploads/2018/02/33-1.jpg?w=619&ssl=1',
                 'http://www.lovethispic.com/uploaded_images/328899-Break-Over-Now...get-Back-To-Work-.jpg',
                 'https://sayingimages.com/wp-content/uploads/sometimes-you-have-to-tell-yourself-i-am-a-shark-and-attack-the-day-motivational-memes.jpg',
                 'https://blog.reserve.com/hubfs/Imported_Blog_Media/foxtato-original-art_the-10-things_reserve-company-values_.png?t=1532310790369',
                 'https://sayingimages.com/wp-content/uploads/dont-worry-you-got-this-motivational-memes.jpg',
                 'https://www.yourtango.com/sites/default/files/styles/body_image_default/public/image_list/motivational2.jpg?itok=UrGhutpK',
                 'http://memesbams.com/wp-content/uploads/2017/06/5-Everyone-Wants-To-Be-A-Beast-Motivation-Meme.jpg',
                 'https://pbs.twimg.com/media/Cbp621EUkAAEya-.jpg',
                 'http://thinkingmeme.com/wp-content/uploads/2017/11/Top-22-Motivational-Quotes-for-Success13.jpg'
                ];

// Pick out a random image from our collection.
function getRandomImage() {
    return MEME_URLS[Math.floor(Math.random() * MEME_URLS.length)];
}

// what should we do when scrolling occurs
var runOnScroll =  function(evt) {
    // Get all the images on a page.
    var images = document.getElementsByTagName("img");
    console.log("Updating Image");

    // Replace each image with a random one.
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        if(image.getAttribute("meme") == null){
            image.src = getRandomImage();
            image.removeAttribute("srcset");
            image.setAttribute("meme", true);
        }
    }
};

runOnScroll();
document.addEventListener('scroll', runOnScroll);

