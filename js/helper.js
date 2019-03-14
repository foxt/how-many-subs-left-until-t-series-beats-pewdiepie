function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


;(function ( $, window, document, undefined ) {
    
    var pluginName = "numerator",
    defaults = {
        easing: 'swing',
        duration: 500,
        delimiter: undefined,
        rounding: 0,
        toValue: undefined,
        fromValue: undefined,
        onStart: function(){},
        onStep: function(){},
        onProgress: function(){},
        onComplete: function(){}
    };
    
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    
    Plugin.prototype = {
        init: function () {
            this.parseElement();
            this.setValue();
        },
        
        parseElement: function () {
            var elText = $(this.element).text().trim();
            
            this.settings.fromValue = this.format(elText);
        },
        
        setValue: function() {
            var self = this;
            
            $({value: self.settings.fromValue}).animate({value: self.settings.toValue}, {
                
                duration: parseInt(self.settings.duration),
                
                easing: self.settings.easing,
                
                start: self.settings.onStart,
                
                step: function(now, fx) {
                    
                    $(self.element).text(numberWithCommas(self.format(now)));
                    // accepts two params - (now, fx)
                    self.settings.onStep(now, fx);
                },
                
                // accepts three params - (animation object, progress ratio, time remaining(ms))
                progress: self.settings.onProgress,
                
                complete: self.settings.onComplete
            });
        },
        
        format: function(value){
            if (this.settings.rounding < 1) {
                if (typeof value == "string") {
                    value = value.replace(/,/g,"")
                }
                return parseInt(value);
            } else {
                return parseFloat(value).toFixed(this.settings.rounding);
            }
        }
    };
    
    $.fn[ pluginName ] = function ( options ) {
        if (!document.querySelector("#animations").checked) {
            this[0].innerText = options.toValue
        } else {
            return this.each(function() {
                if ( $.data( this, "plugin_" + pluginName ) ) {
                    $.data(this, 'plugin_' + pluginName, null);
                }
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                
            });
        }
    };
    
})( jQuery, window, document );
String.prototype.toHHMMSS = function () {
    var delta = new Number(this)
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    
    return days + "d " + hours + "h " + minutes + "m"
}
