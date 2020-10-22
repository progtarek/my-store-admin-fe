import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
function Home() {
  return (
    <Layout>
      <Jumbotron className='text-center'>
        <h1>Welcome to MyStore Dashboard</h1>
        <Link to='/dashboard'>Go to dashboard</Link>
      </Jumbotron>
    </Layout>
  );
}

export default Home;
