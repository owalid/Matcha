export const countMatching = (arr1, arr2) => {
    var ret = 0;
    arr1.sort();
    arr2.sort();
    for (var i = 0; i < arr1.length; i += 1) {
        if (arr2.indexOf(arr1[i]) > -1) {
            ret++;
        }
    }
    return ret;
};