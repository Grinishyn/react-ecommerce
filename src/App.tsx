import { Route, Routes } from "react-router-dom"
import ArticleScreen from "./screens/ArticleScreen"
import HomeScreen from "./screens/HomeScreen"
import CartScreen from "./screens/CartScreen"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/:article" element={<ArticleScreen />} />
                <Route path="/cart" element={<CartScreen />} />
            </Routes>
        </>
    )
}

export default App
