import React from 'react';

class Number extends React.Component {
    render(){
        const {num, addNum} = this.props;
        return(
            <div className="number-wrapper">
                <p>
                    <strong>Times the button has been clicked:</strong> {num}
                </p>
                <button
                    className="btn increment-number"
                    onClick={() => addNum(num) }
                >
                    Increment number
                </button>
            </div>
        )
    }
};

export default Number;