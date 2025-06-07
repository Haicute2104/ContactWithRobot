import LayoutDefaultAdmin from "../layouts/admin";
import LayoutDefault from "../layouts/LayoutDefault";
import Dashboard from "../pages/Admin/Dashboard";
import ProductAdmin from "../pages/Admin/Product";
import CreateProductAdmin from "../pages/Admin/Product/create";
import ProductDetailAdmin from "../pages/Admin/Product/detail";
import EditProductAdmin from "../pages/Admin/Product/update";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Instruct from "../pages/Instruct";
import Introduce from "../pages/Introduce";
import News from "../pages/News";
import Products from "../pages/Products";
import ProductDetail from "../pages/Products/detail";
import Question from "../pages/Question";

export const routes = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/introduce',
                element: <Introduce />
            },
            {
                path: '/product',
                element: <Products />,
                // children: [
                //     {
                //         path: ":id",
                //         element: <ProductDetail/>
                //     }
                // ]
            },
            {
                path: '/question',
                element: <Question />
            },
            {
                path: '/news',
                element: <News />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/instruct',
                element: <Instruct />
            },
            {
                path: '/detail',
                element: <ProductDetail />
            },

        ]
    },
    {
        path: '/admin',
        element: <LayoutDefaultAdmin />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'product',
                children: [
                    {
                        index: true,
                        element: <ProductAdmin/>
                    },
                    {
                        path: 'create',
                        element: <CreateProductAdmin/>
                    },
                    {
                        path: ':id',
                        element: <ProductDetailAdmin/>
                    },
                    {
                        path: 'edit/:id',
                        element: <EditProductAdmin/>
                    }
                ]
            }
        ]
    }
]