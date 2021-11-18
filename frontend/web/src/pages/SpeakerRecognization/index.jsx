import React  from 'react';
import Layout from '../../layout';
import Wrapper from './styles';
import AudioRecord from '../../components/YoumeSetting/AudioRecord'
function App () {
  return(
    <Wrapper>
      <Layout>
        <div className='menu daily-menu'><h3>목소리 인식</h3></div>
        <hr/>
        <AudioRecord/>
      </Layout>
    </Wrapper>
  )
}
export default App;