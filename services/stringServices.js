/**
 * Replace spaces with dashes
 * {String} text the target text
*/
function replaceSpacesWithDashes(text) {
    return text.replace(/\s/g, '-');
}

function replaceDashesWithSpaces(text) {
    return text.replace('-', /\s/g);
}

module.exports = {
	replaceSpacesWithDashes,
	replaceDashesWithSpaces,
};