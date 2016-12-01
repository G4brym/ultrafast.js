const store = {
    "isAuth": false,
    "authKey": undefined,
    "user": {}
}

const final_dict = {
    get: (name) => store[name],
    all: () => store,
    isAuth: () => store["isAuth"],
    main: () => ({
        "isAuth": store["isAuth"],
        "user": store["user"],
        "authKey": store["authKey"]
    }),
    set: (name, value) => store[name] = value
};

export default final_dict;