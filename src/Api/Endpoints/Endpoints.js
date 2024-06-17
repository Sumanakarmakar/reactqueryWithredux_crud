

export const endpoints = {
    auth: {
        register: "user/signup",
        signin: "user/signin",
        profile: "user/profile-details"

    },
    cms: {
        list: "product/list",
        create: "product/create",
        detail: "product/detail",
        remove: "product/remove",
        edit: "product/update"
    }
}

export const successNotificationEndpoints = [
    endpoints.auth.register,
    endpoints.auth.signin,
    endpoints.auth.profile,
    endpoints.cms.list,
    endpoints.cms.create,
    endpoints.cms.detail,

]