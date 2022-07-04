import React from "react"
const BASE_URL = "https://fakestoreapi.com"

export const loadArticles = async () => {
    return fetch(BASE_URL + "/products", {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" })
    }).then((res) => res.json())
}

export const loadArticle = async (id: string) => {
    return fetch(BASE_URL + `/products/${id}`, {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" })
    }).then((res) => res.json())
}
