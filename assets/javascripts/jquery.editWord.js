/*
  Description:
  CSS edit word animate
*/
(function($) {

  var defaults = {}

  var eachFn = function(target, text) {
    return function() {
      var targetText, resultText;
      targetText = target.text();
      resultText = text.substr(0, targetText.length + 1);
      target.text(resultText);

      if (targetText.length != text.length) {
        var time = parseInt(Math.random() * 100) % 5 * 100 + 500;
        setTimeout(eachFn(target, text), time);
      }
    }
  }

  $.fn.editWord = function() {
    return this.each(function() {
      var that = $(this),
        str = that.text(),
        time = 1000;

      // clear this element text
      that.text("");
      setTimeout(eachFn(that, str), time);
    });
  }
})(jQuery);