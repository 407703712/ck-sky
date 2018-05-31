define(['jquery'],function($){
	var common={
		init:function(){
			var self=this;
			self.extendJq();
		},
		extendJq:function(){ //animate.css插件的回调事件方法
			$.fn.extend({
				/**
		         * [animateCss 设置动画结束回调事件]
		         * @param  {[type]} animationName [对应的动画类名]
		         * @param  {[type]} callback [动画结束后的回调函数]
		         * @return {[type]}     [this]
		         */
			  animateCss: function(animationName, callback) {
			    var animationEnd = (function(el) {
			      var animations = {
			        animation: 'animationend',
			        OAnimation: 'oAnimationEnd',
			        MozAnimation: 'mozAnimationEnd',
			        WebkitAnimation: 'webkitAnimationEnd',
			      };

			      for (var t in animations) {
			        if (el.style[t] !== undefined) {
			          return animations[t];
			        }
			      }
			    })(document.createElement('div'));

			    this.addClass('animated ' + animationName).one(animationEnd, function() {
			      $(this).removeClass('animated ' + animationName);

			      if (typeof callback === 'function') callback();
			    });

			    return this;
			  },
			});			
		}
	}
	return common
})