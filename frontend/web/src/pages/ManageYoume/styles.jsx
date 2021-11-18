import styled from 'styled-components';
const Wrapper = styled.div`
    hr{
        border: #dbdbdb 1px solid;
        margin-bottom: 11px;
    }
    .daily-menu{
        width:auto;
    }
    .daily-menu > * {
        display: inline-block;
    }
    .MuiContainer-root {
        margin-bottom: 10px;
    }
    .tab{
        margin-bottom:10px;
    }
    .btn-container>*{
        float: right;
    }

    .selected{
        background-color:#89DDBF;
        color:white;
    }

    .button-div{
        width:100%;
    }
    .button-div>*{
        min-width : 150px;
        width: calc(25% - 10px);
        margin : 5px;
        margin-left:0px;
        margin-right:10px;
    }

    table *{
        font-family:'SCDream4';
    }

    .MuiTableCell-head{
        font-weight:600;
    }

    .MuiLinearProgress-root{
        height:10px;
    }

    .MuiLinearProgress-colorPrimary{
        background-color: #f0f0f0;
    }
    .MuiLinearProgress-barColorPrimary{
        background-color: #89DDBF;
    }

    p{
        color:#b0b0b0;
    }

    .reward{
        width:100px;
    }
    .familiarty{
        padding: 15px;
    }
    .familiarty-description > *{
        margin-top:5px;
        margin-bottom:5px;
    }
`;
export default Wrapper;