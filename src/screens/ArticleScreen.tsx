import { Button, Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { loadArticle } from "../api/fetches"
import MyHeading from "../components/MyHeading"
import { IArticle } from "../schemas/schema"

export default function ArticleScreen() {
    const [article, setArticle] = useState<IArticle>()

    const params = useParams()

    useEffect(() => {
        if (params.article) {
            loadArticle(params.article).then((res) => {
                if (res) {
                    let newArticle = {
                        id: res.id,
                        name: res.title,
                        description: res.description,
                        price: res.price,
                        image: res.image
                    }
                    setArticle(newArticle)
                }
            })
        }
    }, [])

    return (
        <Container>
            <MyHeading />
            <p>{article?.id}</p>
            <p>{article?.name}</p>
            <p>{article?.description}</p>
            <p>{article?.price}</p>
            <p>{article?.image}</p>
        </Container>
    )
}
