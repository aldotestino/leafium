import type { NextPage } from 'next';
import Main from '../components/Main';
import UseCases from '../components/UseCases';
import SupportedDevices from '../components/SupportedDevices';
import Footer from '../components/Footer';

const Home: NextPage = () => {

  return (
    <>
      <Main />
      <UseCases />
      <SupportedDevices />
      <Footer />
    </>
  );
};

export default Home;
