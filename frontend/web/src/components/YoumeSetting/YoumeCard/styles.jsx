import styled from 'styled-components';
import {Card} from '@material-ui/core'
const Wrapper = styled(Card)`

    .router{
        color: black;
    }

    .MuiListItem-root:hover{
        background-color: rgb(0,0,0,0.1);
    }
    .progress{
        width:100%;
        height:100%;
        text-align:center;
        z-index:20000;
    }
`;
export default Wrapper;