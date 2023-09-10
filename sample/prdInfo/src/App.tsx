import { Routes, Route } from "react-router-dom";
import ProductsTest from "./pages/Products";

const App = () => {
    return (
        <Routes>
      <Route path="/" element={<ProductsTest />} />
    </Routes>
    );
    };
export default App;