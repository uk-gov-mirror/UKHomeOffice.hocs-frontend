const byLabel = (a, b) => a.label.localeCompare(b.label);

const caseCorrespondentAdapter = async (data) => data.correspondents.map(({ fullname, uuid }) => ({ label: fullname, value: uuid })).sort(byLabel);

const correspondentTypeAdapter = async (data) => data.map(({ type, displayName }) => ({ label: displayName, value: type })).sort(byLabel);

module.exports = {
    caseCorrespondentAdapter,
    correspondentTypeAdapter
};