import { Input } from "../UIComponent/Input";
import { Number } from "../UIComponent/Number";
import { Select } from "../UIComponent/Select";
import { TextArea } from "../UIComponent/TextArea";

// Common wrapper for a field
const FieldWrapper = ({ label, children, fieldName }) => (
    <div className="node-card-field" key={fieldName}>
        <label className="node-card-label">{label}</label>
        {children}
    </div>
);

export const FieldType = ({ fieldValues, config, onChangeField, id }) => {
    return (
        <div className="node-card-body" key={id}>
            {config.fields?.map((field) => {
                const value = fieldValues[field.name] ?? "";
                let inputElement;
                switch (field.type) {
                    case "text":
                        inputElement = (
                            <Input
                                type="text"
                                value={value}
                                onChange={(val) => onChangeField(field.name, val)}
                                className="node-card-input"
                            />
                        );
                        break;

                    case "select":
                        inputElement = (
                            <Select
                                value={value}
                                options={field.options || []}
                                onChange={(val) => onChangeField(field.name, val)}
                            />
                        );
                        break;

                    case "textarea":
                        inputElement = (
                            <TextArea
                                value={value}
                                rows={field.rows || 3}
                                onChange={(val) => onChangeField(field.name, val)}
                            />
                        );
                        break;

                    case "number":
                        inputElement = (
                            <Number
                                type="text"
                                value={value}
                                onChange={(val) => onChangeField(field.name, val)}
                                className="node-card-input"
                            />
                        );
                        break;

                    default:
                        inputElement = (
                            <Input
                                type="text"
                                value={value}
                                onChange={(val) => onChangeField(field.name, val)}
                                className="node-card-input"
                            />
                        );
                }

                return (
                    <FieldWrapper key={field.name} label={field.label} fieldName={field.name}>
                        {inputElement}
                    </FieldWrapper>
                );
            })}
        </div>
    );
};
