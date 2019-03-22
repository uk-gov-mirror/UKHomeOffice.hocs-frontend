const byLabel = (a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase());

module.exports = async (data) => data.parentTopics
    .map(parent => {
        parent.options = parent.options.sort(byLabel);
        return parent;
    })
    .sort(byLabel);