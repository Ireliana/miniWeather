const formatDate = function(date) {
	if (!date) {
		return "";
    }
	date = date.match(/^\d{4}-(.*)+$/);
	return date ? date[1] : "";
};

export { formatDate };
