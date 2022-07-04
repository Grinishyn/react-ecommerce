import { Box, Grid } from "@mui/material"
import React, { Component } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import "./MyHeading.css"

function MyHeading() {
    const navigation = useNavigate()

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <div>notAScam.com</div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "8px 0",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                        navigation(-1)
                    }}
                >
                    ←
                </div>
                <div
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                        navigation(+1)
                    }}
                >
                    →
                </div>
                <div
                    style={{ marginLeft: 32, marginRight: 32 }}
                    onClick={() => {
                        window.location.reload()
                    }}
                >
                    ↻
                </div>
                <div
                    onClick={() => {
                        navigation("/")
                    }}
                    style={{
                        marginLeft: 32,
                        marginRight: 32,
                        cursor: "pointer"
                    }}
                    id="home-button"
                >
                    HomePage
                </div>
                <div
                    onClick={() => {
                        navigation("cart")
                    }}
                    style={{
                        marginRight: 8,
                        cursor: "pointer"
                    }}
                    id="cart-button"
                >
                    Cart
                </div>
            </div>
        </Box>
    )
}

export default MyHeading
