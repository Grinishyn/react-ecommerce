import { Button, Container, Grid } from "@mui/material"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { loadArticle } from "../api/fetches"
import { cartAtomStorage } from "../atom"
import MyHeading from "../components/MyHeading"
import { IArticle } from "../schemas/schema"

export default function ArticleScreen() {
    const [article, setArticle] = useState<IArticle>()

    const [cart, setCart] = useAtom(cartAtomStorage)

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
            <Grid
                item
                xs={6}
                style={{
                    display: "flex",
                    padding: 12,
                    border: "solid lightgreen 2px",
                    borderRadius: "3%",
                    height: "100%",
                    fontSize: 28
                }}
            >
                <Grid style={{ display: "flex", flexDirection: "column" }}>
                    <Grid className="name-price" style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 32, color: "dodgerblue" }}>
                            {article?.name}
                        </div>
                        <div>€{article?.price}</div>
                    </Grid>
                    <div>{article?.description}</div>
                    <Grid
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            height: 64
                        }}
                    >
                        <Button
                            variant="outlined"
                            style={{ color: "green" }}
                            onClick={() => {
                                if (article) {
                                    if (cart) {
                                        let newCart = [...cart]
                                        let elementExists = newCart.find(
                                            (a) => a.name === article?.name
                                        )
                                        if (elementExists) {
                                            let elementIndex =
                                                newCart.findIndex(
                                                    (a) =>
                                                        a.name === article?.name
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
                                }
                            }}
                        >
                            <ShoppingBagIcon />
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ color: "red" }}
                            onClick={() => {
                                if (cart) {
                                    let newCart = [...cart]
                                    let elementExists = newCart.find(
                                        (a) => a.name === article?.name
                                    )
                                    if (elementExists) {
                                        let elementIndex = newCart.findIndex(
                                            (a) => a.name === article?.name
                                        )
                                        if (
                                            newCart[elementIndex].itemNumber ===
                                            1
                                        ) {
                                            newCart.splice(elementIndex, 1)
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
                    </Grid>
                </Grid>

                <img alt="" height={700} src={`${article?.image}`}></img>
            </Grid>
        </Container>
    )
}
