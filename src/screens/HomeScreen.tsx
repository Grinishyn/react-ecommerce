import { Button, Container, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { IArticle } from "../schemas/schema"
import { loadArticles } from "../api/fetches"
import { Box } from "@mui/system"
import Heading from "../components/MyHeading"
import MyHeading from "../components/MyHeading"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import { cartAtomStorage } from "../atom"
import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"

export default function HomeScreen() {
    const [articles, setArticles] = useState<IArticle[]>()

    const [cart, setCart] = useAtom(cartAtomStorage)

    const navigate = useNavigate()

    useEffect(() => {
        loadArticles()
            .then((res: any) => {
                if (res) {
                    let newArticles = []
                    for (let i = 0; i < res.length; i++) {
                        let newArticle = {
                            id: res[i].id,
                            name: res[i].title,
                            description: res[i].description,
                            price: res[i].price,
                            image: res[i].image
                        }
                        newArticles.push(newArticle)
                    }
                    setArticles(newArticles)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        console.log(cart)
    }, [cart])

    return (
        <div id="page-container">
            <MyHeading />
            <div id="page-borders-articles">
                <div className="colored-border"></div>
                <Grid container spacing={0}>
                    {articles?.map((article, indexArticle) => {
                        return (
                            <Grid item xs={12} className="article">
                                <div className="name-price-description">
                                    <Grid className="name-price">
                                        <div
                                            className="name"
                                            onClick={() => {
                                                navigate(`${article.id}`)
                                            }}
                                        >
                                            {article.name}
                                        </div>
                                        <div className="price">
                                            €{article.price}
                                        </div>
                                    </Grid>
                                    <div className="description">
                                        {article.description}
                                    </div>
                                </div>
                                <img
                                    alt=""
                                    className="image"
                                    src={`${article.image}`}
                                ></img>
                                <div className="button-container">
                                    <Button
                                        className="add-to-cart-button"
                                        variant="outlined"
                                        style={{ color: "green" }}
                                        onClick={() => {
                                            if (cart) {
                                                let newCart = [...cart]
                                                let elementExists =
                                                    newCart.find(
                                                        (a) =>
                                                            a.name ===
                                                            article.name
                                                    )
                                                if (elementExists) {
                                                    let elementIndex =
                                                        newCart.findIndex(
                                                            (a) =>
                                                                a.name ===
                                                                article.name
                                                        )
                                                    newCart[
                                                        elementIndex
                                                    ].itemNumber += 1
                                                } else {
                                                    newCart.push({
                                                        name: article.name,
                                                        price: article.price,
                                                        itemNumber: 1
                                                    })
                                                }
                                                setCart(newCart)
                                            } else {
                                                let newCart = [
                                                    {
                                                        name: article.name,
                                                        price: article.price,
                                                        itemNumber: 1
                                                    }
                                                ]
                                                setCart(newCart)
                                            }
                                        }}
                                    >
                                        <ShoppingBagIcon />
                                    </Button>
                                    <Button
                                        className="remove-from-cart-button"
                                        variant="outlined"
                                        style={{ color: "red" }}
                                        onClick={() => {
                                            if (cart) {
                                                let newCart = [...cart]
                                                let elementExists =
                                                    newCart.find(
                                                        (a) =>
                                                            a.name ===
                                                            article.name
                                                    )
                                                if (elementExists) {
                                                    let elementIndex =
                                                        newCart.findIndex(
                                                            (a) =>
                                                                a.name ===
                                                                article.name
                                                        )
                                                    if (
                                                        newCart[elementIndex]
                                                            .itemNumber === 1
                                                    ) {
                                                        newCart.splice(
                                                            elementIndex,
                                                            1
                                                        )
                                                    } else {
                                                        newCart[
                                                            elementIndex
                                                        ].itemNumber -= 1
                                                    }
                                                }
                                                setCart(newCart)
                                            }
                                        }}
                                    >
                                        <ShoppingBagIcon />
                                    </Button>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
                <div className="colored-border"></div>
            </div>
        </div>
    )
}
