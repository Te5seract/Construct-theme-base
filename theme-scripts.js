(function () {
    construct({
        blogUrl : "{BlogURL}",
        masonry : {
            container : "._construct-posts-wrapper",
            item : "._construct-post-item"
        },
        infiniteScroll : {
            container : "._construct-posts-wrapper",
            item : "._construct-post-item",
            next : "._construct-pagination-next",
            appended : () => {}
        }
    });
})();