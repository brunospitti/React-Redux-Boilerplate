import React from 'react';
import styled from "react-emotion";

import { Button } from './Button';


class Color extends React.Component {
    render(){
        const { color, changeColor } = this.props;

        const ColoredBg = styled("div")`
            background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});
        `;

        return(
            <div className="color-wrapper">
                <ColoredBg>
                    <div className="color-rgb">
                        RGB( {color.map( (colorU, i) => <span key={i}>{ colorU }{ (color.length !== i + 1) && ', ' }</span> )} )
                    </div>
                </ColoredBg>
                <Button secondary text="Change color" clickBehav={changeColor(color)}/>
            </div>
        )
    }
};

export default Color;