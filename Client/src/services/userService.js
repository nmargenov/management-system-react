const BASE_URL = "http://127.0.0.1:3005/api/users"

export const getAll = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error();
    }
    const result = await response.json();
    return result.users;

}

export const getOneById = async (id) => {
    const response = await fetch(BASE_URL + '/' + id);
    const result = await response.json();
    return result.user;
}

export const createUser = async (firstName, lastName, email, imageUrl, phoneNumber, country, city, street, streetNumber) => {
    const address = {
        country,
        city,
        street,
        streetNumber
    }
    const body = {
        firstName,
        lastName,
        email,
        imageUrl,
        phoneNumber,
        address
    }

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error();
    }
    const result = await response.json();
    return result.user;
}

export const editById = async (id, firstName, lastName, email, imageUrl, phoneNumber, country, city, street, streetNumber) => {
    const address = {
        country,
        city,
        street,
        streetNumber
    }
    const body = {
        firstName,
        lastName,
        email,
        imageUrl,
        phoneNumber,
        address
    }

    const response = await fetch(BASE_URL + '/' + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error();
    }
    const result = await response.json();
    return result.user;
}

export const deleteById = async (id) => {
    const response = await fetch(BASE_URL + '/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error();
    }
    const result = await response.json();
    return result.userId;
}
