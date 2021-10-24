const construct = (function () {
    var proto = Construct.prototype;

    function Construct (ops) {
        if (ops) {
            var masonry;

            //////////////////////////////////////
            // masonry scripts
            if (ops.masonry) {
                masonry = _masonry(ops.masonry);
            }
            // end masonry scripts
            //////////////////////////////////////

            //////////////////////////////////////
            // infinite scroll scripts
            if (ops.infiniteScroll) {
                _infiniteScroll(ops.infiniteScroll, masonry, ops);
            }
            // end infinite scroll scripts
            //////////////////////////////////////
        }
    }

    //////////////////////////////////////
    // infinite scroll
    function _infiniteScroll (infScrollOps, masonry, ops) {
        var infOps = infScrollOps,
            container = infOps.container,
            next = infOps.next,
            item = infOps.item,
            posts = [],
            history = infOps.history === undefined ? false : infOps.history;
            
        if (!container) throw new Error(`Infinite Scroll object expects property: container : ".your-post-item-container"`);
        if (!item) throw new Error(`Infinite Scroll object expects property: item : ".your-post-item"`);
        if (!next) throw new Error(`Infinite Scroll object expects property: next : ".your-next-page-pagination-selector"`);

        document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {
                let infScroll = new InfiniteScroll(container, {
                    path: next,
                    append: item,
                    history: history,
                    outlayer : masonry
                });

                infScroll.on("append", (body, path, items, response) => {
                    if (masonry) {
                        masonry.layout();
                    }
                    
                    for (let i = 0; i < items.length; i++) {
                        posts.push(items[i]);
                    }

                    var ids = posts.map(post => post.getAttribute("post-id"));

                    Tumblr.LikeButton.get_status_by_post_ids(ids);

                    infOps.appended ? infOps.appended(posts) : null;
                });
            }
        });
    }
    // end infinite scroll
    //////////////////////////////////////

    //////////////////////////////////////
    // masonry
    function _masonry (masonryOps) {
        var masOps = masonryOps,
            container = masOps.container,
            item = masOps.item;

        var msnry = new Masonry(container, {
            itemSelector: item
        });

        document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {
                msnry.layout();
            }
        });

        return msnry;
    }
    // end masonry
    //////////////////////////////////////

    /**
     * checks if the document has a particular element
     * 
     * @param {string} selectors 
     * the selectors to check the document for, multiple 
     * selectors can be used as long as they are separated by
     * commas
     * 
     * @param {callback} callback 
     * callback will execute if the element is found
     * 
     * @return {boolean}
     */
    proto.has = function (selectors, callback) {
        var selItems = selectors.split(/ ,|, |,/gm),
            result = false;

        for (let i = 0; i < selItems.length; i++) {
            if (document.querySelector(selItems)) {
                result = true
                callback ? callback() : null;
                break;
            }
        }

        return result;
    }

    return (ops) => {
        Construct(ops);
    }
})();