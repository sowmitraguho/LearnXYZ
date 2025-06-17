
import Banner from '../Banner/Banner';
import TypeWriterEffects from '../TypeWriterEffects/TypeWriterEffects';

import PopularServices from '../PopularServices/PopularServices';
import { Helmet } from 'react-helmet';


const Home = () => {
   
    return (
       <>
        <Helmet>
                <title>LearnXYZ</title>
            </Helmet>
        <div>
            
            <TypeWriterEffects />
            <Banner />
            <PopularServices/>
        </div></>
    );
};

export default Home;