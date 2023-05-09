(function ($) {
    $.fn.AddPaginationElements = function () {
        var TotalItems = this.find('tbody').find('tr:last-child').index() + 1;
        console.log(TotalItems);
        var OpElem = this;
        var arrSortElements;
        var html = "<div class='PaginationWrapper'>";
        html += "<span class='selectedNumberOfItemsToShow'>10</span><ul class='pageDD'>";
        html += (TotalItems < 10) ? "<li class='disabled'>10</l1>" : "<li>10</l1>";
        html += (TotalItems < 20) ? "<li class='disabled'>20</l1>" : "<li>20</l1>";
        html += (TotalItems < 30) ? "<li class='disabled'>30</l1>" : "<li>30</l1>";
        html += (TotalItems < 40) ? "<li class='disabled'>40</l1>" : "<li>40</l1>";
        html += (TotalItems < 50) ? "<li class='disabled'>50</l1>" : "<li>50</l1>";
        html += (TotalItems < 100) ? "<li class='disabled'>100</l1>" : "<li>100</l1>";
        html += "</ul>";
        html += "<a href='javascript:;' class='PaginationbtnPrevious disabled'>Previous</a>";
        html += "<a href='javascript:;' class='PaginationbtnNext'>Next</a>";
        html += "</div>";
        OpElem.find('tbody').children("tr:nth-child(9)").nextUntil(this.find('tbody').find("tr:last-child")).hide();
        OpElem.find('tbody').find("tr:last-child").hide();
        $(html).insertAfter(this);
        if (TotalItems <= 10) {
            $(".PaginationbtnNext,.PaginationbtnPrevious").addClass("disabled");
            $(".selectedNumberOfItemsToShow").addClass("disabled");
            OpElem.find("tbody").children("tr").first().show();
            OpElem.find("tbody").children("tr").last().show();
        }
        var table = OpElem;
        table.find('thead > tr > th')
            .wrapInner('<span title="sort this column"/>')
            .each(function () {
                var th = $(this),
                    thIndex = th.index(),
                    inverse = false;
                th.click(function () {

                    OpElem.find("tbody").children("tr").show();

                    table.find('td').filter(function () {
                        return $(this).index() === thIndex;
                    }).sortElements(function (a, b) {
                        return $.text([a]) > $.text([b]) ?
                            inverse ? -1 : 1
                            : inverse ? 1 : -1;
                    }, function () {

                        return this.parentNode;
                    });
                    //alert();
                    inverse = !inverse;
                    var numberOfItemsToSwipe = parseInt($(".selectedNumberOfItemsToShow").text());
                    OpElem.find('tbody').children("tr:nth-child(" + numberOfItemsToSwipe + ")").nextUntil(OpElem.find('tbody').find("tr:last-child")).hide();
                    OpElem.find('tbody').find("tr:last-child").hide();
                });

            });

        $(".PaginationbtnNext").bind("click", function () {
            var numberOfItemsToSwipe = parseInt($(".selectedNumberOfItemsToShow").text());
            if (!$(this).hasClass("disabled")) {
                var showFromIndex = OpElem.find("tbody").children("tr:visible").last().index() + 1;
                var showTillIndex = showFromIndex + numberOfItemsToSwipe;
                OpElem.find("tbody").children("tr").hide();
                if (showTillIndex >= TotalItems)
                    $(this).addClass("disabled");
                OpElem.find("tbody").children("tr:nth-child(" + showFromIndex + ")").nextUntil(OpElem.find("tbody").children("tr:nth-child(" + showTillIndex + ")")).show();
                $(".PaginationbtnPrevious").removeClass("disabled");
            }
        });
        $(".selectedNumberOfItemsToShow").bind("click", function () {
            if (!$(this).hasClass("disabled")) {
                $(".pageDD").slideToggle();
            }

        });
        $(".pageDD li").bind("click", function () {
            if (!$(this).hasClass('disabled')) {
                $(".selectedNumberOfItemsToShow").text($(this).text());
                OpElem.find("tbody").children("tr").show();
                OpElem.find('tbody').children("tr:nth-child(" + $(this).text() + ")").nextUntil(OpElem.find('tbody').find("tr:last-child")).hide();
                OpElem.find('tbody').find("tr:last-child").hide();
                $(".pageDD").slideUp();
            }
        });
        $(".PaginationbtnPrevious").bind("click", function () {
            var numberOfItemsToSwipe = parseInt($(".selectedNumberOfItemsToShow").text());
            if (!$(this).hasClass("disabled")) {
                var showTillIndex = OpElem.find("tbody").children("tr:visible").first().index() + 1;
                var showFromIndex = showTillIndex - numberOfItemsToSwipe;
                OpElem.find("tbody").children("tr").hide();
                if (showFromIndex <= 1) {
                    $(this).addClass("disabled");
                    showFromIndex = 1;
                    OpElem.find("tbody").children("tr").first().show();
                }

                OpElem.find("tbody").children("tr:nth-child(" + showFromIndex + ")").nextUntil(OpElem.find("tbody").children("tr:nth-child(" + showTillIndex + ")")).show();
                $(".PaginationbtnNext").removeClass("disabled");
            }
        });
    }
}(jQuery));


jQuery.fn.sortElements = (function () {

    var sort = [].sort;

    return function (comparator, getSortable) {

        getSortable = getSortable || function () { return this; };

        var placements = this.map(function () {

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function () {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function (i) {

            placements[i].call(getSortable.call(this));
        });

    };

})();