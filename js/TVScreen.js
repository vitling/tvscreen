var TVScreen = function(screenElement, width, height) {
    var container = $(screenElement);
    container.css(
        {"background-color":"black",
         "position":"relative",
         "overflow":"hidden",
         "width":width,
         "height":height});

    var baseLayer = $("<div />");
    var ghostLayer = $("<div />");
    var overlayLayer = $("<div />");

    baseLayer.add(ghostLayer).add(overlayLayer).css({
        "position":"absolute",
        "top":"0px",
        "left":"0px"
    });

    ghostLayer.css("z-index",100);
    overlayLayer.css("z-index",200);

    $('<img src="img/screen.png">').appendTo(overlayLayer);

    container.append([baseLayer,ghostLayer,overlayLayer]);

    function animate() {
        var ghosting = Math.random()/4;
        var judder = Math.floor(Math.exp(Math.random()*2.5))-10;
        var flicker = Math.random()/4+0.75;

        baseLayer.css("opacity", flicker);
        baseLayer.css("-webkit-filter", "saturate(1) blur(2px)");
        baseLayer.css("-webkit-transform","translate(0px,"+judder+"px)");

        ghostLayer.css("opacity", ghosting);
        ghostLayer.css("-webkit-filter", "saturate(0.5) blur(2px)");
        ghostLayer.css("-webkit-transform","translate(10px,"+judder+"px)");
    }

    this.contentLayers=[baseLayer,ghostLayer]
    this.interval = window.setInterval(animate,40);
};

TVScreen.prototype.loadContent = function(htmlContent) {
    $(htmlContent).appendTo(this.contentLayers);
}