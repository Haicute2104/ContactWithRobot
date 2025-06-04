import Footer from './footer';
import Header from './header';
import './index.scss'
import { NavLink, Outlet} from 'react-router-dom';

function LayoutDefault(){
    return(
        <>
            <Header/>

            <main>
                <Outlet/>
            </main>

            <Footer/>

        </>
    )
}

export default LayoutDefault;