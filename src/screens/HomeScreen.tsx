import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import { Button, Grid } from "@mui/material"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadArticles } from "../api/fetches"
import { cartAtomStorage } from "../atom"
import MyHeading from "../components/MyHeading"
import { IArticle } from "../schemas/schema"

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

    return (
        <div id="page-container">
            <MyHeading />
            <div id="page-borders-articles">
                <div className="colored-border"></div>
                <Grid container spacing={0}>
                    {articles?.map((article, indexArticle) => {
                        return (
                            <Grid item xs={4} className="article">
                                <Grid
                                    item
                                    xs={6}
                                    className="name-price-buttons"
                                >
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
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
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
                                                            newCart[
                                                                elementIndex
                                                            ].itemNumber === 1
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
                                <Grid item xs={3}>
                                    <img
                                        alt=""
                                        className="image"
                                        src={`${article.image}`}
                                    ></img>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}
