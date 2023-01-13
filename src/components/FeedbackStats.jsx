import React from 'react'
import { useContext } from 'react';
import FeedBackContext from '../context/FeedbackContext';


function FeedbackStats() {

    const {feedback} = useContext(FeedBackContext);

    //  Calculate the ratings average
    let average = feedback.reduce((acc, curr) => {
        return acc + curr.rating;        
    },0)/feedback.length;

    // this line is to give one decimal point
    // and if its .0 regex is used to replace trailing zeroes
    average = average.toFixed(1).replace(/[.,]0$/,'')

  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating {isNaN(average)? 0 : average}</h4>
    </div>
  )
}



export default FeedbackStats