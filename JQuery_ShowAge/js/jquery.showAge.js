﻿/*  Written by Chris Airey */

/*  2010-01-01 */

/*  Version 1.1 */

//  Known Issues
//  1. Date Compare is not 100% accurate
//  2. Unable to parse date in many date formats



(function($)
{
    $.fn.showAge = function(options)
    {
        var opts = $.extend({}, $.fn.showAge.defaults, options);

        return this.each(function(i)
        {
            updateDate($(this), opts.TodaysDate, opts.InsertMode, opts.CustomCompare, opts.DateCulture);
        });
    };


    $.fn.showAge.defaults =
    {
        InsertMode: 'replace',
        DateCulture: 'GB',
        TodaysDate: new Date(),
        CustomCompare: function(todaysDate, showAgeDate)
        {
            return Math.round(Math.floor(todaysDate - showAgeDate) / (1000 * 60 * 60 * 24 * 7 * 52));
        }
    };


    $.fn.showAge.getJson = function(url, data, async, callback)
    {
        $.ajax(
        {
            type: "POST",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: async,
            success: function(data)
            {
                if(callback)
                {
                    callback(data);
                }
            }
        });
    };


    function updateDate(showAgeElement, todaysDate, insertMode, customCompare, dateCulture)
    {
        var matches = showAgeElement.html().match(/\d{1,2}[\/-]\d{1,2}[\/-]\d{4}/g);
        
        for(var i = 0; i < matches.length; i++)
        {
            var match = matches[i];
            var showAgeDate;
            
            if(dateCulture.toUpperCase() == 'US')
            {
                showAgeDate = dateFromUS(match);
            }
            else
            {
                showAgeDate = dateFromGB(match);
            }
            
            var years = customCompare(todaysDate, showAgeDate);
            var replacementHtml = "<span class='show-age-text'>" + years + " years" + "</span>";

            switch(insertMode.toLowerCase())
            {
                case 'replace':
                    
                    showAgeElement.html(showAgeElement.html().replace(match, replacementHtml));
                    break;
                
                case 'append':
                
                    var lastIndex = showAgeElement.html().indexOf(match) + match.length;
                    var str1 = showAgeElement.html().substr(0, lastIndex);
                    str1 = str1 + " - " + replacementHtml;
                    var str2 = showAgeElement.html().substr(lastIndex);
                    showAgeElement.html(str1 + str2);
                    break;
                    
                case 'prepend':
                
                    var index = showAgeElement.html().indexOf(match);
                    var str1 = showAgeElement.html().substr(0, index);
                    str1 = str1 + replacementHtml + " - ";
                    var str2 = showAgeElement.html().substr(index);
                    showAgeElement.html(str1 + str2);
                    break;  
                
                default:
                    showAgeElement.html(showAgeElement.html().replace(match, replacementHtml));
                    break;    
            }
        }
    }
    
    
    function dateFromGB(dateAsString)
    {
        var pattern = new RegExp('(\\d{2})[\/-](\\d{2})[\/-](\\d{4})');
        var parts = dateAsString.match(pattern);
       
        var day = parseInt(parts[1]);
        var month = parseInt(parts[2], 10) - 1;
        var year = parseInt(parts[3], 10);
        
        return new Date(year, month, day);
    }
    
    
    function dateFromUS(dateAsString)
    {
        return new Date(Date.parse(dateAsString));
    }

})(jQuery);