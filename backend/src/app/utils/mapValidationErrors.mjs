// Map mongodb validation errors to single object attribute
//
export default function (errors) {
    var result = {};

    for (let key in errors) {
        if (errors[key].message) {
            result[key] = errors[key].message
        }
    }

    return result;
}