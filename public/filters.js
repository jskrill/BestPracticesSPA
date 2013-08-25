angular.module("myApp.filters", []).filter("startsWith", function() {
    return function startsWith(array, obj, ignoreCase) {
        var field,
            itemField,
            item,
            index,
            i,
            res = [];
        //for obj (key, value) = (field of array, startWith)
        console.log(array);
        if (!array) {
            return array;
        }
        for (index in array) {
            item = array[index];
            for (field in obj) {
                itemField = field;
                i = itemField.indexOf(".");
                while (i !== -1) {
                    item = item[itemField.substr(0, i)];
                    itemField = itemField.substr(i + 1);
                    i = itemField.indexOf(".");
                }
                finalItem = ignoreCase ? item[itemField].toLowerCase() : item[itemField];
                finalComp = ignoreCase ? obj[field].toLowerCase() : obj[field];
                if (finalItem.indexOf(finalComp) === 0) { //startWith for the lazy
                    res.push(item);
                }
            }
        }
        return res;
    }
}).filter("skip", function() {
    return function skip(array, n) {
        if (!array) {
            return array;
        }
        console.log(n);
        return array.slice(n);
    };
});
