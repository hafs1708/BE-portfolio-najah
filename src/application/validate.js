export const Validate = (schema, data) => {
    const result = schema.validate(data);

    if (result.error) {
        throw result.error;
    } else {
        return result.value;
    }
};