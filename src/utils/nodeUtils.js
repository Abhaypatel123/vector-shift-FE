export const getNodeDefaultValue = (data) => {
    const { nodeType, id } = data;

    switch (nodeType) {
        case "customInput":
            return data?.name || id.replace('customInput-', 'input_');

        case "customOutput":
            return data?.name || id.replace('customOutput-', 'output_');

        case "text":
            return data?.name || id.replace('text-', 'text_');

        case "llm":
            return data?.name || "";

        default:
            return nodeType;
    }
};

export const extractVariables = (text) => {
    const matches = text.match(/\{\{\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\}\}/g) || [];
    return matches.map(v => v.replace(/[{}]/g, "").trim());
};
