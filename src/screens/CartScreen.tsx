import { Button, Container, Grid } from "@mui/material"
import React, { useState } from "react"
import MyHeading from "../components/MyHeading"
import { cartAtomStorage } from "../atom"
import { useAtom } from "jotai"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"

export default function CartScreen() {
    const [cart, setCart] = useAtom(cartAtomStorage)
    //    const [totPrice, setTotPrice] = useState<number>(0)

    let totPrice = 0

    function totPriceCalculator(artPrice: number) {}

    return (
        <Container>
            <MyHeading />
            {cart?.map((article, indexArticle) => {
                //               let newTotPrice = totPrice
                //               newTotPrice += article.price
                //               setTotPrice(newTotPrice)
                totPrice += article.price * article.itemNumber
                return (
                    <Grid item xs={12} className="article">
                        <div className="name-price-description">
                            <Grid className="name-price">
                                <div
                                    style={{ marginRight: 20 }}
                                    className="name"
                                >
                                    {article.name}
                                </div>
                                <div
                                    style={{ marginRight: 20 }}
                                    className="price"
                                >
                                    €{article.price}
                                </div>
                                <div> Quantity:{article.itemNumber}</div>
                            </Grid>
                        </div>
                        <div className="button-container">
                            <Button
                                className="add-to-cart-button"
                                variant="outlined"
                                style={{ color: "green" }}
                                onClick={() => {
                                    if (cart) {
                                        let newCart = [...cart]
                                        let elementExists = newCart.find(
                                            (a) => a.name === article.name
                                        )
                                        if (elementExists) {
                                            let elementIndex =
                                                newCart.findIndex(
                                                    (a) =>
                                                        a.name === article.name
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
                                        let elementExists = newCart.find(
                                            (a) => a.name === article.name
                                        )
                                        if (elementExists) {
                                            let elementIndex =
                                                newCart.findIndex(
                                                    (a) =>
                                                        a.name === article.name
                                                )
                                            if (
                                                newCart[elementIndex]
                                                    .itemNumber === 1
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
                        </div>
                    </Grid>
                )
            })}
            <div id="tot-price">Total Price: {totPrice} </div>
        </Container>
    )
}
