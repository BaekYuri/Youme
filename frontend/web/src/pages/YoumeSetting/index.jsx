import React, { useEffect } from 'react';
import Layout from '../../layout';
import Wrapper from './styles';
import YoumeCard from '../../components/YoumeSetting/YoumeCard'
function App (props) {
  return(
    <Wrapper>
      <Layout>
        <div className='menu daily-menu'><h3>유미(YOUME) 관련 설정</h3></div>
        <hr/>
        <YoumeCard/>
      </Layout>
    </Wrapper>
  )
}
export default App;