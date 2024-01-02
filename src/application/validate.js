export class JoiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
};

export const Validate = (schema, data) => {
    const result = schema.validate(data);

    if (result.error) {
        throw new JoiError(400, result.error.message);
    } else {
        return result.value;
    }
};