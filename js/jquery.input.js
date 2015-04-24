;(function ($, window, document, undefined) {

    //Default config
    var defaults = {
        prefix: 'jmd',
        theme: 'dark'
    };

    //Constructor
    function JMDInput (element, options){
        this.$element = this.$original = $(element);
        this.tag = (this.$element[0].tagName || this.$element[0].nodeName).toLowerCase();
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    //Public API
    JMDInput.prototype = {

        init: function () {

            //Needs to be improved
            if(this.tag !== 'input' && this.tag !== 'textarea'){
                return false;
            }

            this.build();
            this.addEvents();
        },

        build: function(){
            var themeClass = this.options.prefix + '-' + this.options.theme,
                ctrlClass = this.options.prefix + '-ctrl',
                labelClass = this.options.prefix + '-label',
                disabledClass = this.$element.attr('disabled') ? this.options.prefix + '-disabled': '',
                floatClass = this.$element.val() !== '' ? this.options.prefix + '-float': '',
                placeholder = this.$element.attr('placeholder'),
                id = this.$element.attr('id') || 'jmd-'+new Date().getTime();

            this.$ctrl = $('<div class="'+ themeClass +' '+ ctrlClass +' '+ disabledClass +' '+ floatClass +'" />');
            this.$ctrl
                .insertBefore(this.$element)
                .append(this.$element);

            if(placeholder.length){
                this.$element
                    .before('<label for="'+ id +'" class="'+ labelClass +'">'+placeholder+'</label>')
                    .attr({
                        placeholder: null,
                        id: id
                    });
            }

        },

        destroy: function(){
            this.removeEvents();
            this.$original.insertBefore(this.$ctrl);
            this.$ctrl.remove();
        },

        addFocus: function(){
            this.$ctrl.addClass(this.options.prefix+'-focused');
            if(this.$element.val() == ''){
                this.$ctrl.addClass(this.options.prefix+'-float');
            }

        },

        removeFocus: function(){
            this.$ctrl.removeClass(this.options.prefix+'-focused');
            if(this.$element.val() == '') {
                this.$ctrl.removeClass(this.options.prefix + '-float');
            }
        },

        addEvents:function(){
            this.$element.on('focus', $.proxy(this.addFocus, this))
                         .on('blur' , $.proxy(this.removeFocus, this));
        },

        removeEvents:function(){
            this.$element.off('focus', $.proxy(this.addFocus, this))
                         .off('blur' , $.proxy(this.removeFocus, this));
        }
    };

    $.fn.JMDInput = function(options){
        return this.each(function(){
            var instance = $.data(this, 'JMDInput');
            if (!instance){
                if (!options){
                    instance = new JMDInput(this, null);
                }
                else if(typeof options ==='object'){
                    instance = new JMDInput(this, options);
                }
                $.data(this, 'JMDInput', instance);
            }
            else{
                if (options === 'destroy'){
                    instance.destroy();
                }else if(typeof options ==='string'){
                    instance[options]();
                }
            }
        });
    };

})(jQuery, window, document);