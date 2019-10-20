import React from 'react'
import Layout from '../components/Layout'
import Landing from '../sections/Landing'
import Motivation from '../sections/Motivation'
import Install from '../sections/Install'
import Usage from '../sections/Usage'
import Contribute from '../sections/Contribute'
import Examples from '../sections/Examples'
import Header from '../components/Header'
import Footer from '../components/Footer'

const IndexPage = () => (
  <Layout>
    <Header />
    <Landing />
    <Motivation />
    <Install />
    <Usage />
    <Examples />
    <Contribute />
    <Footer />
  </Layout>
)

export default IndexPage
